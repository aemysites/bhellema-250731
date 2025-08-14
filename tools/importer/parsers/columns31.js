/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container corresponding to the columns block
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Gather all direct column children
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Block header row must match exactly as specified
  const headerRow = ['Columns block (columns31)'];

  // Prepare the second row: each cell is the reference to the full column element
  const contentRow = columns.map(col => col);

  // Assemble the table rows
  const rows = [
    headerRow,
    contentRow,
  ];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the root element
  element.replaceWith(table);
}
