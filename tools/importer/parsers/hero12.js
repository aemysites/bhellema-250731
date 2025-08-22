/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row: must match target block name exactly
  const headerRow = ['Hero (hero12)'];

  // Find grid layout root
  const grid = element.querySelector('.grid-layout.desktop-1-column');
  if (!grid) return;
  const gridDivs = grid.querySelectorAll(':scope > div');

  // --- Background Image Row ---
  let bgImageElem = null;
  if (gridDivs.length > 0) {
    bgImageElem = gridDivs[0].querySelector('img');
  }
  if (!bgImageElem) {
    bgImageElem = element.querySelector('img');
  }

  // --- Content Row ---
  let contentElem = gridDivs.length > 1 ? gridDivs[1] : null;
  let cardGrid = contentElem ? contentElem.querySelector('.card-body .grid-layout') : null;
  if (!cardGrid && contentElem) cardGrid = contentElem.querySelector('.card-body') || contentElem;

  // The grid contains text (headings, list, button) and one image
  let title = '', bulletItems = [], cta = null, squareImg = null;

  if (cardGrid) {
    // Try to get title
    const h2 = cardGrid.querySelector('h2');
    if (h2) title = h2;

    // Try to get bullet list (all p inside .flex-horizontal)
    const bullets = Array.from(cardGrid.querySelectorAll('.flex-horizontal p'));
    bulletItems = bullets;

    // Try to get CTA button
    const button = cardGrid.querySelector('a.button');
    if (button) cta = button;

    // Try to get square image (img.cover-image.utility-aspect-1x1)
    squareImg = cardGrid.querySelector('img.cover-image.utility-aspect-1x1');
  }

  // Compose content cell: create a DOM fragment with all pieces
  const frag = document.createElement('div');
  if (title) frag.appendChild(title.cloneNode(true));
  bulletItems.forEach(b => frag.appendChild(b.cloneNode(true)));
  if (cta) frag.appendChild(cta.cloneNode(true));
  if (squareImg) frag.appendChild(squareImg.cloneNode(true));

  // --- Table Assembly ---
  // Each table row is a single cell
  const cells = [
    headerRow,
    [bgImageElem],
    [frag]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
