/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the two 'columns'
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // There are two main left/right columns in the grid
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left column contains headings and intro
  const leftCol = gridChildren[0];
  // Find the ul (contact list) and img (image) in grid
  let contactList = null;
  let image = null;
  for (const child of gridChildren) {
    if (!contactList && child.tagName === 'UL') contactList = child;
    if (!image && child.tagName === 'IMG') image = child;
  }

  // Defensive fallback for image
  if (!image) image = element.querySelector('img');

  // --- Left column cell: headings and intro paragraph (preserve structure) ---
  const leftCell = document.createElement('div');
  Array.from(leftCol.children).forEach((node) => {
    if (['H2', 'H3', 'P'].includes(node.tagName)) {
      leftCell.appendChild(node);
    }
  });

  // --- Right column cell: contact list then image ---
  const rightCell = document.createElement('div');
  if (contactList) rightCell.appendChild(contactList);
  if (image) rightCell.appendChild(image);

  // Construct table per block guidelines
  const header = ['Columns (columns18)'];
  const row = [leftCell, rightCell];
  const table = WebImporter.DOMUtils.createTable([
    header,
    row
  ], document);

  element.replaceWith(table);
}
