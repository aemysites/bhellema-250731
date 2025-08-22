/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Get the grid container (should be main layout)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all immediate children of the grid (these should be the columns)
  const columns = Array.from(grid.children);

  // Defensive: If no columns found, bail
  if (columns.length === 0) return;

  // For each column, gather all its direct children (preserving elements)
  // In this HTML, each column is already a div, so just reference them directly
  const cellRow = columns.map(col => col);

  // Compose the table
  const headerRow = ['Columns block (columns31)'];
  const tableArray = [headerRow, cellRow];

  // Create and inject the block
  const block = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(block);
}
