
import React from "react";

const WaveBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Top wave */}
      <div 
        className="absolute top-0 inset-x-0 h-64 opacity-10 animate-[pulse_15s_ease-in-out_infinite]"
        style={{
          background: "linear-gradient(90deg, hsla(216, 41%, 79%, 1) 0%, hsla(186, 33%, 94%, 1) 100%)"
        }}
      >
        <svg 
          viewBox="0 0 1440 320" 
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
        >
          <path 
            fill="white" 
            fillOpacity="0.3"
            d="M0,32L48,69.3C96,107,192,181,288,192C384,203,480,149,576,122.7C672,96,768,96,864,112C960,128,1056,160,1152,176C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      
      {/* Bottom wave */}
      <div 
        className="absolute bottom-0 inset-x-0 h-64 opacity-10 animate-[pulse_20s_ease-in-out_infinite_reverse]"
        style={{
          background: "linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)"
        }}
      >
        <svg 
          viewBox="0 0 1440 320" 
          className="absolute top-0 w-full rotate-180"
          preserveAspectRatio="none"
        >
          <path 
            fill="white" 
            fillOpacity="0.2"
            d="M0,96L48,106.7C96,117,192,139,288,138.7C384,139,480,117,576,128C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      
      {/* Middle decorative elements */}
      <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-[pulse_8s_ease-in-out_infinite]"></div>
      <div className="absolute top-2/3 left-2/3 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-[pulse_15s_ease-in-out_infinite]"></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-[pulse_12s_ease-in-out_infinite]"></div>
    </div>
  );
};

export default WaveBackground;
