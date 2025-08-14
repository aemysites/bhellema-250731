/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout (2 column block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Find left and right columns
  let leftCol = null;
  let rightCol = null;
  const children = Array.from(grid.children);
  children.forEach((child) => {
    if (child.tagName === 'IMG') {
      rightCol = child.cloneNode(true); // Use image only
    } else {
      leftCol = child.cloneNode(true); // Use ALL content in left column
    }
  });
  if (!leftCol || !rightCol) return;

  // Ensure we capture all text content from the left column
  // (including h1, p, and buttons)

  // Header must match block name exactly
  const headerRow = ['Columns (columns15)'];

  // Table content rows: include full left and right columns
  const tableRows = [headerRow, [leftCol, rightCol]];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the main section with the table for import
  element.replaceWith(table);
}
