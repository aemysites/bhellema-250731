/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container holding the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get immediate children of the grid as columns
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // The block name header row per spec
  const headerRow = ['Columns (columns35)'];

  // Each grid child is a column: use the existing elements for correct references
  const contentRow = columns.map((col) => col);

  // Compose the table
  const cells = [
    headerRow,
    contentRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the section with the new table
  element.replaceWith(table);
}
