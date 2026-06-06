export const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const INDEX_NOT_FOUND = -1;

export const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

export const getOklchFromHex = (hex: string) => {
  const div = document.createElement('div');
  div.style.color = hex;
  document.body.appendChild(div);
  div.style.color = `color(from ${hex} srgb oklch l c h)`;
  const oklchValue = getComputedStyle(div).color;

  document.body.removeChild(div);
  return oklchValue;
};
