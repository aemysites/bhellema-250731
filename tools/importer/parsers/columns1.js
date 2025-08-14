/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Expect two columns: image and content
  // Left: image
  // Right: heading, subheading, buttons

  const leftCol = children[0];
  const rightCol = children[1];

  // Create the header row with required block name
  const headerRow = ['Columns (columns1)'];

  // Create the second row with column contents
  // Use references (not clones) to preserve formatting, structure, and image
  const bodyRow = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([headerRow, bodyRow], document);

  // Replace the entire input element with the table
  element.replaceWith(table);
}