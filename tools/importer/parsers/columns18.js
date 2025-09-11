/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const children = Array.from(grid.children);
  if (children.length === 0) return;

  // Main content (left) and others (right)
  const leftCol = children[0];
  // Find <ul> and <img> among the right column children
  let ul = null, img = null;
  for (let i = 1; i < children.length; i++) {
    if (!ul && children[i].tagName === 'UL') ul = children[i];
    if (!img && children[i].tagName === 'IMG') img = children[i];
  }

  // Prepare right column contents (ul above image)
  const rightCol = [];
  if (ul) rightCol.push(ul);
  if (img) rightCol.push(img);

  // Only create block if at least leftCol and (ul or img) exists
  if (!leftCol || rightCol.length === 0) return;

  // Table rows:
  // 1. Header row (must match block name exactly)
  const headerRow = ['Columns (columns18)'];
  // 2. Content row: [left, right]
  const contentRow = [leftCol, rightCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);
  
  element.replaceWith(table);
}
