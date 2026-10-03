"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * 三主题：dark=雷达指挥舱（默认）/ glass=极光玻璃 / paper=情报剪报。
 * 机制：把值写到 <html data-theme> + localStorage.theme，首屏由 layout.tsx 的
 * themeInitScript 读取（白名单 dark/light/glass/paper，light 为历史兼容）。
 */
type Theme = "dark" | "glass" | "paper";

const THEMES: { value: Theme; label: string; hint: string }[] = [
  { value: "dark", label: "指挥舱", hint: "深色雷达指挥舱" },
  { value: "glass", label: "极光", hint: "极光玻璃浅色主题" },
  { value: "paper", label: "剪报", hint: "米色情报剪报主题" },
];

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function normalize(value: string | undefined): Theme {
  if (value === "glass" || value === "paper") return value;
  return "dark";
}

function getSnapshot(): Theme {
  return normalize(document.documentElement.dataset.theme);
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const select = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage 不可用（隐私模式等）时仅本次会话生效
    }
    for (const listener of listeners) listener();
  }, []);

  return (
    <div
      className="theme-switch"
      role="group"
      aria-label="切换主题：雷达指挥舱 / 极光玻璃 / 情报剪报"
    >
      {THEMES.map((item) => {
        const active = theme === item.value;
        return (
          <button
            key={item.value}
            type="button"
            className={active ? "theme-option is-active" : "theme-option"}
            data-theme-option={item.value}
            aria-pressed={active}
            title={item.hint}
            onClick={() => select(item.value)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
