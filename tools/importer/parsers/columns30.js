/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Find grid immediate children (columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Block header row (must match block name exactly)
  const headerRow = ['Columns (columns30)'];

  // Each column is a cell, preserve original DOM elements
  const row = columns.map((col) => col);

  // Assemble the table with block header and one content row
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row,
  ], document);

  // Replace the section with the constructed table
  element.replaceWith(table);
}
