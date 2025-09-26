/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a fragment with a field comment and content
  function fieldFragment(field, content) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${field} `));
    frag.appendChild(content);
    return frag;
  }

  // Get all direct children of the grid container
  const cards = Array.from(element.children);

  // Prepare the table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards26)']);

  // For each card, extract image and text content
  cards.forEach((card) => {
    // Find the image (if any)
    const img = card.querySelector('img');
    let imageCell = '';
    if (img) {
      // Use the image element directly (with alt/title handled by model)
      imageCell = fieldFragment('image', img);
    }

    // Find the text content (if any)
    // Look for a heading and paragraph inside a padding container
    let textCell = '';
    const textContainer = card.querySelector('.utility-padding-all-2rem');
    if (textContainer) {
      // Use the entire text container (includes heading and paragraph)
      textCell = fieldFragment('text', textContainer);
    }

    // If both cells are empty, leave both empty
    rows.push([imageCell, textCell]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
