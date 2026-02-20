import { useTheme } from "next-themes";

interface CarvixLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function CarvixLogo({ size = "md", showText = true }: CarvixLogoProps) {
  const { theme } = useTheme();
  
  const dimensions = {
    sm: { icon: 24, text: 20 },
    md: { icon: 32, text: 24 },
    lg: { icon: 48, text: 36 }
  };
  
  const iconSize = dimensions[size].icon;
  const textSize = dimensions[size].text;
  
  // Dynamic colors based on theme
  const primaryColor = theme === "dark" ? "#8B5CF6" : "#7C3AED";
  const secondaryColor = theme === "dark" ? "#A78BFA" : "#8B5CF6";
  const textColor = theme === "dark" ? "#E9D5FF" : "#1F2937";
  
  return (
    <div className="flex items-center gap-2">
      {/* Logo Icon - Stylized "C" with path/career trajectory design */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer C shape */}
        <path
          d="M24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44C30.365 44 36.015 41.125 39.5 36.5"
          stroke={primaryColor}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        
        {/* Inner ascending path representing career growth */}
        <path
          d="M16 28L20 24L24 26L28 20L32 22L36 16"
          stroke={secondaryColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Dots representing milestones/achievements */}
        <circle cx="16" cy="28" r="2.5" fill={secondaryColor} />
        <circle cx="24" cy="26" r="2.5" fill={secondaryColor} />
        <circle cx="32" cy="22" r="2.5" fill={secondaryColor} />
        <circle cx="36" cy="16" r="3" fill={primaryColor} />
      </svg>
      
      {showText && (
        <span
          className="font-bold tracking-tight"
          style={{ 
            fontSize: `${textSize}px`,
            backgroundImage: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          Carvix
        </span>
      )}
    </div>
  );
}