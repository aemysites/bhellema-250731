/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid for the columns layout
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image <img>
  const img = columns[0].querySelector('img');
  // Second column: all text and headings
  const textColumn = columns[1];

  if (!img || !textColumn) return;

  // Clone the elements so they remain in the DOM for the table
  const imgClone = img.cloneNode(true);
  const textClone = textColumn.cloneNode(true);

  // Build table: header row has ONE cell, second row has TWO (no empty columns)
  const headerRow = ['Columns block (columns32)'];
  const dataRow = [imgClone, textClone];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    dataRow
  ], document);

  // Replace the grid (the columns root) with the table, so DOM is definitely changed
  grid.replaceWith(table);
}
