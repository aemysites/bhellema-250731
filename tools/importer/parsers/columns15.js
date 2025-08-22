/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main grid container (columns layout)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Columns block header (critical: use target block name exactly)
  const headerRow = ['Columns (columns15)'];

  // Extract both columns: left content and right image
  let leftCol, rightCol;
  const children = Array.from(grid.children);

  // Find left column (text + buttons) and right column (image)
  if (children.length >= 2) {
    // Left column: find main text and subtext
    const left = children.find(node => node.querySelector('.h1-heading'));
    if (left) {
      // Create a wrapper to gather all main content
      const leftWrapper = document.createElement('div');
      // Heading
      const heading = left.querySelector('.h1-heading');
      if (heading) leftWrapper.appendChild(heading.cloneNode(true));
      // Subheading
      const subheading = left.querySelector('.subheading');
      if (subheading) leftWrapper.appendChild(subheading.cloneNode(true));
      // Buttons
      const buttons = left.querySelector('.button-group');
      if (buttons) leftWrapper.appendChild(buttons.cloneNode(true));
      leftCol = leftWrapper;
    } else {
      leftCol = children[0];
    }
    // Right column: find main image
    const right = children.find(node => node.tagName === 'IMG' || node.querySelector('img'));
    let image;
    if (right) {
      image = right.tagName === 'IMG' ? right.cloneNode(true) : right.querySelector('img')?.cloneNode(true);
    }
    if (image) {
      // Wrap image so it doesn't break table cell
      const rightWrapper = document.createElement('div');
      rightWrapper.appendChild(image);
      rightCol = rightWrapper;
    } else {
      rightCol = children[1];
    }
    // Compose content row, ensuring both are not empty
    const contentRow = [leftCol, rightCol];
    // Create the table with the header and content
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      contentRow
    ], document);
    // Replace the original layout with the table block
    element.replaceWith(table);
  }
}
