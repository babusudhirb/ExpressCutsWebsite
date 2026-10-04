"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";

/** One step of programmatic scroll: eased out, so the hand-over starts at once */
const DURATION = 600;
/** Wheel events closer together than this belong to the same physical gesture */
const WHEEL_GAP = 160;
/** A finger must travel this far, mostly vertically, to count as a swipe */
const SWIPE = 36;
/** After a step or an entry, leftover momentum is absorbed for this long */
const HOLD = 220;
const EPS = 2;

type Geo = { top: number; end: number; distance: number };

/**
 * Phones only: turns a pinned scroll zone into a one-card-per-gesture viewer.
 *
 * The zone keeps its real scroll distance and the cards stay driven by scroll
 * progress, so the approved motion is untouched — this only decides where the
 * page is allowed to rest. One wheel burst, swipe or key press moves the page to
 * the next rest position, and nothing else is accepted until it has arrived.
 * Past the first or last card the gesture is left to the browser, so the page
 * scrolls out of the zone normally; momentum arriving from outside stops on the
 * nearest edge card instead of running through the stack.
 */
export function useStepScroll(zoneRef: RefObject<HTMLElement | null>, steps: number, enabled: boolean) {
  const stepsRef = useRef(steps);
  const api = useRef<((dir: -1 | 1) => boolean) | null>(null);

  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  useEffect(() => {
    const zone = zoneRef.current;
    if (!enabled || !zone) return;

    let raf = 0;
    let animating = false;
    let holdUntil = 0;
    let holdIndex = 0;
    let wheelAt = 0;
    let wheelUsed = false;
    /* Which side of the zone the page was last on: −1 above, 1 below, 0 once inside */
    let side = 0;
    let lastY = window.scrollY;
    let scrollAt = 0;
    let touch: { x: number; y: number; mode: "native" | "step" | null; fired: boolean } | null = null;

    const last = () => Math.max(0, stepsRef.current - 1);
    const geo = (): Geo => {
      const top = zone.getBoundingClientRect().top + window.scrollY;
      const distance = Math.max(0, zone.offsetHeight - window.innerHeight);
      return { top, end: top + distance, distance };
    };
    const ready = (g: Geo) => g.distance > 0 && last() > 0;
    const engaged = (g: Geo, y: number) => ready(g) && y >= g.top - EPS && y <= g.end + EPS;
    const snap = (g: Geo, i: number) => g.top + (i / last()) * g.distance;
    const indexAt = (g: Geo, y: number) =>
      Math.min(last(), Math.max(0, Math.round(((y - g.top) / g.distance) * last())));
    const jump = (top: number) => window.scrollTo({ top, behavior: "instant" });

    const go = (g: Geo, index: number) => {
      const from = window.scrollY;
      const to = snap(g, index);
      const t0 = performance.now();
      animating = true;
      holdIndex = index;
      side = 0;
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / DURATION);
        jump(from + (to - from) * (1 - (1 - t) * (1 - t)));
        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          animating = false;
          holdUntil = performance.now() + HOLD;
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || !e.deltaY) return;
      const now = performance.now();
      if (now - wheelAt > WHEEL_GAP) wheelUsed = false;
      wheelAt = now;
      const g = geo();
      const y = window.scrollY;
      if (!engaged(g, y)) return;
      /* The rest of a burst that already moved a card, or one landing mid-step */
      if (animating || wheelUsed) {
        wheelUsed = true;
        e.preventDefault();
        return;
      }
      const next = indexAt(g, y) + (e.deltaY > 0 ? 1 : -1);
      if (next < 0 || next > last()) return; /* past either end: the page scrolls on */
      e.preventDefault();
      wheelUsed = true;
      go(g, next);
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      touch = e.touches.length === 1 ? { x: t.clientX, y: t.clientY, mode: null, fired: false } : null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!touch) return;
      const t = e.touches[0];
      const dy = touch.y - t.clientY;
      const dx = touch.x - t.clientX;
      if (touch.mode === null) {
        const g = geo();
        const y = window.scrollY;
        if (!engaged(g, y)) touch.mode = "native";
        else if (animating) touch.mode = "step";
        else {
          const next = indexAt(g, y) + (dy >= 0 ? 1 : -1);
          const leaving = (next < 0 || next > last()) && Math.abs(dy) >= Math.abs(dx);
          touch.mode = leaving ? "native" : "step";
        }
      }
      if (touch.mode === "native") return;
      if (e.cancelable) e.preventDefault();
      if (touch.fired || animating || Math.abs(dy) < SWIPE || Math.abs(dy) < Math.abs(dx)) return;
      /* One step per touch, however far or fast the finger goes on */
      touch.fired = true;
      const g = geo();
      const next = indexAt(g, window.scrollY) + (dy > 0 ? 1 : -1);
      if (next >= 0 && next <= last()) go(g, next);
    };

    const onTouchEnd = () => {
      touch = null;
    };

    /* Scroll the handlers above never saw: momentum from outside, keys, focus */
    const onScroll = () => {
      const y = window.scrollY;
      const prev = lastY;
      lastY = y;
      if (animating) return;
      const g = geo();
      if (!ready(g)) return;
      const now = performance.now();
      /* Scroll that starts from rest on an edge card is a new gesture, not an arrival */
      if (now - scrollAt > HOLD && engaged(g, prev)) side = 0;
      scrollAt = now;
      if (y < g.top - EPS) side = -1;
      else if (y > g.end + EPS) side = 1;
      if (y <= g.top + EPS || y >= g.end - EPS) return;

      if (side !== 0) {
        /* Arriving: stop on the first card from above, the last from below */
        holdIndex = side < 0 ? 0 : last();
        side = 0;
      } else if (now >= holdUntil) {
        /* Resting inside and moved by something else: that is one step */
        if (Math.abs(y - snap(g, indexAt(g, prev))) <= EPS) return;
        const next = indexAt(g, prev) + (y > prev ? 1 : -1);
        go(g, Math.min(last(), Math.max(0, next)));
        return;
      }
      holdUntil = now + HOLD;
      wheelUsed = true;
      wheelAt = now;
      const to = snap(g, holdIndex);
      if (Math.abs(y - to) > EPS) {
        lastY = to;
        jump(to);
      }
    };

    api.current = (dir) => {
      const g = geo();
      if (!ready(g)) return false;
      if (animating) return true;
      const y = Math.min(g.end, Math.max(g.top, window.scrollY));
      go(g, Math.min(last(), Math.max(0, indexAt(g, y) + dir)));
      return true;
    };

    zone.addEventListener("wheel", onWheel, { passive: false });
    zone.addEventListener("touchstart", onTouchStart, { passive: true });
    zone.addEventListener("touchmove", onTouchMove, { passive: false });
    zone.addEventListener("touchend", onTouchEnd);
    zone.addEventListener("touchcancel", onTouchEnd);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      api.current = null;
      zone.removeEventListener("wheel", onWheel);
      zone.removeEventListener("touchstart", onTouchStart);
      zone.removeEventListener("touchmove", onTouchMove);
      zone.removeEventListener("touchend", onTouchEnd);
      zone.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("scroll", onScroll);
    };
  }, [zoneRef, enabled]);

  /** Move one card from code (step buttons). False when the controller is off. */
  return useCallback((dir: -1 | 1) => api.current?.(dir) ?? false, []);
}
