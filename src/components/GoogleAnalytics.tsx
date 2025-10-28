"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type GoogleAnalyticsProps = {
  measurementId: string;
};

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!measurementId) return;
    if (typeof window === "undefined") return;
    const gtag = (window as typeof window & {
      gtag?: (...args: unknown[]) => void;
    }).gtag;

    if (!gtag) return;

    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    gtag("config", measurementId, {
      page_path: pagePath,
    });
  }, [measurementId, pathname, searchParams]);

  return null;
}

