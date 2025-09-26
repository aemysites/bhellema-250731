/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block (columns15) - Columns block, no field hints in cells
  // Get the grid layout container (assume first .grid-layout inside the main container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (each column)
  const columns = Array.from(grid.children);

  // Prepare the header row (block name)
  const headerRow = ['Columns block (columns15)'];

  // Prepare the columns row (one cell per column)
  // For columns block: no field hints, just the content
  const columnsRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
