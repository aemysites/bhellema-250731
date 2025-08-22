/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct child divs of the grid -- these are the columns
  const columns = Array.from(grid.children);

  // Table header
  const headerRow = ['Columns (columns3)'];

  // Second row: each column is a cell, referencing the ENTIRE column content
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
