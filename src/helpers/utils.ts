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

const TAG_A = 'a';
const TAG_B = 'b';

export const HEADING_CONTENT = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hgroup'
];

export const SECTIONING_CONTENT = [
  'article',
  'aside',
  'nav',
  'section'
];

/**
 * {@see https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#phrasing_content}
 */
export const PHRASING_CONTENT = [
  'abbr',
  'audio',
  TAG_B,
  'bdi',
  'bdo',
  'br',
  'button',
  'canvas',
  'cite',
  'code',
  'data',
  'datalist',
  'dfn',
  'em',
  'embed',
  'i',
  'iframe',
  'img',
  'input',
  'kbd',
  'label',
  'mark',
  'math',
  'meter',
  'noscript',
  'object',
  'output',
  'picture',
  'progress',
  'q',
  'ruby',
  's',
  'samp',
  'script',
  'select',
  'slot',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'svg',
  'template',
  'textarea',
  'time',
  'u',
  'var',
  'video',
  'wbr'
];

export const INTERACTIVE_CONTENT = [
  'button',
  'details',
  'embed',
  'iframe',
  'label',
  'select',
  'textarea',
  TAG_A,
  'audio',
  'img',
  'input',
  'object',
  'video'
];

export const PALPABLE_CONTENT = [
  ...SECTIONING_CONTENT,
  TAG_A,
  'abbr',
  'address',
  TAG_B,
  'bdi',
  'bdo',
  'blockquote',
  'button',
  'canvas',
  'cite',
  'code',
  'data',
  'del',
  'details',
  'dfn',
  'div',
  'em',
  'embed',
  'fieldset',
  'footer',
  'figure',
  'form',
  'iframe',
  'img',
  'ins',
  'kbd',
  'label',
  'main',
  'map',
  'mark',
  'math',
  'meter',
  'object',
  'p',
  'picture',
  'pre',
  'progress',
  'q',
  'ruby',
  's',
  'samp',
  'search',
  'select',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'svg',
  'table',
  'textarea',
  'time',
  'u',
  'var',
  'video'
];

export const FLOW_CONTENT = [
  TAG_A,
  'abbr',
  'address',
  'article',
  'aside',
  'audio',
  TAG_B,
  'bdi',
  'bdo',
  'blockquote',
  'br',
  'button',
  'canvas',
  'cite',
  'code',
  'data',
  'datalist',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'em',
  'embed',
  'fieldset',
  'figure',
  'footer',
  'form',
  'geolocation',
  ...HEADING_CONTENT,
  'header',
  'hr',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'label',
  'main',
  'map',
  'mark',
  'math',
  'menu',
  'meter',
  'nav',
  'noscript',
  'object',
  'ol',
  'output',
  'p',
  'picture',
  'pre',
  'progress',
  'q',
  'ruby',
  's',
  'samp',
  'script',
  'search',
  'section',
  'select',
  'slot',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'svg',
  'table',
  'template',
  'textarea',
  'time',
  'u',
  'ul',
  'var',
  'video',
  'wbr'
];

export class CommandHistory {
  private history: string[];
  private maxSize: number;
  private cursor: number;

  constructor(maxSize: number = 50) {
    this.history = [];
    this.maxSize = maxSize;
    this.cursor = 0;
  }

  public add(command: string): void {
    const trimmedCommand = command.trim();

    if (!trimmedCommand || this.history[this.history.length - 1] === trimmedCommand) {
      return;
    }

    this.history.push(trimmedCommand);

    if (this.history.length > this.maxSize) {
      this.history.shift();
    }

    this.cursor = this.history.length;
  }

  public previous(): string {
    if (this.cursor > 0) {
      this.cursor--;
    }
    return this.history[this.cursor] ?? '';
  }

  public next(): string {
    if (this.cursor < this.history.length - 1) {
      this.cursor++;
      return this.history[this.cursor] ?? '';
    }
    this.cursor = this.history.length;
    return '';
  }

  public getAll(): readonly string[] {
    return this.history;
  }
}

function placeCursorAtEndContentEditable(element: HTMLElement) {
  element.focus();

  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(false);

  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

export function setContentEditableText(element: HTMLElement, text: string) {
  element.textContent = text;
  placeCursorAtEndContentEditable(element);
}
