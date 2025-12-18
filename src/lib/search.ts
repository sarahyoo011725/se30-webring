import type { Student } from '../types';

/**
 * Filters students by search query (matches name or website).
 * Returns all students if query is empty or only whitespace.
 */
export function filterStudents(students: Student[], query: string): Student[] {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return students;
  }

  const lowerQuery = trimmedQuery.toLowerCase();
  return students.filter(
    (student) =>
      student.name.toLowerCase().includes(lowerQuery) ||
      (student.website && student.website.toLowerCase().includes(lowerQuery))
  );
}

