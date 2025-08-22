/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid element with two main children
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = grid.querySelectorAll(':scope > div');
  if (gridChildren.length < 2) return;

  // LEFT COLUMN: Main text and buttons
  const leftCol = gridChildren[0];
  // Create a new div to preserve structure and semantic content
  const leftDiv = document.createElement('div');
  // Heading
  const h1 = leftCol.querySelector('h1');
  if (h1) leftDiv.appendChild(h1);
  // Subheading/Paragraph
  const p = leftCol.querySelector('p');
  if (p) leftDiv.appendChild(p);
  // Button group
  const btnGrp = leftCol.querySelector('.button-group');
  if (btnGrp) {
    // Copy all buttons
    btnGrp.querySelectorAll('a').forEach(a => leftDiv.appendChild(a));
  }

  // RIGHT COLUMNS: 3 images in their own columns
  const rightCol = gridChildren[1];
  // Find images
  let imagesGrid = rightCol.querySelector('.grid-layout');
  if (!imagesGrid) imagesGrid = rightCol;
  const imageEls = Array.from(imagesGrid.querySelectorAll('img'));

  // Each image gets its own cell (reference the existing image elements)
  const columns = [leftDiv, ...imageEls];

  // Create the Columns (columns36) table block
  const headerRow = ['Columns (columns36)'];
  const contentRow = columns;
  const table = WebImporter.DOMUtils.createTable(
    [headerRow, contentRow],
    document
  );

  element.replaceWith(table);
}
