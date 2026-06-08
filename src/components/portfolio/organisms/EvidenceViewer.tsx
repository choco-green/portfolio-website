import { useEffect, useRef, useState } from "react";
import { Minus, Plus, RotateCcw, X } from "lucide-react";
import IconButton from "../atoms/IconButton";
import type { PreparedEvidenceItem } from "../types";

type EvidenceViewerProps = {
  item: PreparedEvidenceItem;
  onClose: () => void;
};

export default function EvidenceViewer({ item, onClose }: EvidenceViewerProps) {
  const [zoom, setZoom] = useState(100);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const clampZoom = (value: number) => Math.min(220, Math.max(50, value));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="evidence-viewer-title"
      className="fixed inset-0 z-50 flex flex-col bg-black/86 text-white backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/20 bg-black/50 px-4 py-3">
        <div>
          <h2 id="evidence-viewer-title" className="text-lg font-black">
            {item.label}
          </h2>
          <p className="text-sm text-white/72">Evidence Viewer</p>
        </div>
        <div className="flex items-center gap-2" aria-label="Evidence Viewer controls">
          <IconButton ariaLabel="Zoom out" onClick={() => setZoom((value) => clampZoom(value - 25))} variant="inverse">
            <Minus aria-hidden="true" size={18} />
          </IconButton>
          <label className="sr-only" htmlFor="evidence-zoom">
            Evidence zoom
          </label>
          <input
            id="evidence-zoom"
            aria-label="Evidence zoom"
            type="range"
            min="50"
            max="220"
            step="5"
            value={zoom}
            onChange={(event) => setZoom(clampZoom(Number(event.target.value)))}
            className="w-28 accent-accent"
          />
          <output aria-live="polite" className="w-14 text-center font-mono text-sm" data-testid="zoom-output">
            {zoom}%
          </output>
          <IconButton ariaLabel="Zoom in" onClick={() => setZoom((value) => clampZoom(value + 25))} variant="inverse">
            <Plus aria-hidden="true" size={18} />
          </IconButton>
          <IconButton ariaLabel="Reset to fit" onClick={() => setZoom(100)} variant="inverse">
            <RotateCcw aria-hidden="true" size={18} />
          </IconButton>
          <IconButton
            ref={closeRef}
            ariaLabel="Close Evidence Viewer"
            onClick={onClose}
            variant="inverse"
          >
            <X aria-hidden="true" size={18} />
          </IconButton>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto p-4">
        <img
          src={item.viewerImage.src}
          srcSet={item.viewerImage.srcSet}
          sizes={item.viewerImage.sizes}
          alt={item.alt}
          width={item.viewerImage.width}
          height={item.viewerImage.height}
          loading="eager"
          decoding="async"
          style={{
            maxWidth: zoom === 100 ? "calc(100vw - 2rem)" : "none",
            maxHeight: zoom === 100 ? "calc(100vh - 8.5rem)" : "none",
            width: zoom === 100 ? "auto" : `${zoom}%`,
            height: "auto"
          }}
          className="object-contain shadow-2xl"
        />
      </div>
    </div>
  );
}
