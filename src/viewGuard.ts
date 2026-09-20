export interface ReferenceListViewLike {
  setMessage(message: string): void;
  setNoContentMessage(): void;
  setViewContent(bib: HTMLElement): void;
}

export function isReferenceListView(
  view: unknown
): view is ReferenceListViewLike {
  if (!view || typeof view !== 'object') return false;

  const candidate = view as Partial<ReferenceListViewLike>;
  return (
    typeof candidate.setMessage === 'function' &&
    typeof candidate.setNoContentMessage === 'function' &&
    typeof candidate.setViewContent === 'function'
  );
}
