/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Get all card links (each card is inside an <a> tag)
  const cardLinks = element.querySelectorAll(':scope > a');

  cardLinks.forEach((card) => {
    // Find card image (mandatory)
    const img = card.querySelector('img');

    // Find card text block (the second child in the inner grid)
    const innerGrid = card.querySelector(':scope > div');
    let cardTextBlock = null;
    if (innerGrid) {
      // The text block is the second child, after the img
      // Usually innerGrid contains [img, textBlock] or [img, textBlock/overlay]
      const children = innerGrid.children;
      // Look for the first element that is not the image
      for (let i = 0; i < children.length; i++) {
        if (children[i] !== img) {
          cardTextBlock = children[i];
          break;
        }
      }
    }
    // Defensive: fallback if above doesn't work
    if (!cardTextBlock) {
      cardTextBlock = card;
    }

    // Compose the row: [image, text block]
    rows.push([img, cardTextBlock]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new block
  element.replaceWith(block);
}
