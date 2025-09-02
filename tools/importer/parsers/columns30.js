/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid containing the columns
  const grid = element.querySelector('.grid-layout') || element.querySelector('[class*="grid"]');
  if (!grid) return;

  // The columns (children of the grid)
  const columns = Array.from(grid.children);

  // We'll construct the columns row for the table
  const cellsRow = [];

  // COLUMN 1: Name (left)
  if (columns[0]) {
    // Use the existing element directly
    cellsRow.push(columns[0]);
  } else {
    cellsRow.push('');
  }

  // COLUMN 2: Tags (middle)
  if (columns[1]) {
    cellsRow.push(columns[1]);
  } else {
    cellsRow.push('');
  }

  // COLUMN 3: Heading + rich text (right)
  if (columns[2]) {
    // We'll build a fragment containing the heading and the rich-text div
    const fragment = document.createDocumentFragment();
    // Try to find the heading and rich text DIV within this column
    const heading = columns[2].querySelector('h2') || element.querySelector('h2');
    const rich = columns[2].querySelector('.rich-text') || element.querySelector('.rich-text');
    if (heading) fragment.appendChild(heading);
    if (rich) fragment.appendChild(rich);
    cellsRow.push(fragment);
  } else {
    cellsRow.push('');
  }

  // The block table: header row then cells row
  const headerRow = ['Columns (columns30)'];
  const tableCells = [headerRow, cellsRow];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
