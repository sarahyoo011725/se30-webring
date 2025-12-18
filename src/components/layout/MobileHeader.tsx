import { Logo } from '../Logo';

interface MobileHeaderProps {
  showNetwork: boolean;
  onToggleNetwork: () => void;
}

export function MobileHeader({ showNetwork, onToggleNetwork }: MobileHeaderProps) {
  return (
    <>
      <div className="sm:hidden fixed top-0 left-0 right-0 z-50 bg-[#181818] border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <Logo className="h-8 w-8" />
        <button
          onClick={onToggleNetwork}
          className="text-white/80 hover:text-candlelight transition-colors text-base p-1"
          aria-label="Toggle network view"
        >
          {showNetwork ? '✕' : '⊞'}
        </button>
      </div>
    </>
  );
}
