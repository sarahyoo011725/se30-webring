import { NetworkDiagram } from '../NetworkDiagram';
import type { Student } from '../../types';
import { UI_TEXT } from '../../constants';

interface NetworkOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  onNodeClick: (student: Student) => void;
}

export function NetworkOverlay({
  isOpen,
  onClose,
  students,
  onNodeClick,
}: NetworkOverlayProps) {
  if (!isOpen) return null;

  return (
    <div
      className="sm:hidden fixed inset-0 z-40 bg-black/70 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-[#181818] w-full max-w-4xl h-[80vh] p-6 border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{UI_TEXT.NETWORK_VIEW_TITLE}</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-candlelight transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="h-full border border-white/10">
          <NetworkDiagram students={students} onNodeClick={onNodeClick} />
        </div>
      </div>
    </div>
  );
}
