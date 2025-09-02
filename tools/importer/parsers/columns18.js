/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (columns block)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the relevant direct children for columns
  // There should be 3: left content, right contact list, image
  const children = Array.from(grid.children);
  if (children.length < 3) return;

  // Left column: heading/content (first block)
  const leftCol = children[0];
  // Right column: contact methods (ul, second block)
  const rightCol = children[1];
  // Image (third block)
  const image = children[2];

  // Table header: must EXACTLY match block name
  const headerRow = ['Columns (columns18)'];

  // Table second row: left and right columns
  // Pass references to original elements
  const columnsRow = [leftCol, rightCol];

  // Third row: image in left cell, right cell empty
  const imageRow = [image, ''];

  // Create the table according to example
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
    imageRow,
  ], document);

  element.replaceWith(table);
}
