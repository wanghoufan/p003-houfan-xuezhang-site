"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { ui, type Lang, type UiKey } from "./i18n";

/**
 * 中英双语：值写到 <html data-lang> + localStorage["site-lang"]，默认中文。
 * 服务端渲染永远出中文（getServerSnapshot），切换在客户端发生，所以静态导出
 * 的 HTML、详情页正文与现有测试断言都不受影响。
 */
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function read(): Lang {
  return document.documentElement.dataset.lang === "en" ? "en" : "zh";
}

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, read, () => "zh");
}

export function useT() {
  const lang = useLang();
  return useCallback((key: UiKey) => ui[key][lang], [lang]);
}

const LANGS: { value: Lang; label: string }[] = [
  { value: "zh", label: "中文" },
  { value: "en", label: "EN" },
];

export function LangToggle() {
  const lang = useLang();
  const t = useT();

  // 静态导出的首屏永远是中文（服务端没有语言协商），挂载后再套用上次选择，
  // 这样水合阶段两边一致，不会报 hydration 不匹配。
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("site-lang");
    } catch {
      return;
    }
    if (stored === "en" && document.documentElement.dataset.lang !== "en") {
      document.documentElement.dataset.lang = "en";
      document.documentElement.lang = "en";
      for (const listener of listeners) listener();
    }
  }, []);

  const select = useCallback((next: Lang) => {
    document.documentElement.dataset.lang = next;
    document.documentElement.lang = next === "en" ? "en" : "zh-CN";
    try {
      localStorage.setItem("site-lang", next);
    } catch {
      // 隐私模式下只在本次会话生效
    }
    for (const listener of listeners) listener();
  }, []);

  return (
    <div className="lang-switch" role="group" aria-label={t("langAria")}>
      {LANGS.map((item) => {
        const active = lang === item.value;
        return (
          <button
            key={item.value}
            type="button"
            className={active ? "lang-option is-active" : "lang-option"}
            data-lang-option={item.value}
            aria-pressed={active}
            onClick={() => select(item.value)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
