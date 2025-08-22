/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process the intended section
  if (!element || !element.classList.contains('section')) return;

  // Get the main content grid (top half)
  const mainContainer = element.querySelector('.container > .w-layout-grid.grid-layout.tablet-1-column');
  // The left column (headline)
  const headlineCol = mainContainer?.children[0];
  // The right column (description, author, button)
  const contentCol = mainContainer?.children[1];

  // Get the lower grid containing two images (bottom half)
  const imagesGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');

  // Build the first column (left side)
  let leftColContent = [];
  if (headlineCol) {
    // Grab eyebrow and headline
    const eyebrow = headlineCol.querySelector('.eyebrow');
    const headline = headlineCol.querySelector('h1');
    if (eyebrow) leftColContent.push(eyebrow);
    if (headline) leftColContent.push(headline);
  }

  // Build the second column (right side, top)
  let rightColContent = [];
  if (contentCol) {
    // Paragraph, author, and button
    const paragraph = contentCol.querySelector('.rich-text');
    if (paragraph) rightColContent.push(paragraph);

    // Author info
    const authorRow = contentCol.querySelector('.grid-layout > .flex-horizontal');
    if (authorRow) {
      // Only include author text and meta, ignore the avatar image (blurred face)
      const authorName = authorRow.querySelector('.paragraph-sm:not(.utility-text-secondary)');
      const authorMeta = authorRow.querySelectorAll('.utility-text-secondary');
      if (authorName) rightColContent.push(authorName);
      if (authorMeta && authorMeta.length > 0) rightColContent.push(...authorMeta);
    }
    // Button
    const button = contentCol.querySelector('.grid-layout > a.button');
    if (button) rightColContent.push(button);
  }

  // Build lower row with two images
  let imgElems = [];
  if (imagesGrid) {
    const imageContainers = imagesGrid.querySelectorAll('.utility-aspect-1x1');
    imageContainers.forEach(imgDiv => {
      const img = imgDiv.querySelector('img');
      if (img) imgElems.push(img);
    });
  }

  // Table Construction
  const headerRow = ['Columns (columns11)'];
  const contentRow = [leftColContent, rightColContent];
  const imagesRow = imgElems.length === 2 ? imgElems : [imgElems];

  const cells = [headerRow, contentRow, imagesRow];

  // Build block table and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
