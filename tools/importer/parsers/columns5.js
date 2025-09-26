/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block: two columns, left (content), right (image)
  // Header row
  const headerRow = ['Columns (columns5)'];

  // Find the main grid container (the direct children of the top section)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Defensive: get all immediate children of the grid
  const columns = Array.from(grid.children);

  // Left column: contains heading, paragraph, buttons
  // Right column: contains image
  let leftCol, rightCol;
  // Find the image element (right column)
  const img = element.querySelector('img');
  // The left column is the div that is not the image
  leftCol = columns.find((col) => col !== img);
  rightCol = img;

  // Defensive: if leftCol is a grid, get its first child (the actual content container)
  if (leftCol && leftCol.classList.contains('grid-layout')) {
    leftCol = leftCol.children[0];
  }

  // Build the second row: left (content), right (image)
  const secondRow = [leftCol, rightCol];

  // Build the table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
