/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the card element, which contains the relevant content
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Find image and its alt
  const img = cardBody.querySelector('img');

  // Find heading
  const heading = cardBody.querySelector('.h4-heading');

  // Prepare first row: block header
  const headerRow = ['Carousel (carousel21)'];

  // Prepare slide row: image (first cell), text content (second cell)
  // Field hints per model: media_image, content_text
  // --- Image cell
  let imageCell = document.createElement('div');
  if (img) {
    // Insert field hint for image only if present
    imageCell.innerHTML = '<!-- field:media_image -->';
    imageCell.appendChild(img);
  }

  // --- Text cell
  let textCell;
  if (heading && heading.textContent.trim().length) {
    textCell = document.createElement('div');
    textCell.innerHTML = '<!-- field:content_text -->';
    // Use heading as text content
    textCell.appendChild(heading);
  } else {
    // No heading, so empty cell (no hint)
    textCell = document.createElement('div');
  }

  const rows = [
    headerRow,
    [imageCell, textCell]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(table);
}
