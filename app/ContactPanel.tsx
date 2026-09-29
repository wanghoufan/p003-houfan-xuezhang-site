"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "./asset";

const githubUrl: string | null = "https://github.com/wanghoufan";
const youtubeUrl: string | null =
  "https://www.youtube.com/@%E5%B8%81%E5%9C%88%E5%AD%A6%E9%95%BF/featured";
const wechatQr: string | null = asset("/contact/wechat-qr.png");

export function ContactPanel() {
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
      <div className="contact-channels" aria-label="联系方式">
        <button type="button" onClick={() => setWechatOpen(true)}>
          <span>01</span>
          <strong>微信</strong>
          <small>查看二维码</small>
        </button>

        {githubUrl ? (
          <a href={githubUrl} target="_blank" rel="noreferrer">
            <span>02</span>
            <strong>GitHub</strong>
            <small>访问主页 ↗</small>
          </a>
        ) : (
          <span className="contact-channel-pending" aria-disabled="true">
            <span>02</span>
            <strong>GitHub</strong>
            <small>主页链接待补充</small>
          </span>
        )}

        {youtubeUrl ? (
          <a href={youtubeUrl} target="_blank" rel="noreferrer">
            <span>03</span>
            <strong>YouTube</strong>
            <small>访问频道 ↗</small>
          </a>
        ) : (
          <span className="contact-channel-pending" aria-disabled="true">
            <span>03</span>
            <strong>YouTube</strong>
            <small>频道链接待补充</small>
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
              aria-label="关闭微信二维码"
            >
              ×
            </button>
            <p className="kicker">WECHAT</p>
            <h2 id="wechat-dialog-title">微信联系</h2>
            <div className="wechat-qr">
              {wechatQr ? (
                <img
                  src={wechatQr}
                  alt="后翻学长的微信二维码"
                  decoding="async"
                />
              ) : (
                <>
                  <strong>二维码待补充</strong>
                  <small>稍后替换为真实微信二维码</small>
                </>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
