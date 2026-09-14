// @ts-check

/**
 * Rehype plugin: wrap every Markdown `<table>` in a horizontally scrollable,
 * keyboard-focusable region (`<div class="table-scroll">`).
 *
 * Reason: Markdown can't express a wrapper, and making the `<table>` itself the
 * scroller (`display: block`) can make some browser + screen-reader pairs
 * (notably Safari/VoiceOver) stop announcing it as a table. The wrapper scrolls
 * instead, so the table keeps its native semantics. `role="region"` + a label +
 * `tabindex="0"` let keyboard users focus the region and scroll it with arrows.
 *
 * Dependency-free on purpose: a plain recursive walk over the HAST tree.
 *
 * @returns {(tree: any, file: any) => void} The rehype transformer.
 */
export default function rehypeTableScroll() {
  return (tree, file) => {
    const path = String(file?.path ?? file?.history?.[0] ?? '');
    // Articles live under src/content/perspective/<lang>/ — label per locale.
    const label = /[\\/]fr[\\/]/.test(path) ? 'Tableau défilant' : 'Scrollable table';
    wrapTables(tree, label);
  };
}

/**
 * Replace each `table` element in `node`'s subtree with a scroll wrapper.
 *
 * @param {any} node HAST node whose children are scanned.
 * @param {string} label Accessible name for the scroll region.
 * @returns {void}
 */
function wrapTables(node, label) {
  if (!Array.isArray(node.children)) return;
  node.children = node.children.map((/** @type {any} */ child) => {
    if (child.type === 'element' && child.tagName === 'table') {
      return {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-scroll'], role: 'region', ariaLabel: label, tabIndex: 0 },
        children: [child],
      };
    }
    wrapTables(child, label);
    return child;
  });
}
