/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the card structure as in the sample HTML
  const card = element.querySelector('.card');
  if (!card) return;
  const cardBody = card.querySelector('.card-body');
  if (!cardBody) return;

  // Find the image (mandatory)
  const image = cardBody.querySelector('img');
  // Find the heading (optional)
  const heading = cardBody.querySelector('.h4-heading, h4, h3, h2, h1');

  // Build the slide row
  const imageCell = image ? image : '';

  let textCell;
  if (heading) {
    // Wrap heading in a div to ensure proper structure
    const div = document.createElement('div');
    div.appendChild(heading);
    textCell = div;
  } else {
    textCell = '';
  }

  // Table header (must use required block name)
  const headerRow = ['Carousel (carousel21)'];
  // Only one slide (row) in this block
  const slideRow = [imageCell, textCell];

  const cells = [headerRow, slideRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
