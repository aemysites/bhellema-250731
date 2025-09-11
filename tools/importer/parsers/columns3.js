/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the column grid
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the direct children of the grid (these are the two columns)
  const columns = Array.from(grid.children);

  // Prepare the table rows
  const headerRow = ['Columns (columns3)']; // Per spec, exact header
  const contentRow = columns.map((col) => col); // Reference, do not clone

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original section with the table
  element.replaceWith(table);
}
