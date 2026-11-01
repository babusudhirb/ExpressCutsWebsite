"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type Params = Record<string, string>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends through gtag where it is the installed tag, otherwise into GTM's data layer */
function track(event: string, params: Params) {
  if (window.gtag) window.gtag("event", event, params);
  else (window.dataLayer ??= []).push({ event, ...params });
}

const SERVICE_PATHS = ["/hair/", "/beard/", "/facial/", "/hair-spa/", "/hair-color/"];

/* The offer's name is in the prefilled WhatsApp message: "...book the Classic Combo (₹249)." */
const offerIn = (url: URL) => url.searchParams.get("text")?.match(/book the (.+?) \(/)?.[1];

/**
 * Conversion events, read from the links the site already has, so no button changes.
 * Parameters are the page, where on it the click happened and which offer or service.
 * Never the visitor's search words, and never anything they typed.
 */
export function TrackEvents() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href, location.href);
      const params: Params = {
        page_path: location.pathname,
        link_area: link.closest("header") ? "header" : link.closest("footer") ? "footer" : "page",
      };

      if (url.protocol === "tel:") return track("phone_click", params);
      if (url.hostname === "wa.me") {
        const offer = offerIn(url);
        if (offer) track("offer_interaction", { ...params, offer_name: offer });
        return track("whatsapp_click", params);
      }
      if (url.hostname === "maps.app.goo.gl" || url.pathname.startsWith("/maps")) {
        return track("directions_click", params);
      }
      if (url.origin !== location.origin) return;
      if (SERVICE_PATHS.includes(url.pathname)) return track("service_cta_click", { ...params, service: url.pathname });
      if (url.pathname === "/offers/") track("offer_interaction", { ...params, offer_name: "offers_page" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  /* An article counts as read once its closing summary comes on screen */
  useEffect(() => {
    const end = pathname.startsWith("/blog/") ? document.getElementById("in-short") : null;
    if (!end) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      track("article_read", { page_path: pathname });
    });
    io.observe(end);
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
