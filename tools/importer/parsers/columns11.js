/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .container that holds the two main columns
  const container = element.querySelector(':scope > .container');
  if (!container) return;

  // The left content is composed of eyebrow, heading, text, author, button
  // The right content is a grid with two images stacked
  const gridBlocks = container.querySelectorAll(':scope > .w-layout-grid');
  if (gridBlocks.length < 2) return;

  // left aggregate: get eyebrow div, h1, and the first grid (text/author/button)
  const leftMeta = container.querySelector(':scope > div > .eyebrow')?.parentElement;
  const leftContent = gridBlocks[0];
  const leftCol = document.createElement('div');
  if (leftMeta) {
    Array.from(leftMeta.children).forEach(child => leftCol.appendChild(child.cloneNode(true)));
  }
  if (leftContent) {
    Array.from(leftContent.children).forEach(child => leftCol.appendChild(child.cloneNode(true)));
  }

  // right: grid of images
  const rightContent = gridBlocks[1];
  const rightCol = document.createElement('div');
  Array.from(rightContent.children).forEach(child => rightCol.appendChild(child.cloneNode(true)));

  // Construct columns block table
  const rows = [
    ['Columns (columns11)'],
    [leftCol, rightCol],
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the <section> element with the block table
  if (table && element.parentNode) {
    element.replaceWith(table);
  }
}
