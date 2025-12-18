// External URLs
export const EXTERNAL_URLS = {
  UNIVERSITY_OF_WATERLOO: 'https://uwaterloo.ca/',
  GITHUB: 'https://github.com',
  SE_WEBRING: 'https://se-webring.xyz/',
  CS_WEBRING: 'https://cs.uwatering.com/',
  WEBRING_REPO: 'https://github.com/willcagas/se30-webring',
} as const;

// UI Text
export const UI_TEXT = {
  APP_TITLE: "SE '30 Webring",
  ABOUT_DESCRIPTION: "Official webring of the Software Engineering class of 2030 at the",
  ABOUT_DESCRIPTION_2: "This website is a collective of our cohort's software engineering students building a shared public presence.",
  NO_STUDENTS_FOUND: 'No students found.',
  ADD_STUDENTS_MESSAGE: 'Add students to see the network',
  NETWORK_VIEW_TITLE: 'Network View',
  SITES_COUNT_LABEL: 'Sites:',
} as const;

// Search
export const SEARCH_CONFIG = {
  DEFAULT_PLACEHOLDER: 'Search by name or website...',
} as const;

// Network Diagram
export const NETWORK_CONFIG = {
  PADDING: 40,
  RADIUS_FACTOR: 0.3,
  MIN_CONNECTIONS: 3,
  LINK_DISTANCE: 100,
  LINK_STRENGTH: 0.5,
  CHARGE_STRENGTH: -400,
  COLLISION_RADIUS: 20,
  ALPHA_TARGET: 0.3,
  RANDOM_LINK_PROBABILITY: 0.7,
  MIN_NODES_FOR_RANDOM: 3,
  ZOOM_SCALE_MIN: 0.5,
  ZOOM_SCALE_MAX: 2,
  NODE_CLIP_RADIUS: 18,
  NODE_BORDER_RADIUS: 18,
  NODE_BORDER_WIDTH: 2,
  NODE_HOVER_BORDER_WIDTH: 3,
  NODE_HOVER_SIZE: 40,
  NODE_DEFAULT_SIZE: 36,
  LABEL_FONT_SIZE: '11px',
  LABEL_OFFSET: 30,
} as const;

