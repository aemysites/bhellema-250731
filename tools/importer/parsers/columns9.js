/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns grid
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Each immediate child of grid is a column (4 columns: logo+socials, Trends, Inspire, Explore)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Columns block table header as required
  const headerRow = ['Columns (columns9)'];

  // The columns block expects each cell as the real DOM element (not clones)
  const cells = columns.map(col => col);

  // Build table with proper structure
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cells
  ], document);

  // Replace the element with the table
  element.replaceWith(table);
}
