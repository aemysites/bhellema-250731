/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name for the header row
  const headerRow = ['Columns (columns4)'];

  // Defensive: find the grid container (columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: expect two columns (left: text, right: buttons)
  // Left column: heading + subheading
  // Right column: button group
  let leftCol, rightCol;
  if (columns.length === 2) {
    leftCol = columns[0];
    rightCol = columns[1];
  } else {
    // fallback: try to find by class
    leftCol = grid.querySelector(':scope > div:not(.button-group)');
    rightCol = grid.querySelector(':scope > .button-group');
  }

  // Defensive: if not found, fallback to first/second
  leftCol = leftCol || columns[0];
  rightCol = rightCol || columns[1];

  // Compose the second row (columns)
  // For columns blocks: DO NOT add field comments
  // Use the entire leftCol and rightCol for resilience
  const cells = [
    headerRow,
    [leftCol, rightCol],
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
