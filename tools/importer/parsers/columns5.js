/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get the top-level grid containing both columns
  // We want the two direct children of the grid (left content, right image)
  const grid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!grid) return;

  // Usually two children: content col (div), image col (img)
  const children = Array.from(grid.children);

  // Defensive: Find the main content div and image
  let leftContent = null;
  let rightImage = null;
  for (const child of children) {
    if (child.tagName === 'DIV') {
      leftContent = child;
    } else if (child.tagName === 'IMG') {
      rightImage = child;
    }
  }

  // Defensive: If leftContent contains more than one nested grid (e.g. accidental wrapper)
  if (leftContent && leftContent.querySelector('.section')) {
    // The inner '.section' contains the actual content
    leftContent = leftContent.querySelector('.section');
  }

  // Compose the left column: include the inner content container div if present
  // (containing h2, paragraph, buttons)
  let leftCell = leftContent ? leftContent : '';
  // Compose the right column: just the image element
  let rightCell = rightImage ? rightImage : '';

  // Build the table rows
  const headerRow = ['Columns (columns5)'];
  const contentRow = [leftCell, rightCell];
  const cells = [headerRow, contentRow];

  // Make the table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
