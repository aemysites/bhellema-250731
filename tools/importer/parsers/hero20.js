/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Extract all hero collage images (keep DOM nodes, preserve order & attributes)
  const gridRoot = element.querySelector('.ix-hero-scale-3x-to-1x > .grid-layout');
  let images = [];
  if (gridRoot) {
    images = Array.from(gridRoot.querySelectorAll('img.cover-image'));
  }

  // 2. Extract hero content (heading, subheading, CTAs)
  const contentRoot = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  // Defensive: If not found, leave blank
  let heading = '', subheading = '', buttons = '';
  if (contentRoot) {
    const h1 = contentRoot.querySelector('h1');
    if (h1) heading = h1;
    const p = contentRoot.querySelector('p');
    if (p) subheading = p;
    const btnGroup = contentRoot.querySelector('.button-group');
    if (btnGroup) buttons = btnGroup;
  }

  // 3. Build collage cell (images are referenced, not cloned)
  let collageCell = '';
  if (images.length === 1) {
    collageCell = images[0];
  } else if (images.length > 1) {
    const collage = document.createElement('div');
    collage.className = 'hero-collage';
    images.forEach(img => collage.appendChild(img));
    collageCell = collage;
  }

  // 4. Build content cell (heading, subheading, CTAs, preserving semantics)
  let contentCell = '';
  if (heading || subheading || buttons) {
    const contentDiv = document.createElement('div');
    contentDiv.className = 'hero-content';
    if (heading) contentDiv.appendChild(heading);
    if (subheading) contentDiv.appendChild(subheading);
    if (buttons) contentDiv.appendChild(buttons);
    contentCell = contentDiv;
  }

  // 5. Assemble table rows (header row must match block name exactly)
  const headerRow = ['Hero (hero20)'];
  const rows = [
    headerRow,
    [collageCell],
    [contentCell],
  ];

  // 6. Build table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
