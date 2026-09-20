import { isReferenceListView } from './viewGuard';

describe('isReferenceListView()', () => {
  it('accepts a complete reference view contract', () => {
    expect(
      isReferenceListView({
        setMessage: () => undefined,
        setNoContentMessage: () => undefined,
        setViewContent: () => undefined,
      })
    ).toBe(true);
  });

  it('rejects an unloaded or unrelated view', () => {
    expect(isReferenceListView(null)).toBe(false);
    expect(isReferenceListView({ setMessage: () => undefined })).toBe(false);
  });
});
