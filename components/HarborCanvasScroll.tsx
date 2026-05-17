'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import type { ScrollSequenceConfig } from '@/data/content';

interface Props {
  sequence: ScrollSequenceConfig;
  /** Foreground gradient stops used for the soft glow tint behind the canvas. */
  glow?: {
    primary: [number, number, number];
    secondary?: [number, number, number];
  };
  fit?: 'cover' | 'contain';
  /** Multiplier of viewport height for the scroll runway. Default 4 (= 400vh). */
  scrollLengthVh?: number;
  /** Callback fired with the current 0–1 progress (called on RAF). */
  onProgressChange?: (progress: number) => void;
  /** Fires once every frame in the sequence has either loaded or errored. */
  onAllLoaded?: () => void;
  /** Children render inside the sticky stage, useful for text overlays. */
  children?: React.ReactNode;
  className?: string;
}

/**
 * Hi-perf, scroll-driven canvas frame sequence (Apple-style scrollytelling).
 *
 * - Preloads every frame at mount.
 * - Maps scroll progress 0→1 across the sticky wrapper to frame index 0→N-1.
 * - Renders the active frame inside a `requestAnimationFrame` loop using
 *   `object-fit: cover/contain` math for high-DPI screens.
 * - Falls back to the nearest already-loaded frame while images stream in.
 */
export default function HarborCanvasScroll({
  sequence,
  glow,
  fit = 'cover',
  scrollLengthVh = 4,
  onProgressChange,
  onAllLoaded,
  children,
  className,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  const { frameCount, framePrefix, frameExt, frameStart, folderPath } = sequence;

  const frameUrls = useMemo(() => {
    const urls: string[] = [];
    for (let i = 0; i < frameCount; i++) {
      const n = frameStart + i;
      urls.push(`/images/scrollable/${folderPath}/${framePrefix}${n}.${frameExt}`);
    }
    return urls;
  }, [frameCount, framePrefix, frameExt, frameStart, folderPath]);

  /* ----------------------- Preload frames ----------------------- */
  useEffect(() => {
    let cancelled = false;
    let notified = false;
    const images: HTMLImageElement[] = new Array(frameUrls.length);
    let loadedLocal = 0;

    const maybeNotifyAllLoaded = () => {
      if (notified) return;
      if (loadedLocal >= frameUrls.length) {
        notified = true;
        onAllLoaded?.();
      }
    };

    frameUrls.forEach((src, index) => {
      const img = new Image();
      img.decoding = 'async';
      img.loading = 'eager';
      img.src = src;
      img.onload = () => {
        if (cancelled) return;
        loadedLocal += 1;
        setLoaded(loadedLocal);
        if (loadedLocal >= Math.min(8, frameUrls.length) && !ready) {
          setReady(true);
          drawFrame(currentFrameRef.current);
        }
        maybeNotifyAllLoaded();
      };
      img.onerror = () => {
        if (cancelled) return;
        loadedLocal += 1;
        setLoaded(loadedLocal);
        maybeNotifyAllLoaded();
      };
      images[index] = img;
    });

    imagesRef.current = images;

    return () => {
      cancelled = true;
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameUrls.join('|')]);

  /* ----------------------- Canvas DPR resize ----------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth, clientHeight } = canvas;
      canvas.width = Math.floor(clientWidth * dpr);
      canvas.height = Math.floor(clientHeight * dpr);
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ----------------------- Draw helpers ----------------------- */
  const drawFrame = (frame: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frame];
    if (!img || !img.complete || img.naturalWidth === 0) {
      const closest = nearestLoadedFrame(frame);
      if (closest < 0) return;
      const fallback = imagesRef.current[closest];
      if (!fallback) return;
      paintImage(ctx, canvas, fallback);
      return;
    }

    paintImage(ctx, canvas, img);
  };

  const nearestLoadedFrame = (frame: number): number => {
    const imgs = imagesRef.current;
    for (let d = 0; d < imgs.length; d++) {
      const a = frame - d;
      const b = frame + d;
      if (a >= 0 && imgs[a] && imgs[a].complete && imgs[a].naturalWidth > 0) return a;
      if (b < imgs.length && imgs[b] && imgs[b].complete && imgs[b].naturalWidth > 0) return b;
    }
    return -1;
  };

  const paintImage = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    img: HTMLImageElement,
  ) => {
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    if (!cw || !ch || !iw || !ih) return;

    const canvasRatio = cw / ch;
    const imageRatio = iw / ih;

    let dx = 0;
    let dy = 0;
    let dw = cw;
    let dh = ch;

    if (fit === 'cover') {
      if (imageRatio > canvasRatio) {
        dh = ch;
        dw = ch * imageRatio;
        dx = (cw - dw) / 2;
      } else {
        dw = cw;
        dh = cw / imageRatio;
        dy = (ch - dh) / 2;
      }
    } else {
      if (imageRatio > canvasRatio) {
        dw = cw;
        dh = cw / imageRatio;
        dy = (ch - dh) / 2;
      } else {
        dh = ch;
        dw = ch * imageRatio;
        dx = (cw - dw) / 2;
      }
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  /* ----------------------- Scroll → frame ----------------------- */
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  const frameProgress = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  useMotionValueEvent(frameProgress, 'change', (latest) => {
    if (onProgressChange) onProgressChange(scrollYProgress.get());
    const next = Math.max(0, Math.min(frameCount - 1, Math.round(latest)));
    if (next === currentFrameRef.current) return;
    currentFrameRef.current = next;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => drawFrame(next));
  });

  useEffect(() => () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
  }, []);

  const pct = Math.round((loaded / frameCount) * 100);

  const glowPrimary = glow?.primary ?? [34, 211, 238];
  const glowSecondary = glow?.secondary ?? [163, 230, 53];

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full ${className ?? ''}`}
      style={{ height: `${scrollLengthVh * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 60%, rgba(${glowPrimary.join(',')},0.18), transparent 65%), radial-gradient(circle at 80% 20%, rgba(${glowSecondary.join(',')},0.10), transparent 60%)`,
          }}
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ display: 'block' }}
        />

        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-3 text-xs uppercase tracking-[0.4em] text-white/70"
            >
              <div className="relative h-px w-40 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-white"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span>{pct}%</span>
            </motion.div>
          </div>
        )}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(5,7,13,0.55) 0%, rgba(5,7,13,0.10) 30%, rgba(5,7,13,0.05) 60%, rgba(5,7,13,0.75) 100%)',
          }}
        />

        {children}
      </div>
    </div>
  );
}
