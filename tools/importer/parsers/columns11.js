/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid containing the two main visual sides of the block
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  const imageGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');

  // Left column: headline, eyebrow, description, author, button
  let leftCol = document.createElement('div');
  if (mainGrid) {
    // Eyebrow + Headline
    const left = mainGrid.children[0];
    if (left) {
      Array.from(left.childNodes).forEach((node) => {
        leftCol.appendChild(node.cloneNode(true));
      });
    }
    // Paragraph, author, button
    const right = mainGrid.children[1];
    if (right) {
      // Description text
      const richText = right.querySelector('.rich-text');
      if (richText) {
        Array.from(richText.childNodes).forEach((node) => {
          leftCol.appendChild(node.cloneNode(true));
        });
      }
      // Author info
      const author = right.querySelector('.flex-horizontal.y-center.flex-gap-xs');
      if (author) {
        leftCol.appendChild(author.cloneNode(true));
      }
      // Button
      const button = right.querySelector('.button');
      if (button) {
        leftCol.appendChild(button.cloneNode(true));
      }
    }
  }

  // Right column: image grid
  let rightCol = document.createElement('div');
  if (imageGrid) {
    Array.from(imageGrid.children).forEach((imgCell) => {
      // utility-aspect-1x1 > img
      rightCol.appendChild(imgCell.cloneNode(true));
    });
  }

  // Build columns block table
  const rows = [];
  rows.push(['Columns (columns11)']);
  rows.push([leftCol, rightCol]);
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
