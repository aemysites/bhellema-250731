/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children (columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Table header must match block name exactly
  const headerRow = ['Columns (columns35)'];

  // Build the second row: each cell is a reference to the column content
  // Ensure we reference, not clone
  const contentRow = columns.map((col) => col);

  // Compose the table data
  const tableRows = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
