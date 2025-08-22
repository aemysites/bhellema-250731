/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout representing the columns
  const grid = element.querySelector('.w-layout-grid, .grid-layout');
  if (!grid) return;

  // Get direct children of the grid, which are the columns, as per the source HTML
  const colDivs = Array.from(grid.children);
  if (colDivs.length === 0) return;

  // Build header row as per CRITICAL guideline
  const headerRow = ['Columns (columns3)'];

  // Each column's content must be referenced (not cloned!) and wrapped in an array for correct cell structure
  const columnsRow = colDivs.map((col) => col);

  // Final block table: header row, then one row with each column as a cell
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the constructed table
  element.replaceWith(table);
}
