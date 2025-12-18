import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { Student } from '../types';
import type { D3Node, D3Link, D3GSelection } from '../lib/d3-types';
import { createInitialNodes, generateLinks, constrainNode } from '../lib/networkDiagram';
import { NETWORK_CONFIG, UI_TEXT } from '../constants';
import {
  createSimulation,
  createZoomBehavior,
  createLinks,
  createNodes,
  applyHoverEffects,
  createDragBehavior,
  updateLinkPositions,
  updateNodePositions,
} from '../lib/networkDiagramHelpers';

interface NetworkDiagramProps {
  students: Student[];
  onNodeClick?: (student: Student) => void;
}

export function NetworkDiagram({ students, onNodeClick }: NetworkDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || students.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    if (width === 0 || height === 0) return;

    const centerX = width / 2;
    const centerY = height / 2;

    const nodes = createInitialNodes(students, width, height) as D3Node[];
    const uniqueLinks = generateLinks(nodes) as D3Link[];

    // Create defs section for clipPath
    const defs = svg.append('defs');
    const clipPath = defs.append('clipPath').attr('id', 'node-clip');
    clipPath.append('circle').attr('r', NETWORK_CONFIG.NODE_CLIP_RADIUS);

    // Create container group for pan/zoom
    const container = svg.append('g').attr('class', 'container') as D3GSelection;

    // Create simulation
    const simulation = createSimulation(nodes, uniqueLinks, centerX, centerY);

    // Constrain nodes to stay within bounds
    const constrainNodeInBounds = (node: D3Node) => {
      constrainNode(node, width, height);
    };

    // Add pan/zoom behavior
    const zoom = createZoomBehavior(container);
    svg.call(zoom);

    // Create links and nodes
    const linkSelection = createLinks(container, uniqueLinks);
    const nodeSelection = createNodes(container, nodes);

    // Apply hover effects
    applyHoverEffects(nodeSelection);

    // Add drag behavior
    const draggedNodes = new Set<number>();
    const drag = createDragBehavior(simulation, draggedNodes, constrainNodeInBounds);
    nodeSelection.call(drag);

    // Handle click - only open modal if node wasn't dragged
    nodeSelection.on('click', (event, d) => {
      event.stopPropagation();
      if (!draggedNodes.has(d.id) && onNodeClick && d.student) {
        onNodeClick(d.student);
      }
      draggedNodes.delete(d.id);
    });

    // Update positions on simulation tick
    simulation.on('tick', () => {
      nodes.forEach(constrainNodeInBounds);
      updateLinkPositions(linkSelection);
      updateNodePositions(nodeSelection);
    });

    return () => {
      simulation.stop();
    };
  }, [students, onNodeClick]);

  if (students.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white/60">
        {UI_TEXT.ADD_STUDENTS_MESSAGE}
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#181818] relative">
      <svg ref={svgRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-4 bg-[#1a1a1a] border border-white/10 rounded-md px-3 py-2 text-sm text-white/70 font-medium">
        {UI_TEXT.SITES_COUNT_LABEL} {students.length}
      </div>
    </div>
  );
}
