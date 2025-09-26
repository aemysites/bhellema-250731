/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the two columns from the grid
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left column: heading
  const leftCol = gridChildren[0];
  // Right column: paragraph and button
  const rightCol = gridChildren[1];

  // Columns block header row (must match exactly)
  const headerRow = ['Columns (columns8)'];
  // Content row: each cell is a reference to the actual DOM element
  const contentRow = [leftCol, rightCol];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
