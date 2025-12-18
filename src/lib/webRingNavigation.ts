import type { WebRingNavigation } from '../types';

/**
 * Finds the current site index in the sites array by comparing origins.
 */
function findCurrentSiteIndex(sites: string[], currentSite: string): number {
  return sites.findIndex((site) => {
    try {
      const siteUrl = new URL(site);
      const currentUrl = new URL(currentSite);
      return siteUrl.origin === currentUrl.origin;
    } catch {
      return site === currentSite;
    }
  });
}

/**
 * Calculates navigation indices with wrapping logic.
 */
function calculateNavigationIndices(currentIndex: number, sitesLength: number): {
  prevIndex: number;
  nextIndex: number;
} {
  if (currentIndex < 0) {
    // Viewing from hub: left goes to last site, right goes to first site
    return {
      prevIndex: sitesLength - 1,
      nextIndex: 0,
    };
  }

  // Viewing from a site in the list: standard wrapping
  return {
    prevIndex: currentIndex === 0 ? sitesLength - 1 : currentIndex - 1,
    nextIndex: currentIndex === sitesLength - 1 ? 0 : currentIndex + 1,
  };
}

/**
 * Calculates webring navigation (prev/next sites).
 * Pure function that determines navigation based on sites array and current site.
 */
export function calculateWebRingNavigation(
  sites: string[],
  currentSite?: string
): WebRingNavigation {
  if (sites.length === 0) {
    return { prev: null, next: null };
  }

  let currentIndex = -1;

  if (currentSite) {
    currentIndex = findCurrentSiteIndex(sites, currentSite);
  } else if (typeof window !== 'undefined') {
    currentIndex = findCurrentSiteIndex(sites, window.location.origin);
  }

  const { prevIndex, nextIndex } = calculateNavigationIndices(currentIndex, sites.length);

  return {
    prev: sites[prevIndex],
    next: sites[nextIndex],
  };
}

