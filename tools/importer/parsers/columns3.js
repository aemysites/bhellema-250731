/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block header row as required
  const headerRow = ['Columns block (columns3)'];

  // Find the grid layout (main content container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children of the grid (should be [img, contentDiv])
  const gridChildren = Array.from(grid.children);

  // Defensive: expect two columns (image, content)
  let leftCol = null;
  let rightCol = null;
  if (gridChildren.length >= 2) {
    leftCol = gridChildren[0];
    rightCol = gridChildren[1];
  } else {
    // fallback: treat all children as columns
    [leftCol, rightCol] = gridChildren;
  }

  // The left column is the image
  // The right column is the text content (headline, subheading, buttons)

  // Build the content row with direct references (no cloning)
  const contentRow = [leftCol, rightCol];

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
