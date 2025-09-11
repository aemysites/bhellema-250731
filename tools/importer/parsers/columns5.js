/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Identify left (content) and right (image) columns
  let leftCol = null;
  let rightCol = null;

  // The left side is a nested grid containing content
  for (const child of grid.children) {
    if (child.classList.contains('w-layout-grid')) {
      leftCol = child;
    }
    if (child.tagName === 'IMG') {
      rightCol = child;
    }
  }

  // Defensive: fallback for missing columns
  if (!leftCol) leftCol = document.createElement('div');
  if (!rightCol) rightCol = document.createElement('div');

  // Build the final rows as per block structure
  const rows = [
    ['Columns (columns5)'],
    [leftCol, rightCol],
  ];
  
  // Create the table using DOMUtils, referencing existing elements
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
