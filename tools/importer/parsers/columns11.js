/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the top split: main grid with two primary columns
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!mainGrid) return;

  // -- LEFT COLUMN --
  // Contains: eyebrow, main heading, description, author, "Read more" button
  const leftColFragment = document.createDocumentFragment();

  // Eyebrow
  const eyebrow = mainGrid.querySelector('.eyebrow');
  if (eyebrow) leftColFragment.appendChild(eyebrow.cloneNode(true));

  // Main heading
  const heading = mainGrid.querySelector('h1');
  if (heading) leftColFragment.appendChild(heading.cloneNode(true));

  // Description
  const desc = mainGrid.querySelector('.rich-text');
  if (desc) leftColFragment.appendChild(desc.cloneNode(true));

  // Author info is inside a nested .w-layout-grid
  const authorGrid = mainGrid.querySelector('.w-layout-grid.grid-layout');
  if (authorGrid) {
    // Avatar and author name/date/read-min
    const avatarRow = authorGrid.querySelector('.flex-horizontal.y-center');
    if (avatarRow) leftColFragment.appendChild(avatarRow.cloneNode(true));
    // Read more button
    const readMore = authorGrid.querySelector('a.button');
    if (readMore) leftColFragment.appendChild(readMore.cloneNode(true));
  }

  // -- RIGHT COLUMN --
  // Contains the two images in a grid
  const rightGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  const rightColFragment = document.createDocumentFragment();
  if (rightGrid) {
    // Append both images, preserving their order
    const imgs = rightGrid.querySelectorAll('img');
    imgs.forEach(img => rightColFragment.appendChild(img.cloneNode(true)));
  }

  // Build table rows
  const headerRow = ['Columns (columns11)'];
  const row = [leftColFragment, rightColFragment];
  const table = WebImporter.DOMUtils.createTable([headerRow, row], document);

  element.replaceWith(table);
}
