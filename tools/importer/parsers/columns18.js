/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check expected structure
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Identify columns
  let leftCol = null;
  let rightCol = null;
  let img = null;

  for (const child of gridChildren) {
    if (child.tagName === 'DIV' && child.querySelector('h2') && child.querySelector('h3')) {
      leftCol = child;
    } else if (child.tagName === 'UL') {
      rightCol = child;
    } else if (child.tagName === 'IMG') {
      img = child;
    }
  }

  // Header row: ONLY one column, per guidelines
  const headerRow = ['Columns (columns18)'];
  // The number of columns is determined by the first content row
  const columnsCount = rightCol ? 2 : 1;

  // All content rows must have the same number of columns as the first content row
  const row1 = columnsCount === 2 ? [leftCol, rightCol] : [leftCol];
  // For the row with the image, only include a cell for the image if there is no rightCol; otherwise, do NOT add an empty cell
  const row2 = columnsCount === 2 ? [img, rightCol ? null : ''] : [img];

  // Only include the second cell in row2 if there is a rightCol, otherwise keep to one column
  const cells = [headerRow, row1];
  // Only push row2 if the image exists
  if(img) cells.push(row2);

  // Clean up any unnecessary empty column in row2
  if (columnsCount === 2 && row2.length === 2 && (row2[1] === '' || row2[1] === null)) {
    // If second cell is empty/null, remove it
    row2.pop();
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
