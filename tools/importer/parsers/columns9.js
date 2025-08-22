/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid layout containing columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get immediate children of the grid - each should be a column
  // Note: some footers may have 3 columns, some 4; handle all
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Table header row as specified
  const headerRow = ['Columns (columns9)'];

  // Compose the second row: each column cell
  // We want to reference the entire column content for resiliency.
  const contentRow = columns.map(col => col);

  // Build table data array
  const cells = [headerRow, contentRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.parentNode.replaceChild(block, element);
}
