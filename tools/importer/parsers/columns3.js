/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children matching selector under parent
  function getImmediateChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }
  
  // Defensive: find grid-layout inside element (should be a grandchild)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (should be the columns)
  const columns = getImmediateChildren(grid, 'div');
  if (!columns.length) return;

  // Prepare the header row with required block name
  const headerRow = ['Columns (columns3)'];

  // Prepare the second row: each column as a cell
  // Reference the entire column content for resilience
  const contentRow = columns.map(col => col);

  // Compose the table cells array
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
