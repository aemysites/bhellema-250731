/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Find image (column 1)
  const img = grid.querySelector('img');
  // Find content column (column 2)
  const contentDiv = gridChildren.find(child => child.tagName !== 'IMG');

  // Use DOM references (do not clone)
  const headerRow = ['Columns (columns1)'];
  const contentRow = [img, contentDiv];

  // Create columns block table (no field comments for Columns block)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
