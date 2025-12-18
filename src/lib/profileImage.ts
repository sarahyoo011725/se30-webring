import type { Student } from '../types';

/**
 * Gets the profile image URL for a student.
 * Ensures the path starts with '/' for proper asset resolution.
 */
export function getProfileImageUrl(student: Student): string {
  // Ensure path starts with '/' for proper asset resolution
  return student.pfp.startsWith('/') ? student.pfp : `/${student.pfp}`;
}
