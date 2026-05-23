import * as fs from 'node:fs';
import * as path from 'node:path';
import { chromium, type Browser, type Page } from '@playwright/test';
import axe, { type Result, type RunOptions } from 'axe-core';
import * as vscode from 'vscode';
import { buildChatHtml } from '../../src/ai/chatHtml';
import { buildDrcRuleEditorHtml } from '../../src/drc/drcRuleEditorPanel';
import {
  createKiCanvasViewerHtml,
  createViewerErrorHtml
} from '../../src/providers/viewerHtml';
import { buildSettingsHtml } from '../../src/settings/settingsHtml';

jest.setTimeout(60_000);

const extensionRoot = path.resolve(__dirname, '../..');

const axeOptions: RunOptions = {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
  }
};

describe('WCAG 2.1 AA webview conformance gate', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage({
      viewport: { width: 1280, height: 900 }
    });
  });

  afterAll(async () => {
    await page?.close();
    await browser?.close();
  });

  it.each(webviewSurfaces())(
    'has no automated axe-core A/AA violations in %s',
    async (_name, html) => {
      await page.setContent(prepareForAxe(html), {
        waitUntil: 'domcontentloaded'
      });
      await page.addScriptTag({ content: axe.source });

      const results = await page.evaluate(async (options) => {
        return window.axe.run(document, options);
      }, axeOptions);

      expect(formatViolations(results.violations)).toEqual([]);
    }
  );
});

function webviewSurfaces(): Array<[string, string]> {
  const webview = createWebviewMock();
  return [
    [
      'KiCad Studio Settings',
      buildSettingsHtml({
        webview,
        state: {
          aiKeyStored: true,
          octopartKeyStored: false,
          settings: {
            'kicadstudio.ai.provider': 'openai',
            'kicadstudio.ai.language': 'en',
            'kicadstudio.mcp.endpoint': 'http://127.0.0.1:27185'
          },
          cli: {
            path: '/usr/bin/kicad-cli',
            versionLabel: 'KiCad 10.0.3',
            source: 'auto-detected'
          }
        }
      })
    ],
    [
      'KiCad AI Chat',
      buildChatHtml({
        webview,
        extensionUri: vscode.Uri.file(extensionRoot)
      })
    ],
    [
      'KiCad schematic viewer',
      createKiCanvasViewerHtml({
        title: 'KiCad Studio Schematic Viewer',
        fileName: 'demo.kicad_sch',
        fileType: 'schematic',
        status: 'Opening interactive renderer...',
        cspSource: webview.cspSource,
        kicanvasUri: `${webview.cspSource}/media/kicanvas/kicanvas.js`,
        base64: Buffer.from('(kicad_sch)').toString('base64'),
        disabledReason: '',
        metadata: {
          notes: [
            'Schematic metadata is available outside the KiCanvas canvas.'
          ]
        }
      })
    ],
    [
      'KiCad PCB viewer',
      createKiCanvasViewerHtml({
        title: 'KiCad Studio PCB Viewer',
        fileName: 'demo.kicad_pcb',
        fileType: 'board',
        status: 'Opening interactive renderer...',
        cspSource: webview.cspSource,
        kicanvasUri: `${webview.cspSource}/media/kicanvas/kicanvas.js`,
        base64: Buffer.from('(kicad_pcb)').toString('base64'),
        disabledReason: '',
        metadata: {
          layers: [
            {
              name: 'F.Cu',
              kind: 'signal',
              visible: true
            }
          ],
          tuningProfiles: [{ name: 'USB differential pair', layer: 'F.Cu' }]
        }
      })
    ],
    [
      'KiCad viewer error state',
      createViewerErrorHtml(
        'demo.kicad_sch',
        new Error('Fixture failure for accessibility audit'),
        webview.cspSource
      )
    ],
    ['Bill of Materials view', loadTemplate('bom.html')],
    ['Netlist view', loadTemplate('netlist.html')],
    ['Visual diff view', loadTemplate('diff.html')],
    ['DRC rule editor', buildDrcRuleEditorHtml()]
  ];
}

function createWebviewMock(): vscode.Webview {
  return {
    cspSource: 'vscode-resource:',
    asWebviewUri: (uri: vscode.Uri) =>
      vscode.Uri.parse(`vscode-resource:${uri.toString()}`)
  } as vscode.Webview;
}

function loadTemplate(fileName: string): string {
  return fs
    .readFileSync(path.join(extensionRoot, 'media', 'viewer', fileName), 'utf8')
    .replaceAll('{{cspSource}}', 'vscode-resource:')
    .replaceAll('{{scriptNonce}}', 'test-nonce')
    .replaceAll('{{bomCssUri}}', 'vscode-resource:/media/styles/bom.css')
    .replaceAll('{{viewerCssUri}}', 'vscode-resource:/media/styles/viewer.css')
    .replaceAll(
      '{{kicanvasUri}}',
      'vscode-resource:/media/kicanvas/kicanvas.js'
    )
    .replaceAll('{{scriptUri}}', 'vscode-resource:/media/viewer/test.js');
}

