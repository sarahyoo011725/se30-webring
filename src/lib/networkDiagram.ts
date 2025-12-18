import type { Student, NetworkNode, NetworkLink } from '../types';
import { NETWORK_CONFIG } from '../constants';

/**
 * Creates initial network nodes arranged in a circle pattern.
 */
export function createInitialNodes(
  students: Student[],
  width: number,
  height: number
): NetworkNode[] {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * NETWORK_CONFIG.RADIUS_FACTOR;

  return students.map((student, i) => {
    const angle = (i / students.length) * Math.PI * 2;
    return {
      id: i,
      name: student.name,
      website: student.website,
      student,
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
      fx: null,
      fy: null,
    };
  });
}

/**
 * Generates network links between nodes.
 * Creates structured connections plus some random links for visual interest.
 */
export function generateLinks(nodes: NetworkNode[]): NetworkLink[] {
  const links: NetworkLink[] = [];
  const connections = Math.min(NETWORK_CONFIG.MIN_CONNECTIONS, Math.floor(nodes.length / 2));

  // Create structured connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = 1; j <= connections; j++) {
      const targetIndex = (i + j) % nodes.length;
      if (targetIndex !== i) {
        links.push({ source: i, target: targetIndex });
      }
    }

    // Add random connections for visual interest
    if (
      Math.random() > NETWORK_CONFIG.RANDOM_LINK_PROBABILITY &&
      nodes.length > NETWORK_CONFIG.MIN_NODES_FOR_RANDOM
    ) {
      const randomTarget = Math.floor(Math.random() * nodes.length);
      const nextIndex = (i + 1) % nodes.length;
      if (randomTarget !== i && randomTarget !== nextIndex) {
        links.push({ source: i, target: randomTarget });
      }
    }
  }

  // Remove duplicate links (bidirectional)
  return links.filter(
    (link, index, self) =>
      index ===
      self.findIndex(
        (l) =>
          (l.source === link.source && l.target === link.target) ||
          (l.source === link.target && l.target === link.source)
      )
  );
}

/**
 * Constrains a node's position to stay within bounds.
 */
export function constrainNode(node: NetworkNode, width: number, height: number): void {
  node.x = Math.max(
    NETWORK_CONFIG.PADDING,
    Math.min(width - NETWORK_CONFIG.PADDING, node.x ?? 0)
  );
  node.y = Math.max(
    NETWORK_CONFIG.PADDING,
    Math.min(height - NETWORK_CONFIG.PADDING, node.y ?? 0)
  );
}

