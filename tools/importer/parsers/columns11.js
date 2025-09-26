/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block: two rows, two columns
  // Header row
  const headerRow = ['Columns (columns11)'];

  // Get main grid (first grid-layout)
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  const gridChildren = mainGrid ? Array.from(mainGrid.children) : [];

  // Left column: eyebrow + headline
  let leftColFrag = document.createDocumentFragment();
  if (gridChildren[0]) {
    leftColFrag.appendChild(gridChildren[0]);
  }

  // Right column: description + author + button
  let rightColFrag = document.createDocumentFragment();
  if (gridChildren[1]) {
    rightColFrag.appendChild(gridChildren[1]);
  }

  // Get images from second grid (bottom images)
  const imagesGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');
  const imageDivs = imagesGrid ? Array.from(imagesGrid.children) : [];
  // Defensive: get img elements from each div
  const img1 = imageDivs[0] ? imageDivs[0].querySelector('img') : null;
  const img2 = imageDivs[1] ? imageDivs[1].querySelector('img') : null;

  // Build table rows
  const row1 = [leftColFrag, rightColFrag];
  const row2 = [img1, img2];

  // Build table
  const cells = [headerRow, row1, row2];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(block);
}
