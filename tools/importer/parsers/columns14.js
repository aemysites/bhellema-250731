/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process if element exists
  if (!element) return;

  // Header row as required by guidelines
  const headerRow = ['Columns (columns14)'];

  // Find the main grid layout (holds the columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid layout for columns
  const columns = Array.from(grid.children);

  // Defensive: Look for at least two columns
  if (columns.length < 2) return;

  // First column (left): typically the heading
  const col1 = columns[0]; // likely the <h2> element

  // Second column (right): content, may include <p>, <a>, etc
  const col2 = columns[1];

  // Row representing columns; each cell is an entire column element
  const columnsRow = [col1, col2];

  // Construct the table array
  const tableArray = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableArray, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