function prepareForAxe(html: string): string {
  const withoutCsp = html.replace(
    /<meta\s+http-equiv=["']Content-Security-Policy["'][\s\S]*?>/giu,
    ''
  );
  const withoutScripts = removePairedElements(withoutCsp, 'script');
  const withoutExternalStyles = removeVoidElements(
    withoutScripts,
    'link',
    isStylesheetLink
  );
  return withoutExternalStyles.replace(
    /<head>/iu,
    `<head>
  <style>
    :root {
      --vscode-editor-background: #1e1e1e;
      --vscode-editorWidget-background: #252526;
      --vscode-sideBar-background: #252526;
      --vscode-panel-border: #6f6f6f;
      --vscode-foreground: #f2f2f2;
      --vscode-descriptionForeground: #cccccc;
      --vscode-focusBorder: #80bdff;
      --vscode-errorForeground: #ff9b9b;
      --vscode-input-background: #111827;
      --vscode-input-foreground: #f2f2f2;
      --vscode-input-border: #8a8a8a;
      --vscode-button-background: #0e639c;
      --vscode-button-foreground: #ffffff;
      --vscode-button-hoverBackground: #1177bb;
      --vscode-button-secondaryBackground: #3a3d41;
      --vscode-button-secondaryForeground: #ffffff;
      --vscode-font-family: "Segoe UI", sans-serif;
      --vscode-editor-font-family: Consolas, monospace;
      --bg: #1e1e1e;
      --panel: #252526;
      --panel2: #252526;
      --side: #252526;
      --border: #8a8a8a;
      --text: #f2f2f2;
      --muted: #cccccc;
      --accent: #80bdff;
      --danger: #ff9b9b;
      --input: #111827;
    }
  </style>`
  );
}

function removePairedElements(html: string, tagName: string): string {
  const tag = tagName.toLowerCase();
  const lower = html.toLowerCase();
  const openNeedle = `<${tag}`;
  const closeNeedle = `</${tag}`;
  let output = '';
  let cursor = 0;

  while (cursor < html.length) {
    const openStart = lower.indexOf(openNeedle, cursor);
    if (openStart === -1) {
      output += html.slice(cursor);
      break;
    }

    const openEnd = lower.indexOf('>', openStart + openNeedle.length);
    if (openEnd === -1) {
      output += html.slice(cursor, openStart);
      break;
    }

    const closeStart = lower.indexOf(closeNeedle, openEnd + 1);
    if (closeStart === -1) {
      output += html.slice(cursor, openStart);
      break;
    }

    const closeEnd = lower.indexOf('>', closeStart + closeNeedle.length);
    if (closeEnd === -1) {
      output += html.slice(cursor, openStart);
      break;
    }

    output += html.slice(cursor, openStart);
    cursor = closeEnd + 1;
  }

  return output;
}

function removeVoidElements(
  html: string,
  tagName: string,
  shouldRemove: (element: string) => boolean
): string {
  const tag = tagName.toLowerCase();
  const lower = html.toLowerCase();
  const openNeedle = `<${tag}`;
  let output = '';
  let cursor = 0;

  while (cursor < html.length) {
    const openStart = lower.indexOf(openNeedle, cursor);
    if (openStart === -1) {
      output += html.slice(cursor);
      break;
    }

    const openEnd = lower.indexOf('>', openStart + openNeedle.length);
    if (openEnd === -1) {
      output += html.slice(cursor);
      break;
    }

    const element = html.slice(openStart, openEnd + 1);
    output += html.slice(cursor, openStart);
    if (!shouldRemove(element)) {
      output += element;
    }
    cursor = openEnd + 1;
  }

  return output;
}

function isStylesheetLink(element: string): boolean {
  const normalized = element.toLowerCase().replace(/\s+/gu, '');
  return (
    normalized.includes('rel="stylesheet"') ||
    normalized.includes("rel='stylesheet'")
  );
}

function formatViolations(violations: Result[]): string[] {
  return violations.map((violation) => {
    const targets = violation.nodes
      .slice(0, 3)
      .map((node) => `${node.target.join(' ')} ${node.failureSummary ?? ''}`)
      .join('; ');
    return `${violation.id} [${violation.impact ?? 'unknown'}] ${violation.help}: ${targets}`;
  });
}

declare global {
  interface Window {
    axe: typeof axe;
  }
}
