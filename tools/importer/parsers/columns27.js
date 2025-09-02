/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout which contains the columns
  const grid = element.querySelector('.grid-layout, .w-layout-grid');
  if (!grid) return;

  // Extract the direct children, each representing a column
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // The table header row as per spec: Columns (columns27)
  const headerRow = ['Columns (columns27)'];

  // Each column cell should contain the content of the grid's child
  const contentRow = columns.map((col) => col);

  // Compose the block as a table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
