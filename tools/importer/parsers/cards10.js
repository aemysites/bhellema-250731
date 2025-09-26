/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards10) block: 2 columns, multiple rows, header row is block name
  // Model fields: image (reference), imageAlt (collapsed), text (richtext), classes (skip)

  // Helper to create a cell with field comment and content
  function fieldCell(fieldName, content) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${fieldName} `));
    if (content) frag.appendChild(content);
    return frag;
  }

  // Get all card links (each card is an anchor)
  const cards = Array.from(element.querySelectorAll('a.card-link'));

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards10)']);

  cards.forEach(card => {
    // Image cell (first column)
    let imgCell = '';
    const img = card.querySelector('img');
    if (img) {
      // Use the existing <img> element directly
      imgCell = fieldCell('image', img);
    }

    // Text cell (second column)
    let textCell = '';
    // Find the tag, heading, and paragraph inside the card
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    if (textContainer) {
      // We'll use the entire text container as richtext
      textCell = fieldCell('text', textContainer);
    }

    rows.push([imgCell, textCell]);
  });

  // Create and replace block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
