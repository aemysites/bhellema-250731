/* global WebImporter */
export default function parse(element, { document }) {
  // Collect each direct child in the grid as a column
  const columns = Array.from(element.children);

  // Block header row - always use block name per instructions
  const headerRow = ['Columns (columns38)'];

  // Build second row: each cell is the image from each column div
  const cellsRow = columns.map((col) => {
    const img = col.querySelector('img');
    if (img) return img; // Reference original img element
    return document.createTextNode(''); // Defensive: empty cell if no image
  });

  // Create block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cellsRow,
  ], document);

  // Replace the source grid with the block table
  element.replaceWith(table);
}
