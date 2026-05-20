/**
 * Server component that renders one or more JSON-LD blobs as
 * <script type="application/ld+json"> tags. Pass any plain object or array
 * of plain objects — they will be JSON.stringify'd safely (HTML-escaped so
 * the `</script>` substring can't break out of the script tag).
 */

type LdBlob = Record<string, unknown> | Record<string, unknown>[];

interface Props {
  data: LdBlob;
  id?: string;
}

function safeStringify(blob: LdBlob): string {
  return JSON.stringify(blob).replace(/</g, '\\u003c');
}

export default function JsonLd({ data, id }: Props) {
  const blobs = Array.isArray(data) ? data : [data];
  return (
    <>
      {blobs.map((blob, i) => (
        <script
          key={(id ?? 'ld') + '-' + i}
          type="application/ld+json"
          // Schema.org JSON-LD blob — safe-stringified above.
          dangerouslySetInnerHTML={{ __html: safeStringify(blob) }}
        />
      ))}
    </>
  );
}
