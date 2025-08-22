/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main containers (the HTML structure is: header > grid > [img-column, content-column])
  const grid = element.querySelector(':scope > .w-layout-grid');
  if (!grid) return;

  // Find background image: it's in the first grid cell, img.cover-image
  let bgImgEl = null;
  const bgDiv = grid.querySelector('.utility-position-relative');
  if (bgDiv) {
    bgImgEl = bgDiv.querySelector('img.cover-image');
  }

  // Find content card: second grid cell, .container > .grid-layout > .card
  let contentBlock = null;
  const contentContainer = grid.querySelector('.container');
  if (contentContainer) {
    const contentGrid = contentContainer.querySelector('.grid-layout');
    if (contentGrid) {
      const card = contentGrid.querySelector('.card');
      if (card) {
        contentBlock = card;
      }
    }
  }

  // Defensive: if there is no content at all, don't create block
  if (!bgImgEl && !contentBlock) return;

  // Block header as required
  const headerRow = ['Hero (hero6)'];
  // Use the actual image DOM node (not a string)
  const imageRow = [bgImgEl || ''];
  // Use the actual card DOM node (not a string)
  const contentRow = [contentBlock || ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
