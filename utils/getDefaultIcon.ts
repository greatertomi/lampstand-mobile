/* eslint-disable no-bitwise, unicorn/prefer-code-point */
type GetDefaultIconPrams = {
  size: number;
  id?: string;
};

// Simple hash function to generate consistent colors from string
const simpleHash = (str: string): number => {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

// Generate a simple geometric SVG icon based on the ID
export const getDefaultIcon = ({ id = 'default', size }: GetDefaultIconPrams): string => {
  const hash = simpleHash(id);

  // Generate colors based on hash
  const hue1 = hash % 360;
  const hue2 = (hash * 2) % 360;
  const saturation = 60 + (hash % 40); // 60-100%
  const lightness = 40 + (hash % 30); // 40-70%

  const color1 = `hsl(${hue1}, ${saturation}%, ${lightness}%)`;
  const color2 = `hsl(${hue2}, ${saturation}%, ${lightness + 10}%)`;

  // Generate pattern based on hash
  const pattern = hash % 4;
  let shapes = '';

  switch (pattern) {
    case 0: {
      // Circles
      shapes = `
        <circle cx="${size * 0.3}" cy="${size * 0.3}" r="${size * 0.15}" fill="${color1}"/>
        <circle cx="${size * 0.7}" cy="${size * 0.7}" r="${size * 0.15}" fill="${color2}"/>
      `;
      break;
    }
    case 1: {
      // Rectangles
      shapes = `
        <rect x="${size * 0.2}" y="${size * 0.2}" width="${size * 0.25}" height="${size * 0.25}" fill="${color1}"/>
        <rect x="${size * 0.55}" y="${size * 0.55}" width="${size * 0.25}" height="${size * 0.25}" fill="${color2}"/>
      `;
      break;
    }
    case 2: {
      // Triangles
      shapes = `
        <polygon points="${size * 0.3},${size * 0.2} ${size * 0.1},${size * 0.5} ${size * 0.5},${size * 0.5}"
        fill="${color1}"/>
        <polygon points="${size * 0.7},${size * 0.8} ${size * 0.5},${size * 0.5} ${size * 0.9},${size * 0.5}"
        fill="${color2}"/>
      `;
      break;
    }
    default: {
      // Mixed shapes
      shapes = `
        <circle cx="${size * 0.25}" cy="${size * 0.25}" r="${size * 0.1}" fill="${color1}"/>
        <rect x="${size * 0.5}" y="${size * 0.5}" width="${size * 0.3}" height="${size * 0.3}" fill="${color2}"/>
      `;
    }
  }

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${color2}" opacity="0.1"/>
      ${shapes}
    </svg>
  `;
};
