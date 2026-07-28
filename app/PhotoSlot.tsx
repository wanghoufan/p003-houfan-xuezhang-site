"use client";

import { useState } from "react";

type PhotoSlotProps = {
  src: string;
  alt: string;
  className: string;
  children: React.ReactNode;
  priority?: boolean;
};

export function PhotoSlot({
  src,
  alt,
  className,
  children,
  priority = false,
}: PhotoSlotProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`${className} photo-slot${loaded ? " is-loaded" : ""}`}
      data-photo-src={src}
    >
      <img
        className="slot-image"
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />
      <div className="photo-fallback" aria-hidden={loaded}>
        {children}
      </div>
    </div>
  );
}
