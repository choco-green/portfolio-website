import type { PreparedEvidenceItem } from "../types";

type EvidenceCardProps = {
  item: PreparedEvidenceItem;
  onSelect: (item: PreparedEvidenceItem) => void;
};

export default function EvidenceCard({ item, onSelect }: EvidenceCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="evidence-card motion-safe-scan group w-[18rem] shrink-0 overflow-hidden rounded-md border border-line bg-raised text-left shadow-sm transition hover:border-accent focus-visible:border-accent sm:w-[22rem]"
    >
      <span className="block overflow-hidden bg-canvas" style={{ aspectRatio: `${item.previewImage.width} / ${item.previewImage.height}` }}>
        <img
          src={item.previewImage.src}
          srcSet={item.previewImage.srcSet}
          sizes={item.previewImage.sizes}
          alt={item.alt}
          width={item.previewImage.width}
          height={item.previewImage.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </span>
      <span className="block px-3 py-3 text-sm font-black text-ink">{item.label}</span>
    </button>
  );
}
