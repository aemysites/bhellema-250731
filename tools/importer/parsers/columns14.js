/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of grid (should be columns)
  const columns = Array.from(grid.children);
  // Defensive: at least two columns
  if (columns.length < 2) return;

  // Table header row for Columns block (must match block name exactly)
  const headerRow = ['Columns (columns14)'];

  // Table content row: reference original elements
  // First column is the heading (h2)
  // Second column is the div with paragraph and button
  const row = [columns[0], columns[1]];
  
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
