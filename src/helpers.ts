import { FileSystemAdapter, htmlToMarkdown } from 'obsidian';
import { shellPath } from 'shell-path';

export function getVaultRoot() {
  // This is a desktop only plugin, so assume adapter is FileSystemAdapter
  return (app.vault.adapter as FileSystemAdapter).getBasePath();
}

export function copyElToClipboard(el: HTMLElement) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('electron').clipboard.write({
    html: el.outerHTML,
    text: htmlToMarkdown(el.outerHTML),
  });
}

export function pickDesktopFile(
  onSelect: (path: string) => void,
  accept?: string
) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = accept ?? '';
  input.hidden = true;

  const cleanup = () => input.remove();
  const select = () => {
    const file = input.files?.[0] as (File & { path?: string }) | undefined;
    if (file?.path) onSelect(file.path);
    cleanup();
  };

  input.addEventListener('change', select, { once: true });
  input.addEventListener('cancel', cleanup, { once: true });
  document.body.appendChild(input);
  input.click();
}

export class PromiseCapability<T> {
  settled = false;
  promise: Promise<T>;
  resolve: (data: T) => void;
  reject: (reason?: any) => void;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = (data) => {
        resolve(data);
        this.settled = true;
      };

      this.reject = (reason) => {
        reject(reason);
        this.settled = true;
      };
    });
  }
}

export async function fixPath() {
  if (process.platform === 'win32') {
    return;
  }

  try {
    const path = await shellPath();

    process.env.PATH =
      path ||
      [
        './node_modules/.bin',
        '/.nodebrew/current/bin',
        '/usr/local/bin',
        process.env.PATH,
      ].join(':');
  } catch (e) {
    console.error(e);
  }
}

export function areSetsEqual<T>(as: Set<T>, bs: Set<T>) {
  if (as.size !== bs.size) return false;
  for (const a of as) if (!bs.has(a)) return false;
  return true;
}
