/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the .grid-layout inside the element
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the columns (immediate children of grid)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Build the header and content rows according to spec
  const headerRow = ['Columns block (columns31)'];
  const contentRow = columns.map((col) => col);

  // Create the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace or insert into the DOM
  element.replaceWith(table);
}