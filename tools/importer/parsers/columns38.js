/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block (columns38) parsing
  // Header row: always block name
  const headerRow = ['Columns block (columns38)'];

  // Defensive selectors for main columns
  // Left column: headline, subheading, buttons
  // Right column: images gallery
  // Get immediate children of the main grid
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column (text)
  const leftCol = columns[0];
  // Right column (images)
  const rightCol = columns[1];

  // Compose left column cell: headline, subheading, buttons
  const leftCellContent = [];
  // Headline
  const headline = leftCol.querySelector('h1');
  if (headline) leftCellContent.push(headline);
  // Subheading
  const subheading = leftCol.querySelector('p');
  if (subheading) leftCellContent.push(subheading);
  // Button group
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // Compose right column cell: images
  // Find the grid containing images
  const imagesGrid = rightCol.querySelector('.grid-layout');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }
  // Defensive: if not found, fallback to any images in rightCol
  if (images.length === 0) {
    images = Array.from(rightCol.querySelectorAll('img'));
  }
  // Place images side by side in the cell
  const rightCellContent = images;

  // Table rows
  const rows = [
    headerRow,
    [leftCellContent, rightCellContent]
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
