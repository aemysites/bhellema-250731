/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: text/meta/icons
  const leftCol = columns[0];
  // Right column: image
  const rightCol = columns[1];

  // Block header row: must match exactly
  const headerRow = ['Columns (columns32)'];

  // Second row: left and right columns
  // For Columns blocks, DO NOT add field comments (per rules)
  const row = [leftCol, rightCol];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
