/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid row with two columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get all immediate children of the grid
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: the heading (h2)
  const col1 = gridChildren[0];
  // Second column: the div with paragraph and button
  const col2 = gridChildren[1];

  // Build the table rows
  const headerRow = ['Columns (columns14)'];
  const contentRow = [col1, col2];

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
