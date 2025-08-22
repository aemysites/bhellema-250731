/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get immediate children of the grid layout
  const gridChildren = Array.from(grid.children);

  // There should be two columns: first is the h2, second is the content div
  const col1 = gridChildren[0]; // h2 (Fresh looks, bold moves)
  const col2 = gridChildren[1]; // div with paragraph and button

  // Defensive: ensure both columns exist
  if (!col1 || !col2) return;

  // Table header row
  const headerRow = ['Columns (columns14)'];

  // Content row: each cell is one column's content
  // Wrap col2 children in a fragment for one cell
  const col2Content = Array.from(col2.childNodes);

  const contentRow = [col1, col2Content];

  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the block table
  element.replaceWith(block);
}
