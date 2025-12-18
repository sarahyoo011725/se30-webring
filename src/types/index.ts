export interface Student {
  name: string;
  website?: string;
  pfp: string; // Path relative to /assets/, e.g. "assets/pfps/william-cagas.jpg"
}

export interface NetworkNode {
  id: number;
  name: string;
  website?: string;
  student: Student;
  x: number;
  y: number;
  fx: number | null;
  fy: number | null;
}

export interface NetworkLink {
  source: number;
  target: number;
}

export interface WebRingNavigation {
  prev: string | null;
  next: string | null;
}

