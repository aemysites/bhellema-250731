/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that structures the section
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get left column (text and contact info) and right column (image)
  let leftCol = null;
  let rightCol = null;

  const children = Array.from(grid.children);

  // Identify leftCol (contains h2, h3, p) and contact list (ul)
  const introBlock = children.find(child => child.querySelector('h2,h3,p'));
  const contactList = children.find(child => child.tagName === 'UL');
  const imgBlock = children.find(child => child.tagName === 'IMG');

  // Compose left cell by appending intro + contact list
  if (introBlock || contactList) {
    leftCol = document.createElement('div');
    if (introBlock) leftCol.appendChild(introBlock);
    if (contactList) leftCol.appendChild(contactList);
  }

  // Compose right cell (just the image)
  if (imgBlock) {
    rightCol = imgBlock;
  }

  // Prepare table rows
  const headerRow = ['Columns (columns18)'];
  const contentRow = [leftCol || '', rightCol || ''];

  // Build the output table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace element with new table
  element.replaceWith(table);
}
