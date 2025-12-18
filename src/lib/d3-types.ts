import type { NetworkNode, NetworkLink } from '../types';
import * as d3 from 'd3';

// D3 force simulation node type
export type D3Node = d3.SimulationNodeDatum & NetworkNode;

// D3 force link type
export type D3Link = d3.SimulationLinkDatum<D3Node> & NetworkLink;

// D3 zoom transform type
export type D3ZoomTransform = d3.ZoomTransform;

// D3 drag event type
export type D3DragEvent = d3.D3DragEvent<SVGGElement, D3Node, D3Node>;

// D3 selection types
export type D3SVGSelection = d3.Selection<SVGSVGElement, unknown, null, undefined>;
export type D3GSelection = d3.Selection<SVGGElement, unknown, null, undefined>;
export type D3NodeSelection = d3.Selection<SVGGElement, D3Node, SVGGElement, unknown>;
export type D3LinkSelection = d3.Selection<SVGLineElement, D3Link, SVGGElement, unknown>;

