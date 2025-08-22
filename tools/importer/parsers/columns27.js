/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Get the grid-layout container (direct child in this structure)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid; expect two: content and image
  const columns = Array.from(grid.children);
  if (columns.length < 2) return; // Must have at least two columns

  // First column content (text + button)
  const leftCol = columns[0];

  // Second column content (image)
  const rightCol = columns[1];

  // Table header
  const headerRow = ['Columns (columns27)'];
  // Table content row: left and right columns
  const contentRow = [leftCol, rightCol];

  // Create block table
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the block
  element.replaceWith(block);
}
