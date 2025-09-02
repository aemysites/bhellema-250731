/* global WebImporter */
export default function parse(element, { document }) {
  const layout = element.querySelector('.grid-layout');
  if (!layout) return;
  const columns = Array.from(layout.children);
  if (columns.length < 2) return;

  // Left column: All content (h1, p, button group)
  const leftCol = columns[0];
  const leftColContent = [];

  // Get all direct children in correct order
  const h1 = leftCol.querySelector('h1');
  if (h1) leftColContent.push(h1.cloneNode(true));

  const p = leftCol.querySelector('p');
  if (p) leftColContent.push(p.cloneNode(true));

  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftColContent.push(buttonGroup.cloneNode(true));

  // Right column: image
  const rightCol = columns[1];
  const img = rightCol.querySelector('img');
  // Only add the right column if there is content
  const row = [leftColContent];
  if (img) row.push(img.cloneNode(true));

  const headerRow = ['Columns (columns15)'];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row,
  ], document);

  element.replaceWith(table);
}
