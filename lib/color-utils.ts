export function generateRandomColor(): string {
  // Generate a random hue between 0 and 360
  const hue = Math.floor(Math.random() * 360);
  // Generate a random saturation between 40% and 100%
  const saturation = Math.floor(Math.random() * 60) + 40;
  // Generate a random lightness between 20% and 80%
  const lightness = Math.floor(Math.random() * 60) + 20;
  
  return `${hue} ${saturation}% ${lightness}%`;
}

export function generateColorPalette() {
  // Generate a base color
  const baseHue = Math.floor(Math.random() * 360);
  const baseSaturation = Math.floor(Math.random() * 60) + 40;
  const baseLightness = Math.floor(Math.random() * 60) + 20;
  
  // Determine if we're generating a light or dark theme
  const isLight = baseLightness > 50;
  
  // Generate related colors based on the base color
  return {
    background: `${baseHue} ${baseSaturation}% ${isLight ? 95 : 5}%`,
    foreground: `${baseHue} ${baseSaturation}% ${isLight ? 5 : 95}%`,
    card: `${baseHue} ${baseSaturation}% ${isLight ? 90 : 10}%`,
    cardForeground: `${baseHue} ${baseSaturation}% ${isLight ? 10 : 90}%`,
    popover: `${baseHue} ${baseSaturation}% ${isLight ? 90 : 10}%`,
    popoverForeground: `${baseHue} ${baseSaturation}% ${isLight ? 10 : 90}%`,
    primary: `${baseHue} ${baseSaturation}% ${baseLightness}%`,
    primaryForeground: `${baseHue} ${baseSaturation}% ${isLight ? 95 : 5}%`,
    secondary: `${baseHue} ${baseSaturation}% ${isLight ? 80 : 20}%`,
    secondaryForeground: `${baseHue} ${baseSaturation}% ${isLight ? 20 : 80}%`,
    muted: `${baseHue} ${baseSaturation}% ${isLight ? 80 : 20}%`,
    mutedForeground: `${baseHue} ${baseSaturation}% ${isLight ? 30 : 70}%`,
    accent: `${baseHue} ${baseSaturation}% ${isLight ? 80 : 20}%`,
    accentForeground: `${baseHue} ${baseSaturation}% ${isLight ? 20 : 80}%`,
    destructive: `${baseHue} ${baseSaturation}% ${isLight ? 60 : 40}%`,
    destructiveForeground: `${baseHue} ${baseSaturation}% ${isLight ? 95 : 5}%`,
    border: `${baseHue} ${baseSaturation}% ${isLight ? 80 : 20}%`,
    input: `${baseHue} ${baseSaturation}% ${isLight ? 80 : 20}%`,
    ring: `${baseHue} ${baseSaturation}% ${baseLightness}%`,
  };
}

export function ensureContrast(foreground: string, background: string): string {
  // This is a simple implementation - in a real app, you'd want to use a proper
  // contrast checking algorithm like WCAG 2.1
  const [h, s, l] = background.split(' ').map(Number);
  const newLightness = l > 50 ? l - 30 : l + 30;
  return `${h} ${s}% ${newLightness}%`;
} 