/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns28)'];

  // Find the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two: text column and image column)
  const columns = Array.from(grid.children);

  // Defensive: find the text column (the one with headings and button)
  let textCol = columns.find(col => col.querySelector('h2, .h1-heading'));
  // Defensive: find the image column (the one with an <img>)
  let imgCol = columns.find(col => col.tagName === 'IMG' || col.querySelector('img'));

  // If image is direct child, use it; otherwise, find in child
  let imageEl = imgCol && imgCol.tagName === 'IMG' ? imgCol : imgCol && imgCol.querySelector('img');

  // Compose the left column content (all text, including eyebrow, heading, paragraphs, button)
  let leftContent = [];
  if (textCol) {
    // Get all children in order
    leftContent = Array.from(textCol.children);
  }

  // Compose the right column content (just the image)
  let rightContent = [];
  if (imageEl) {
    rightContent = [imageEl];
  }

  // Build the cells for the block table
  const cells = [
    headerRow,
    [leftContent, rightContent]
  ];

  // Create the block table and replace the element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
