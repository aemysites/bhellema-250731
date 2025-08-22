/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract all text content (tags, description, and title) from card body
  function getCardTextContent(cardBody) {
    const nodes = [];
    // Tag (date and type)
    const tag = cardBody.querySelector('.tag');
    if (tag) {
      nodes.push(tag.cloneNode(true));
    }
    // Title (h3)
    const heading = cardBody.querySelector('h3');
    if (heading) {
      nodes.push(heading.cloneNode(true));
    }
    // Description (p)
    const desc = cardBody.querySelector('p');
    if (desc) {
      nodes.push(desc.cloneNode(true));
    }
    return nodes;
  }

  // Get all card links (each is a card)
  const cardLinks = element.querySelectorAll(':scope > a.card-link');

  const rows = [];
  // Header row (must match block name exactly)
  rows.push(['Cards (cards10)']);

  // Parse each card
  cardLinks.forEach((card) => {
    // Style cell - always blank per spec
    const styleCell = '';

    // Image/Icon cell
    let imageCell = '';
    // Find first img inside card
    const img = card.querySelector('img.card-image');
    if (img) {
      imageCell = img.cloneNode(true);
    }

    // Text content cell
    let textCell = '';
    const cardBody = card.querySelector('.utility-padding-all-1rem');
    if (cardBody) {
      const textContent = getCardTextContent(cardBody);
      // If textContent is empty, keep cell blank
      if (textContent.length > 0) {
        textCell = textContent;
      }
    }

    rows.push([styleCell, imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
