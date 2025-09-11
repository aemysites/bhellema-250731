/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to add a field comment before element if not already present
  function withFieldComment(fieldName, content) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${fieldName} `));
    if (Array.isArray(content)) {
      content.forEach((el) => frag.appendChild(el));
    } else {
      frag.appendChild(content);
    }
    return frag;
  }

  // Helper to compose a cell with optional content and field comment
  function cell(field, content) {
    if (!content || (Array.isArray(content) && content.length === 0)) {
      return document.createElement('div'); // empty cell
    }
    return withFieldComment(field, content);
  }

  // Get the main grid container (card grid)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Rows will be [ header, ...cards ]
  const rows = [];
  // Add header row
  rows.push(['Cards (cards2)']);

  // Get all 3 card areas
  const cardEls = [];
  // First card: big card (left), is a link block
  const firstCard = grid.children[0];
  if (firstCard && firstCard.matches('a.utility-link-content-block')) {
    cardEls.push(firstCard);
  }
  // Second area: two grid cards (images+text, right top)
  // These are inside a flex container
  const gridFlex = grid.children[1];
  if (gridFlex) {
    // Only direct a.utility-link-content-block children are cards
    const flexCards = Array.from(gridFlex.querySelectorAll(':scope > a.utility-link-content-block'));
    flexCards.forEach((c) => cardEls.push(c));
  }
  // Third area: text-only cards with dividers (right bottom)
  const textFlex = grid.children[2];
  if (textFlex) {
    const flexTextCards = Array.from(textFlex.querySelectorAll(':scope > a.utility-link-content-block'));
    flexTextCards.forEach((c) => cardEls.push(c));
  }

  // Parse each card element into a [image, text] cell row
  cardEls.forEach((card) => {
    // IMAGE CELL
    let imageCell = null;
    // Prefer .utility-aspect-1x1 or .utility-aspect-3x2 containers with img inside
    let imgDiv = card.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
    let img = imgDiv && imgDiv.querySelector('img');
    if (img) {
      // Put the parent div (aspect ratio wrapper) as the cell content
      imageCell = cell('image', imgDiv);
    } else {
      // Text-only: empty cell
      imageCell = document.createElement('div');
    }

    // TEXT CELL
    // Compose text content: tag (optional), heading, paragraph
    const textParts = [];
    // Tag
    const tag = card.querySelector('.tag-group');
    if (tag) {
      textParts.push(tag.cloneNode(true));
    }
    // Heading (h3/h4)
    const heading = card.querySelector('h3');
    if (heading) {
      textParts.push(heading.cloneNode(true));
    }
    // Description
    const desc = card.querySelector('p');
    if (desc) {
      textParts.push(desc.cloneNode(true));
    }
    // Only add text cell if we have content
    let textCell;
    if (textParts.length) {
      textCell = cell('text', textParts);
    } else {
      textCell = document.createElement('div');
    }

    rows.push([imageCell, textCell]);
  });

  // Build the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
