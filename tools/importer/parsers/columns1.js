/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the columns: image and content
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imgCol = columns[0].closest('img') ? columns[0] : columns[0].querySelector('img');
  // Second column: content (h1, p, buttons)
  const contentCol = columns[1];

  // Table header row as required
  const headerRow = ['Columns (columns1)'];
  // Data row: one cell for image, one for content
  const cellsRow = [imgCol, contentCol];

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cellsRow,
  ], document);

  element.replaceWith(table);
}
