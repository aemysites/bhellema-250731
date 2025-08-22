/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all grid columns
  const columns = Array.from(grid.children);
  if (columns.length < 3) return;

  // Block header row: MUST match block name
  const headerRow = ['Columns (columns30)'];
  // Content row, reference each existing column element
  const contentRow = columns.map((col) => col);

  // Create the block table (no markdown or string literals)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the section with the block
  element.replaceWith(table);
}
