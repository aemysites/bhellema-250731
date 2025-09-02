/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row - must match target block name exactly
  const headerRow = ['Columns (columns35)'];

  // Defensive: locate the grid that contains the columns
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // Extract columns: each direct child of grid is a column
  const columns = Array.from(grid.children);

  // Each cell is the actual DOM element for that column
  const columnsRow = columns.map((col) => col);

  // Only one data row below header
  const rows = [headerRow, columnsRow];

  // Create block table (no field comments for Columns block)
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original section with the table block
  element.replaceWith(table);
}
