/* global WebImporter */
export default function parse(element, { document }) {
  // Extract background images (all .cover-image in grid)
  let images = Array.from(
    element.querySelectorAll('.ix-hero-scale-3x-to-1x .grid-layout .cover-image')
  );

  // Defensive: fallback in case grid structure changes
  if (!images.length) {
    images = Array.from(element.querySelectorAll('.ix-hero-scale-3x-to-1x img'));
  }

  // Wrapper for all images in the background
  const imageCell = document.createElement('div');
  images.forEach(img => imageCell.appendChild(img));
  if (images.length) {
    imageCell.appendChild(document.createComment(' field:image '));
  }

  // Extract content (headline, subheading, CTA)
  const content = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  const textCell = document.createElement('div');
  if (content) {
    const h1 = content.querySelector('h1');
    if (h1) textCell.appendChild(h1);
    const subheading = content.querySelector('p');
    if (subheading) textCell.appendChild(subheading);
    const buttons = content.querySelector('.button-group');
    if (buttons) textCell.appendChild(buttons);
    textCell.appendChild(document.createComment(' field:text '));
  }

  // Compose table rows
  const rows = [
    ['Hero (hero20)'],
    [imageCell],
    [textCell]
  ];

  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
