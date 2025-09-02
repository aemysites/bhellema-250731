/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return; // Defensive: only proceed if grid exists

  // Get immediate children inside the grid: should be [img, contentDiv]
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Table header row
  const headerRow = ['Columns block (columns32)'];

  // Table second row: each cell is a column
  const row = [columns[0], columns[1]];

  // Create block table
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    row,
  ], document);

  // Replace original element
  element.replaceWith(block);
}
