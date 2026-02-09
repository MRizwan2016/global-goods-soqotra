
import React from "react";

const WaveBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Subtle top gradient wash */}
      <div 
        className="absolute top-0 inset-x-0 h-72 opacity-[0.04]"
        style={{
          background: "linear-gradient(180deg, hsl(220, 40%, 30%) 0%, transparent 100%)"
        }}
      />
      {/* Subtle bottom gradient */}
      <div 
        className="absolute bottom-0 inset-x-0 h-48 opacity-[0.02]"
        style={{
          background: "linear-gradient(0deg, hsl(220, 40%, 30%) 0%, transparent 100%)"
        }}
      />
    </div>
  );
};

export default WaveBackground;
