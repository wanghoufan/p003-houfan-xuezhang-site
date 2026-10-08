"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "./asset";
import { useTd } from "./LangToggle";

const githubUrl: string | null = "https://github.com/wanghoufan";
const youtubeUrl: string | null =
  "https://www.youtube.com/@%E5%B8%81%E5%9C%88%E5%AD%A6%E9%95%BF/featured";
const wechatQr: string | null = asset("/contact/wechat-qr.png");

export function ContactPanel() {
  const td = useTd();
  const [wechatOpen, setWechatOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (wechatOpen) {
      closeButtonRef.current?.focus();
    }
  }, [wechatOpen]);

  useEffect(() => {
    if (!wechatOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setWechatOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [wechatOpen]);

  return (
    <>
      <div className="contact-channels" aria-label={td("channelsAria")}>
        <button type="button" onClick={() => setWechatOpen(true)}>
          <span>01</span>
          <strong>{td("wechat")}</strong>
          <small>{td("viewQr")}</small>
        </button>

        {githubUrl ? (
          <a href={githubUrl} target="_blank" rel="noreferrer">
            <span>02</span>
            <strong>GitHub</strong>
            <small>{td("visitHome")}</small>
          </a>
        ) : (
          <span className="contact-channel-pending" aria-disabled="true">
            <span>02</span>
            <strong>GitHub</strong>
            <small>{td("homePending")}</small>
          </span>
        )}

        {youtubeUrl ? (
          <a href={youtubeUrl} target="_blank" rel="noreferrer">
            <span>03</span>
            <strong>YouTube</strong>
            <small>{td("visitChannel")}</small>
          </a>
        ) : (
          <span className="contact-channel-pending" aria-disabled="true">
            <span>03</span>
            <strong>YouTube</strong>
            <small>{td("channelPending")}</small>
          </span>
        )}
      </div>

      {wechatOpen && (
        <div
          className="wechat-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setWechatOpen(false);
            }
          }}
        >
          <section
            className="wechat-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wechat-dialog-title"
          >
            <button
              className="wechat-close"
              type="button"
              ref={closeButtonRef}
              onClick={() => setWechatOpen(false)}
              aria-label={td("closeQr")}
            >
              ×
            </button>
            <p className="kicker">WECHAT</p>
            <h2 id="wechat-dialog-title">{td("wechatTitle")}</h2>
            <div className="wechat-qr">
              {wechatQr ? (
                <img
                  src={wechatQr}
                  alt={td("qrAlt")}
                  decoding="async"
                />
              ) : (
                <>
                  <strong>{td("qrPending")}</strong>
                  <small>{td("qrReplace")}</small>
                </>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
