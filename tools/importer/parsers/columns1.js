/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container which represents the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of grid (two columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const col1 = columns[0]; // <img>
  // Second column: text content and buttons
  const col2 = columns[1];

  // Prepare table rows
  // Table header MUST match block name exactly!
  const headerRow = ['Columns (columns1)'];
  // Second row: both columns as elements, referenced directly
  const contentRow = [col1, col2];

  // Create table with correct structure
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace original element with table block
  element.replaceWith(table);
}
