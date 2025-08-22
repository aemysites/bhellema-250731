/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the outer container for the columns
  // It is a header.section.secondary-section
  // The two main columns are the text (with heading, subheading, buttons) and the images grid

  // Find the grid that hosts the two columns
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;
  // Get immediate children of the grid, each is a column
  const gridChildren = Array.from(mainGrid.children);
  if (gridChildren.length < 2) return;

  // First column: text content
  const textCol = gridChildren[0];
  // Second column: images grid
  const imagesCol = gridChildren[1];

  // For robustness, use the whole textCol and imagesCol as cells
  const headerRow = ['Columns (columns36)'];
  const secondRow = [textCol, imagesCol];
  const cells = [headerRow, secondRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
