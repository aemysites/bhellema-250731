/* global WebImporter */
export default function parse(element, { document }) {
  // Get the innermost .card-body
  function getFirstChildByClass(parent, className) {
    return Array.from(parent.children).find(child => child.classList.contains(className));
  }

  let cardBody = element;
  cardBody = getFirstChildByClass(cardBody, 'ix-card-rotate-2') || cardBody;
  cardBody = getFirstChildByClass(cardBody, 'card') || cardBody;
  cardBody = getFirstChildByClass(cardBody, 'card-body') || cardBody;

  // Image (mandatory)
  const imgEl = cardBody.querySelector('img.cover-image');
  if (!imgEl) return;

  // Title (optional)
  const titleEl = cardBody.querySelector('.h4-heading');

  // Compose text cell content
  const textCell = [];
  if (titleEl) textCell.push(titleEl);

  // Compose table rows
  const headerRow = ['Carousel (carousel21)'];
  const slideRow = [
    [document.createComment(' field:media_image '), imgEl],
    textCell.length ? [document.createComment(' field:content_text '), ...textCell] : ''
  ];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    slideRow
  ], document);

  element.replaceWith(table);
}
