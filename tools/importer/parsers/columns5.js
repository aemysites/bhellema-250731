/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Get the grid containing the two main columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Find the two main columns: content div and image
  let contentCol = null;
  let imageCol = null;
  // Our grid-layout contains two children: a div and an img
  const children = Array.from(grid.children);
  for (const child of children) {
    if (child.tagName === 'DIV' && !contentCol) {
      contentCol = child;
    } else if (child.tagName === 'IMG' && !imageCol) {
      imageCol = child;
    }
  }
  if (!contentCol || !imageCol) return;

  // Table header row
  const headerRow = ['Columns (columns5)'];
  // Table content row: first col is the content div, second col is the image
  // Use the entire contentCol (with heading, paragraph, buttons) as is
  const row = [contentCol, imageCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  // Replace original element with the columns block table
  element.replaceWith(table);
}
