/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get each column (direct child of grid)
  const colEls = Array.from(grid.children);
  if (colEls.length === 0) return; // Handle empty columns

  // Columns block: header must match guidelines
  const headerRow = ['Columns block (columns31)'];

  // Each cell references the original grid column (preserves HTML)
  const contentRow = colEls.map((col) => col);

  // Table structure: header then content row
  const table = [headerRow, contentRow];

  // Create table block (do not add field comments for Columns blocks)
  const block = WebImporter.DOMUtils.createTable(table, document);

  // Replace container with block table
  element.replaceWith(block);
}
