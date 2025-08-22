/* global WebImporter */
export default function parse(element, { document }) {
  // The header contains a w-layout-grid with two main divs
  const grid = element.querySelector('.w-layout-grid');
  let imgEl = null;
  let headingEl = null;

  if (grid) {
    // First div: background image
    const bgWrapper = grid.children[0];
    if (bgWrapper) {
      imgEl = bgWrapper.querySelector('img'); // reference the existing image element
    }
    // Second div: text
    const textWrapper = grid.children[1];
    if (textWrapper) {
      headingEl = textWrapper.querySelector('h1'); // reference the existing h1 element
    }
  }

  // Block header: must use block name exactly
  const headerRow = ['Hero (hero28)'];
  // Second row: background image (element or empty string)
  const imageRow = [imgEl ? imgEl : ''];
  // Third row: main content (h1 in this case, as in the markdown example)
  const contentRow = [headingEl ? headingEl : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
