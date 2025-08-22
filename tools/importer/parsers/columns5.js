/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout containing the two columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // There are two grid items: left is text/buttons, right is image
  let leftCol, rightCol;
  const gridChildren = Array.from(grid.children);
  // Find left column by heading, right column by image
  gridChildren.forEach(child => {
    if (child.querySelector('h2')) leftCol = child;
    if (child.tagName === 'IMG') rightCol = child;
  });
  if (!leftCol || !rightCol) return;

  // Compose left column: heading, paragraph, buttons
  const leftContent = [];
  const heading = leftCol.querySelector('h2');
  if (heading) leftContent.push(heading);
  const paragraph = leftCol.querySelector('.rich-text, .w-richtext, p');
  if (paragraph) leftContent.push(paragraph);
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // Compose right column: image
  const rightContent = [rightCol];

  // Construct table: header and single row
  const headerRow = ['Columns (columns5)'];
  const tableRows = [headerRow, [leftContent, rightContent]];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
