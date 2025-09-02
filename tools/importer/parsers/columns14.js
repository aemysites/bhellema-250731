/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container (holds the columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Compose header and content rows for the Columns block
  const headerRow = ['Columns (columns14)'];
  const contentRow = columns.map((col) => col);

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
