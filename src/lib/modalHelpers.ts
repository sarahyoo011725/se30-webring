/**
 * Creates an escape key handler for closing modals.
 */
export function createEscapeHandler(onClose: () => void): (event: KeyboardEvent) => void {
  return (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };
}

/**
 * Creates a tab key handler for focus trapping in modals.
 */
export function createTabKeyHandler(
  firstElement: HTMLElement | null,
  lastElement: HTMLElement | null
): (e: KeyboardEvent) => void {
  return (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement?.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement?.focus();
        e.preventDefault();
      }
    }
  };
}

/**
 * Gets all focusable elements within a modal.
 */
export function getFocusableElements(modal: HTMLElement): HTMLElement[] {
  return Array.from(
    modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  );
}

