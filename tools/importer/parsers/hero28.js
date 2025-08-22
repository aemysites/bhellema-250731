/* global WebImporter */
export default function parse(element, { document }) {
  // Get references to image and heading content using the grid structure
  const grid = element.querySelector('.w-layout-grid');
  let imageEl = null;
  let headingContent = [];

  if (grid) {
    const gridChildren = grid.querySelectorAll(':scope > div');
    for (const child of gridChildren) {
      // Find image (must be actual img element)
      const img = child.querySelector('img');
      if (!imageEl && img) {
        imageEl = img;
      }
      // Find heading area: look for h1, include any visible relevant children
      const h1 = child.querySelector('h1');
      if (h1) {
        headingContent.push(h1);
      }
      // If there's a button group or other relevant element (none present here)
      const buttonGroup = child.querySelector('.button-group');
      if (buttonGroup && buttonGroup.childElementCount > 0) {
        headingContent.push(buttonGroup);
      }
    }
  }

  // Table header must exactly match block name
  const headerRow = ['Hero (hero28)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [headingContent.length > 0 ? headingContent : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
