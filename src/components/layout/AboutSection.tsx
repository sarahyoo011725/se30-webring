import { SearchBar } from '../SearchBar';
import { WebRingWidget } from '../WebRingWidget';
import type { Student } from '../../types';
import { UI_TEXT, EXTERNAL_URLS } from '../../constants';

interface AboutSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  students: Student[];
}

function getWebsiteUrls(students: Student[]): string[] {
  return students.map((s) => s.website).filter((url): url is string => url !== undefined);
}

export function AboutSection({ searchQuery, onSearchChange, students }: AboutSectionProps) {
  return (
    <div className="sm:hidden text-white/90">
      <h1 className="text-3xl font-bold text-white mb-4">{UI_TEXT.APP_TITLE}</h1>

      <p className="text-base leading-relaxed mb-4">
        {UI_TEXT.ABOUT_DESCRIPTION}{' '}
        <a
          className="text-candlelight hover:text-old-gold underline transition-colors"
          href={EXTERNAL_URLS.UNIVERSITY_OF_WATERLOO}
          target="_blank"
          rel="noopener noreferrer"
        >
          University of Waterloo
        </a>
        .
      </p>
      <p className="text-base leading-relaxed mb-6">{UI_TEXT.ABOUT_DESCRIPTION_2}</p>

      <div className="mb-2">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>
    </div>
  );
}
