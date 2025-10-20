"use client";
import { useState } from "react";
import Image from "next/image";

interface FloppyDiskProps {
  title: string;
  onInsert: () => void;
  tabIndex: number;
  diskNumber: number;
}

export function FloppyDisk({ title, onInsert, tabIndex, diskNumber }: FloppyDiskProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onInsert();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onInsert();
    }
  };

  return (
    <div
      className={`
        relative w-24 h-24 sm:w-28 sm:h-28 cursor-pointer transition-all duration-200
        ${isHovered ? 'scale-105' : 'scale-100'}
        focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50
      `}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={tabIndex}
      role="button"
      aria-label={`Insert disk ${diskNumber}: ${title}`}
    >
      {/* Floppy Disk SVG */}
      <Image
        src={`/disk${diskNumber}.svg`}
        alt={`Floppy disk ${diskNumber}: ${title}`}
        width={112}
        height={112}
        className="w-full h-full object-contain"
        priority={diskNumber <= 3} // Prioritize first few disks
      />
      
      {/* Label Overlay - positioned to match SVG white label area */}
      <div 
        className="absolute overflow-hidden rounded-lg"
        style={{
          // Calculate position based on SVG coordinates
          // SVG white rect: x=209.09631, y=34.609047, width=523.46179, height=392.23584
          // SVG total: 668.27722 x 701.5965
          // Adjusted left by 20px (converted to percentage: 20/112 = ~17.9%)
          left: `calc(${(209.09631 / 668.27722) * 100}% - 20px)`,
          top: `calc(${(34.609047 / 701.5965) * 100}% - 4px)`,
          width: `${(523.46179 / 668.27722) * 100}%`,
          height: `calc(${(392.23584 / 701.5965) * 100}% + 6px)`,
        }}
      >
        <Image
          src={`/label${diskNumber}.jpg`}
          alt={`Label for ${title}`}
          width={523}
          height={392}
          className="w-full h-full object-cover"
          priority={diskNumber <= 3}
        />
      </div>
      
      {/* Hover Effect */}
      {isHovered && (
        <div className="absolute inset-0 border-2 border-cyan-400 rounded-sm animate-pulse pointer-events-none"></div>
      )}
      
      {/* Disk Number Badge */}
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
        {diskNumber}
      </div>
    </div>
  );
}
