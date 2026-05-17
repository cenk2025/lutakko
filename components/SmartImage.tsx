'use client';

import { useState } from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  /** Optional themed RGB triplet for the gradient fallback. */
  fallbackRgb?: [number, number, number];
  loading?: 'eager' | 'lazy';
}

/**
 * <img> that gracefully falls back to a themed gradient if the source 404s
 * (e.g. when the user hasn't moved the asset into /public/images yet).
 * Also fades in on load.
 */
export default function SmartImage({
  src,
  alt,
  className,
  fallbackRgb = [34, 211, 238],
  loading = 'lazy',
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const fallback = `linear-gradient(135deg, rgba(${fallbackRgb.join(',')},0.35), rgba(${fallbackRgb.join(',')},0.05)), radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12), transparent 60%)`;

  return (
    <div
      className={`relative overflow-hidden ${className ?? ''}`}
      style={{
        background: fallback,
      }}
    >
      {!errored && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`h-full w-full object-cover transition-opacity duration-700 ease-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      {errored && (
        <div className="absolute inset-0 grid place-items-center text-[0.6rem] uppercase tracking-[0.4em] text-white/55">
          <span>· {alt} ·</span>
        </div>
      )}
    </div>
  );
}
