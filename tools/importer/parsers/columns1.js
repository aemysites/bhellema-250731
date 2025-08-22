/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container for the columns
  const grid = element.querySelector('.grid-layout') || element.querySelector('[class*="grid"]');
  if (!grid) return;

  // Extract immediate children (columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return; // Require at least two for proper columns

  // Build the header row EXACTLY as required
  const headerRow = ['Columns (columns1)'];

  // Each column's content is referenced directly, preserving all HTML and inline semantics
  const contentRow = columns.map((col) => col);

  // Build the columns table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the generated table
  element.replaceWith(table);
}
