/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards19) block: 2 columns, multiple rows, each row = card
  // Model fields: card.image, card.imageAlt (collapsed), card.text (collapsed)

  // Helper to create a cell with field hint and content
  function cellWithHint(field, content) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${field} `));
    frag.appendChild(content);
    return frag;
  }

  // Find all card elements (direct children)
  const cardEls = Array.from(element.children);

  // Table header
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  cardEls.forEach((cardEl) => {
    // Icon (SVG image)
    let iconImg = null;
    // Find the first img inside .icon
    const iconDiv = cardEl.querySelector('.icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }
    // Text content (paragraph)
    let textEl = cardEl.querySelector('p');

    // First cell: icon image (card.image)
    let iconCell = '';
    if (iconImg) {
      iconCell = cellWithHint('image', iconImg);
    }
    // Second cell: text content (card.text)
    let textCell = '';
    if (textEl) {
      textCell = cellWithHint('text', textEl);
    }
    rows.push([iconCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
