/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all the direct children of the grid (each is a column)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Header row as per block requirements
  const headerRow = ['Columns (columns9)'];

  // Content row: Each column is a cell
  // (Reference whole column element to preserve inner structure and allow for block resilience)
  const contentRow = columns;

  // Build the table structure
  const tableCells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
