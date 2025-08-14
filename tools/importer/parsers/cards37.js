/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card element
  function extractCard(cardEl) {
    // Image: first <img> inside card or inside its first child div
    let img = cardEl.querySelector('img');
    if (!img) {
      const imgDiv = cardEl.querySelector('div');
      if (imgDiv) img = imgDiv.querySelector('img');
    }
    // Compose text cell: Include ALL block-level text content (headings, paragraphs, buttons, etc)
    const textCell = document.createElement('div');
    // Get all direct children that are not image wrappers
    Array.from(cardEl.children).forEach(child => {
      // skip divs containing only images
      if (child.querySelector('img')) return;
      // Add all text blocks (headings, paragraphs, buttons/divs/anchors)
      if (child.matches('h2, h3, h4, p, .button, button, a.button')) {
        textCell.appendChild(child.cloneNode(true));
      } else if (child.children.length) {
        // Also look for nested text blocks (e.g. Explore button inside paddings)
        Array.from(child.querySelectorAll('h2, h3, h4, p, .button, button, a.button')).forEach(el => {
          textCell.appendChild(el.cloneNode(true));
        });
      }
    });
    return [img, textCell];
  }

  // Find the main card grid container
  let cardsGrid = null;
  const grids = element.querySelectorAll('.w-layout-grid.grid-layout');
  for (const grid of grids) {
    if (grid.querySelector('.utility-link-content-block')) {
      cardsGrid = grid;
      break;
    }
  }
  if (!cardsGrid) return;

  // Only direct children that are card blocks
  const cardEls = Array.from(cardsGrid.children).filter(
    (el) => el.classList && el.classList.contains('utility-link-content-block')
  );

  // Build rows for each card
  const cardRows = cardEls.map(extractCard);

  // Table header per instructions
  const headerRow = ['Cards (cards37)'];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...cardRows
  ], document);

  element.replaceWith(table);
}
