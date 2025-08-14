/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;
  // Header row as required
  const headerRow = ['Columns (columns36)'];

  // Find main grid containing the columns
  // The first main grid is the overall wrapper
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  if (!mainGrid) return;

  // The left column: text content
  const leftCol = mainGrid.children[0];

  // - Headline (h1)
  // - Subheading (p)
  // - Buttons (div)
  const leftContent = [];
  const h1 = leftCol.querySelector('h1');
  if (h1) leftContent.push(h1);
  const p = leftCol.querySelector('p');
  if (p) leftContent.push(p);
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // The right column: grid of images
  const rightCol = mainGrid.children[1];
  // The images are inside a nested grid
  const imageGrid = rightCol.querySelector('.grid-layout.mobile-portrait-1-column');
  let images = [];
  if (imageGrid) {
    images = Array.from(imageGrid.querySelectorAll('img'));
  }
  // Defensive: only use images if present
  // Exclude blurred face image
  // For this task, per instructions, do not include the first image (blurred face)
  if (images.length > 1) {
    images = images.slice(1);
  }

  // Build the table with two columns
  const cells = [
    headerRow,
    [leftContent, images]
  ];

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}