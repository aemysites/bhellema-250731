/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the multi-column grid container (should be the direct child of the element)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children (columns)
  const columnEls = Array.from(grid.children);
  if (columnEls.length === 0) return;

  // Build the header row as required
  const headerRow = ['Columns block (columns31)'];

  // Second row: each column's content in its own cell
  // For robustness, use the column element itself (as it may contain complex markup)
  const columnsRow = columnEls.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
