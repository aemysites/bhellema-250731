/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the two columns
  const grid = element.querySelector('.grid-layout, .w-layout-grid');
  if (!grid) return;

  // Get column elements (should be exactly 2)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // The first column: text content block
  const leftCol = columns[0];
  // The second column: image (referenced directly)
  const rightCol = columns[1];

  // Set the block header as required: block name ONLY
  const headerRow = ['Columns (columns27)'];

  // The second row: each column cell contains referenced content, not cloned
  const contentRow = [leftCol, rightCol];

  // Create the columns table (no Section Metadata table required)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the section with the table
  element.replaceWith(table);
}
