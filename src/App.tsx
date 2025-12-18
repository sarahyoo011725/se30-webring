import { useState, useMemo, useEffect } from 'react';
import type { Student } from './types';
import { students } from './data/students';
import { filterStudents } from './lib/search';
import { calculateWebRingNavigation } from './lib/webRingNavigation';
import { Sidebar } from './components/layout/Sidebar';
import { MobileHeader } from './components/layout/MobileHeader';
import { AboutSection } from './components/layout/AboutSection';
import { NetworkOverlay } from './components/layout/NetworkOverlay';
import { StudentList } from './components/StudentList';
import { NetworkDiagram } from './components/NetworkDiagram';
import { StudentModal } from './components/StudentModal';
import { WebRingWidget } from './components/WebRingWidget';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNetwork, setShowNetwork] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = useMemo(
    () => filterStudents(students, searchQuery),
    [searchQuery]
  );

  // Handle webring navigation redirects
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromSite = params.get('from');
    const direction = params.get('dir');

    if (fromSite && direction && (direction === 'prev' || direction === 'next')) {
      const allSites = students
        .map((s) => s.website)
        .filter((url): url is string => url !== undefined);

      if (allSites.length > 0) {
        const navigation = calculateWebRingNavigation(allSites, fromSite);
        const targetSite = direction === 'prev' ? navigation.prev : navigation.next;

        if (targetSite) {
          // Redirect to the target site
          window.location.href = targetSite;
          return;
        }
      }
    }
  }, []);

  const handleNodeClick = (student: Student) => {
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  const handleToggleNetwork = () => {
    setShowNetwork(!showNetwork);
  };

  return (
    <div className="min-h-screen w-full bg-[#181818] flex flex-col sm:flex-row">
      <Sidebar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        students={students}
      />

      <MobileHeader showNetwork={showNetwork} onToggleNetwork={handleToggleNetwork} />

      <main className="flex-1 sm:ml-[500px] overflow-y-auto">
        <div className="p-4 sm:p-6 pt-24 sm:pt-6">
          <AboutSection
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            students={students}
          />

          <div className="hidden sm:block mb-8">
            <div className="h-[400px] border border-white/10">
              <NetworkDiagram students={filteredStudents} onNodeClick={handleNodeClick} />
            </div>
          </div>

          <StudentList students={filteredStudents} onProfileClick={handleNodeClick} />

          {/* Mobile Widget at Bottom */}
          <div className="sm:hidden mt-8 pb-4 flex justify-center">
            <WebRingWidget
              sites={students.map((s) => s.website).filter((url): url is string => url !== undefined)}
            />
          </div>
        </div>
      </main>

      <NetworkOverlay
        isOpen={showNetwork}
        onClose={() => setShowNetwork(false)}
        students={filteredStudents}
        onNodeClick={handleNodeClick}
      />

      <StudentModal student={selectedStudent} onClose={handleCloseModal} />
    </div>
  );
}
