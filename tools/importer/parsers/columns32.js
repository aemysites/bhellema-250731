/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container for the two columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get immediate children of the grid (image + right column)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: main image
  const imgCol = gridChildren[0];
  let imageElement = imgCol;
  // Defensive: in case it's not the img itself
  if (!imageElement.tagName || imageElement.tagName.toLowerCase() !== 'img') {
    imageElement = imgCol.querySelector('img');
  }

  // Second column: all the text & tags
  const textCol = gridChildren[1];
  // We can reference the entire column for resilience

  // Table header
  const headerRow = ['Columns block (columns32)'];

  // Second row: two columns, image and text
  const contentRow = [imageElement, textCol];

  // Compose table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original section
  element.parentNode.replaceChild(block, element);
}
