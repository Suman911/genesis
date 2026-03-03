"use client"

import React, { useEffect, useRef } from "react";

export type TurnstileAPI = {
	render: (el: HTMLElement, opts: Record<string, unknown>) => string | number | void;
	reset: (widgetId?: string | number) => void;
	execute?: (widgetId?: string | number) => void;
};

declare global {
	interface Window {
		turnstile?: TurnstileAPI;
	}
}

type Props = {
	siteKey: string;
	className?: string;
	onVerify?: (token: string) => void;
	onExpire?: () => void;
	theme?: "light" | "dark";
};

const SCRIPT_ID = "cf-turnstile-script";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

function ensureScript(): Promise<void> {
	return new Promise((resolve, reject) => {
		if (typeof window === "undefined") return reject(new Error("no window"));
		if (window.turnstile) return resolve();
		const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
		if (existing) {
			existing.addEventListener("load", () => resolve());
			existing.addEventListener("error", () => reject(new Error("failed to load")));
			return;
		}
		const s = document.createElement("script");
		s.id = SCRIPT_ID;
		s.src = SCRIPT_SRC;
		s.async = true;
		s.defer = true;
		s.onload = () => resolve();
		s.onerror = () => reject(new Error("failed to load"));
		document.head.appendChild(s);
	});
}

export default function Turnstile({ siteKey, className = "", onVerify, onExpire, theme = "light" }: Props) {
	const ref = useRef<HTMLDivElement | null>(null);
	const rendered = useRef(false);

	useEffect(() => {
		let mounted = true;
		ensureScript()
			.then(() => {
				if (!mounted || !ref.current) return;
				const t = window.turnstile;
				if (!t || typeof t.render !== "function") return;
				// Avoid rendering multiple times into the same container
				if (rendered.current || (ref.current && ref.current.childElementCount > 0)) return;
				try {
					t.render(ref.current, {
						sitekey: siteKey,
						theme,
						size: "normal",
						callback: (token: string) => onVerify?.(token),
						"expired-callback": () => onExpire?.(),
					});
					rendered.current = true;
				} catch {
					/* ignore render errors */
				}
			})
			.catch(() => {
				/* ignore load errors */
			});
		return () => {
			mounted = false;
			try {
				if (rendered.current) {
					window.turnstile?.reset?.();
					rendered.current = false;
				}
			} catch {
				/* ignore */
			}
		};
	}, [siteKey, onVerify, onExpire, theme]);

	return (
		<div className={className}>
			<div ref={ref} />
		</div>
	);
}

