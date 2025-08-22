/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid layout inside the element
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (these are columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // The header row must be exactly as specified
  const headerRow = ['Columns (columns35)'];

  // For each column, gather its content
  const columnCells = columns.map((col) => {
    // If this column contains only a button, include just the button
    const btn = col.querySelector('a.button, .w-button');
    if (btn && col.children.length === 1) return btn;
    // Otherwise, include all children as an array
    return Array.from(col.childNodes);
  });

  // Construct the table data
  const cells = [
    headerRow,
    columnCells,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the block
  element.replaceWith(block);
}
