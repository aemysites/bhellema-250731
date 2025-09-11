/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the correct Cards (cards29) header row
  const headerRow = ['Cards (cards29)'];

  // Each card is a direct child
  const cards = Array.from(element.children);
  const rows = cards.map(card => {
    let imageCell = '';
    // Get first img (should only be one per card)
    const img = card.querySelector('img');
    if (img) {
      // For image collapsing, wrap in <picture> if not already
      const picture = document.createElement('picture');
      picture.appendChild(img.cloneNode(true));
      const cellDiv = document.createElement('div');
      cellDiv.append(document.createComment(' field:image '));
      cellDiv.append(picture);
      imageCell = Array.from(cellDiv.childNodes);
    }
    // No text content in this input example
    return [imageCell, ''];
  });
  // Construct the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  // Replace element
  element.replaceWith(table);
}
