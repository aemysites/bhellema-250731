/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the main grid element containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // 2. The columns: first div for text, second for image
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  const leftCol = columns[0];
  const rightCol = columns[1];

  // 3. Build the table structure
  const headerRow = ['Columns (columns27)'];
  const dataRow = [leftCol, rightCol];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    dataRow,
  ], document);

  // 4. Replace the original section with the table
  element.replaceWith(table);
}