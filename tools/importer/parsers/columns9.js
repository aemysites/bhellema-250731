/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Each column is a direct child of the grid
  const columns = Array.from(grid.children);

  // Columns block: first row is block name, second row has all columns as cells
  const headerRow = ['Columns (columns9)'];
  const contentRow = columns.map(col => col);

  // Create the table with the block name header and columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
