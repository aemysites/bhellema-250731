/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block: 2 columns, multiple rows
  // Model fields: summary (string), text (richtext)

  // Header row for block type
  const headerRow = ['Accordion'];

  // Find all accordion items: each .divider is one item
  const items = element.querySelectorAll(':scope > .divider');

  // Build rows for each accordion item
  const rows = Array.from(items).map((item) => {
    // Each item contains a grid with two children: title and content
    const grid = item.querySelector('.w-layout-grid');
    if (!grid) return []; // Defensive: skip if missing grid
    const children = grid.children;
    // Defensive: expect at least 2 children
    const titleEl = children[0];
    const contentEl = children[1];

    // Create field hint fragments for each cell
    // summary cell (left)
    const summaryFrag = document.createDocumentFragment();
    summaryFrag.appendChild(document.createComment(' field:summary '));
    if (titleEl) summaryFrag.appendChild(titleEl);
    // text cell (right)
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));
    if (contentEl) textFrag.appendChild(contentEl);

    return [summaryFrag, textFrag];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with block table
  element.replaceWith(blockTable);
}
