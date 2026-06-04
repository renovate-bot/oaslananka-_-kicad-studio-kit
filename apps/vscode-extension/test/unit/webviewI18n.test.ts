jest.mock('vscode', () => jest.requireActual('./vscodeMock'), {
  virtual: true
});

import {
  WEBVIEW_MESSAGES,
  buildWebviewMessageMap,
  injectWebviewLocalization
} from '../../src/webviewI18n';

describe('webview localization', () => {
  it('builds exact-key identity webview map', () => {
    const map = buildWebviewMessageMap();

    expect(Object.keys(map).sort()).toEqual([...WEBVIEW_MESSAGES].sort());
    for (const message of WEBVIEW_MESSAGES) {
      expect(map[message]).toBe(message);
    }
  });

  it('injects a nonce-scoped script and sets lang to en', () => {
    const html = injectWebviewLocalization(
      '<!DOCTYPE html><html lang="en"><body><button aria-label="Save Rule">Save Rule</button></body></html>',
      'test-nonce'
    );

    expect(html).toContain('<html lang="en"');
    expect(html).toContain('<script nonce="test-nonce">');
    expect(html).toContain('globalThis.kicadStudioL10n');
    expect(html).not.toContain('</body><script');
  });
});
