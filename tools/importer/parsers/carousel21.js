/* global WebImporter */
export default function parse(element, { document }) {
  // Find the slide container
  const cardRotate = element.querySelector('.ix-card-rotate-2');
  if (!cardRotate) return;
  const card = cardRotate.querySelector('.card');
  if (!card) return;
  const cardBody = card.querySelector('.card-body');
  if (!cardBody) return;

  // Extract image (mandatory, first cell)
  const img = cardBody.querySelector('img');
  const imgCell = img ? img : '';

  // Extract heading (optional, goes in second cell)
  const heading = cardBody.querySelector('.h4-heading');
  let textCell = '';
  if (heading) {
    // Preserve heading formatting (use <div> to wrap if needed)
    const div = document.createElement('div');
    div.appendChild(heading);
    textCell = div;
  }

  // Block header row: must match exactly
  const headerRow = ['Carousel (carousel21)'];
  // Slide row: [Image, Optional Text]
  const slideRow = [imgCell, textCell];

  // Compose table rows
  const rows = [headerRow, slideRow];

  // Create carousel block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace element with block table
  element.replaceWith(table);
}
