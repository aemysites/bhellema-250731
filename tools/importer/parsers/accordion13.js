/* global WebImporter */
export default function parse(element, { document }) {
  // Compose Accordion block table
  const rows = [];
  // Block header matches example markdown
  rows.push(['Accordion']);

  // Find all accordion items (each .divider is one)
  const itemDivs = element.querySelectorAll(':scope > .divider');

  itemDivs.forEach(divider => {
    // Each divider contains two children:
    // - Title (h4-heading)
    // - Content (rich-text)
    let titleEl = divider.querySelector('.h4-heading');
    let contentEl = divider.querySelector('.rich-text');

    // Defensive: fallback if not found
    if (!titleEl) {
      const grid = divider.querySelector('.w-layout-grid');
      if (grid && grid.children[0]) titleEl = grid.children[0];
    }
    if (!contentEl) {
      const grid = divider.querySelector('.w-layout-grid');
      if (grid && grid.children[1]) contentEl = grid.children[1];
    }

    // Edge case: skip empty or malformed item
    if (!titleEl || !contentEl) return;

    // Model comments
    const summaryComment = document.createComment(' field:summary ');
    const textComment = document.createComment(' field:text ');

    // Cells: include field comment then referenced element
    const titleCell = [summaryComment, titleEl];
    const contentCell = [textComment, contentEl];

    rows.push([titleCell, contentCell]);
  });

  // Only one block table in the example
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}
