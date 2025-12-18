import * as d3 from 'd3';
import type { D3Node, D3Link, D3NodeSelection, D3LinkSelection, D3GSelection } from './d3-types';
import { NETWORK_CONFIG } from '../constants';
import { getProfileImageUrl } from './profileImage';
import { getLogoPlaceholderDataUrl } from './logoPlaceholder';

/**
 * Creates D3 force simulation with configured forces.
 */
export function createSimulation(
  nodes: D3Node[],
  links: D3Link[],
  centerX: number,
  centerY: number
): d3.Simulation<D3Node, D3Link> {
  return d3
    .forceSimulation<D3Node>(nodes)
    .force(
      'link',
      d3
        .forceLink<D3Node, D3Link>(links)
        .id((d) => d.id)
        .distance(NETWORK_CONFIG.LINK_DISTANCE)
        .strength(NETWORK_CONFIG.LINK_STRENGTH)
    )
    .force('charge', d3.forceManyBody().strength(NETWORK_CONFIG.CHARGE_STRENGTH))
    .force('center', d3.forceCenter(centerX, centerY))
    .force('collision', d3.forceCollide().radius(NETWORK_CONFIG.COLLISION_RADIUS));
}

/**
 * Creates zoom behavior for SVG.
 */
export function createZoomBehavior(
  container: D3GSelection
): d3.ZoomBehavior<SVGSVGElement, unknown> {
  return d3
    .zoom<SVGSVGElement, unknown>()
    .scaleExtent([NETWORK_CONFIG.ZOOM_SCALE_MIN, NETWORK_CONFIG.ZOOM_SCALE_MAX])
    .on('zoom', (event) => {
      container.attr('transform', event.transform.toString());
    });
}

/**
 * Creates and styles link elements.
 */
export function createLinks(container: D3GSelection, links: D3Link[]): D3LinkSelection {
  return container
    .append('g')
    .selectAll<SVGLineElement, D3Link>('line')
    .data(links)
    .enter()
    .append('line')
    .attr('stroke', '#ffffff')
    .attr('stroke-opacity', 0.15)
    .attr('stroke-width', 1) as D3LinkSelection;
}

/**
 * Creates and styles node elements with images and labels.
 */
export function createNodes(container: D3GSelection, nodes: D3Node[]): D3NodeSelection {
  const nodeSelection = (container
    .append('g')
    .selectAll<SVGGElement, D3Node>('g')
    .data(nodes)
    .enter()
    .append('g')
    .attr('class', 'node-group')
    .style('cursor', 'grab')) as D3NodeSelection;

  // Add profile pictures
  const placeholderUrl = getLogoPlaceholderDataUrl();
  nodeSelection
    .append('image')
    .attr('x', -NETWORK_CONFIG.NODE_CLIP_RADIUS)
    .attr('y', -NETWORK_CONFIG.NODE_CLIP_RADIUS)
    .attr('width', NETWORK_CONFIG.NODE_DEFAULT_SIZE)
    .attr('height', NETWORK_CONFIG.NODE_DEFAULT_SIZE)
    .attr('href', (d) => getProfileImageUrl(d.student))
    .attr('clip-path', 'url(#node-clip)')
    .attr('preserveAspectRatio', 'xMidYMid slice')
    .on('error', function () {
      d3.select(this).attr('href', placeholderUrl);
    });

  // Add circular border
  nodeSelection
    .append('circle')
    .attr('r', NETWORK_CONFIG.NODE_BORDER_RADIUS)
    .attr('fill', 'none')
    .attr('stroke', '#000000')
    .attr('stroke-width', NETWORK_CONFIG.NODE_BORDER_WIDTH)
    .attr('pointer-events', 'none');

  // Add text labels
  nodeSelection
    .append('text')
    .text((d) => d.name)
    .attr('text-anchor', 'middle')
    .attr('dy', NETWORK_CONFIG.LABEL_OFFSET)
    .attr('fill', '#ffffff')
    .attr('font-size', NETWORK_CONFIG.LABEL_FONT_SIZE)
    .attr('font-family', 'system-ui, -apple-system, sans-serif')
    .attr('pointer-events', 'none')
    .style('user-select', 'none');

  return nodeSelection;
}

/**
 * Applies hover effects to nodes.
 */
export function applyHoverEffects(nodeSelection: D3NodeSelection): void {
  nodeSelection
    .on('mouseover', function () {
      d3.select(this)
        .select('circle')
        .attr('stroke-width', NETWORK_CONFIG.NODE_HOVER_BORDER_WIDTH)
        .attr('stroke', '#FFCE1A');
      d3.select(this)
        .select('image')
        .attr('width', NETWORK_CONFIG.NODE_HOVER_SIZE)
        .attr('height', NETWORK_CONFIG.NODE_HOVER_SIZE)
        .attr('x', -NETWORK_CONFIG.NODE_HOVER_SIZE / 2)
        .attr('y', -NETWORK_CONFIG.NODE_HOVER_SIZE / 2);
    })
    .on('mouseout', function () {
      d3.select(this)
        .select('circle')
        .attr('stroke-width', NETWORK_CONFIG.NODE_BORDER_WIDTH)
        .attr('stroke', '#000000');
      d3.select(this)
        .select('image')
        .attr('width', NETWORK_CONFIG.NODE_DEFAULT_SIZE)
        .attr('height', NETWORK_CONFIG.NODE_DEFAULT_SIZE)
        .attr('x', -NETWORK_CONFIG.NODE_CLIP_RADIUS)
        .attr('y', -NETWORK_CONFIG.NODE_CLIP_RADIUS);
    });
}

/**
 * Creates drag behavior for nodes.
 */
export function createDragBehavior(
  simulation: d3.Simulation<D3Node, D3Link>,
  draggedNodes: Set<number>,
  constrainNodeInBounds: (node: D3Node) => void
): d3.DragBehavior<SVGGElement, D3Node, unknown> {
  return d3
    .drag<SVGGElement, D3Node>()
    .on('start', function (event, d) {
      draggedNodes.delete(d.id);
      if (!event.active) simulation.alphaTarget(NETWORK_CONFIG.ALPHA_TARGET).restart();
      d.fx = d.x ?? null;
      d.fy = d.y ?? null;
      d3.select(this).style('cursor', 'grabbing');
    })
    .on('drag', (event, d) => {
      draggedNodes.add(d.id);
      d.fx = event.x;
      d.fy = event.y;
      constrainNodeInBounds(d);
    })
    .on('end', function (event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
      d3.select(this).style('cursor', 'grab');
    });
}

/**
 * Updates link positions based on node positions.
 */
export function updateLinkPositions(linkSelection: D3LinkSelection): void {
  linkSelection
    .attr('x1', (d) => {
      const source = d.source as D3Node;
      return source.x ?? 0;
    })
    .attr('y1', (d) => {
      const source = d.source as D3Node;
      return source.y ?? 0;
    })
    .attr('x2', (d) => {
      const target = d.target as D3Node;
      return target.x ?? 0;
    })
    .attr('y2', (d) => {
      const target = d.target as D3Node;
      return target.y ?? 0;
    });
}

/**
 * Updates node positions based on simulation.
 */
export function updateNodePositions(nodeSelection: D3NodeSelection): void {
  nodeSelection.attr('transform', (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
}

