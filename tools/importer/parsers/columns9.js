/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid inside the footer
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  // Get all immediate column children (div or ul) of the grid
  const columns = Array.from(grid.children);

  // Compose the header
  const headerRow = ['Columns (columns9)'];

  // Second row: each column goes in its own cell
  // Do not clone, use original elements to preserve event handlers/structure
  const contentRow = columns;

  // Assemble table rows: header + content
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table block
  element.replaceWith(table);
}
