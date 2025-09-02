/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid containing the two column areas
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const columnEls = Array.from(grid.children);

  // Defensive: expect two columns
  if (columnEls.length < 2) return;

  // Always reference original DOM nodes for semantic fidelity
  const leftCol = columnEls[0];
  const rightCol = columnEls[1];

  // Create the table: header row and one row with two columns
  const headerRow = ['Columns (columns3)'];
  const contentRow = [leftCol, rightCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
