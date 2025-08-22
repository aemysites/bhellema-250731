/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid container that holds the column content
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid: should be 2 -> left content, right image
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Header row for Columns block
  const headerRow = ['Columns (columns27)'];

  // Content row: left is all content container, right is image
  // Use the actual elements, do not clone or create new ones
  const leftCol = columns[0];
  const rightCol = columns[1];

  const contentRow = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
