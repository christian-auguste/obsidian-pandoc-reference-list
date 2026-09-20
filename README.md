## Obsidian Pandoc Reference List

Displays formatted references for Pandoc citekeys present in the current
document.

## Use

- Install [Pandoc](https://pandoc.org/) 2.11 or newer.
- Configure a compatible bibliography file.
- Optionally configure a CSL style.
- Run **Pandoc Reference List: Show reference list** from the command
  palette.
- Enable **Process citations in links** to render `[[@citekey]]` links as
  citations while retaining their Obsidian navigation behavior.

## Development

```sh
npm ci
npm run dev
```

Use a separate development vault. To build a release artifact:

```sh
npm run build
```

Copy `main.js`, `manifest.json`, and `styles.css` into:

```text
<vault>/.obsidian/plugins/obsidian-pandoc-reference-list/
```

Then reload the plugin in Obsidian.

This fork modernizes the build toolchain and guards the reference-list view
against stale workspace views while processing citations.
