/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: require .container child (main block)
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the grid that splits left/right
  const grid = container.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get top-level columns (expecting two children)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: headline, subheading, buttons
  const leftCol = columns[0];
  // Second column: image grid (should contain images)
  const rightCol = columns[1];

  // --- Left cell: headline, subheading, buttons ---
  // Grab the headline, subheading, and button-group as nodes
  const h1 = leftCol.querySelector('h1');
  const subheading = leftCol.querySelector('p');
  const buttonGroup = leftCol.querySelector('.button-group');

  // Build left cell content (array for order preservation, filter nulls)
  const leftCellContent = [h1, subheading, buttonGroup].filter(Boolean);

  // --- Right cell: image grid ---
  // Find images in nested grid
  const imageGrid = rightCol.querySelector('.w-layout-grid');
  let images = [];
  if (imageGrid) {
    images = Array.from(imageGrid.querySelectorAll('img'));
  }
  // Defensive fallback: images on rightCol itself
  if (images.length === 0) {
    images = Array.from(rightCol.querySelectorAll('img'));
  }

  // --- Build rows ---
  const headerRow = ['Columns (columns36)'];
  // Each cell: array of elements (left: text/buttons, right: images)
  const contentRow = [leftCellContent, images];

  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace element with the new table block
  element.replaceWith(table);
}
