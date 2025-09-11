/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the direct grid layout container inside the section
  const section = element;
  const container = section.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // Two top-level columns: left content (heading, subheading), right button
  // Find all immediate children of the grid
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left: heading + subheading
  const leftCol = gridChildren[0];
  // Right: button/link
  const rightCol = gridChildren[1];

  // Build the cells for the columns block
  const headerRow = ['Columns (columns35)'];
  const columnsRow = [leftCol, rightCol];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original section with the table
  section.replaceWith(table);
}
