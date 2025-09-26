/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a fragment with a field comment and content
  function fieldFrag(field, content) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${field} `));
    frag.appendChild(content);
    return frag;
  }

  // Find the main grid containing all cards
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all card elements (direct children that are links)
  const cards = Array.from(grid.children).filter(
    (child) => child.matches('a.utility-link-content-block, a.utility-link-content-block.w-inline-block')
  );

  // For the right column, there is a nested grid with more cards
  const nestedGrid = Array.from(grid.children).find(
    (child) => child.classList.contains('w-layout-grid') && child !== grid
  );
  let nestedCards = [];
  if (nestedGrid) {
    nestedCards = Array.from(nestedGrid.querySelectorAll('a.utility-link-content-block'));
  }

  // Compose all cards in order: left feature card, then right column cards
  const allCards = [cards[0], ...nestedCards];

  // Table header
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];

  // For each card, extract image and text
  allCards.forEach((card) => {
    // --- Image cell ---
    let imageCell = '';
    const img = card.querySelector('img');
    if (img) {
      // Wrap in <picture> for robustness
      const picture = document.createElement('picture');
      picture.appendChild(img);
      imageCell = fieldFrag('image', picture);
    }

    // --- Text cell ---
    let textCell = '';
    // Find heading (h2 or h3 or h4)
    const heading = card.querySelector('h2, h3, h4');
    // Find description (first <p>)
    const desc = card.querySelector('p');
    // Find CTA (button or .button)
    const cta = card.querySelector('.button');
    // Compose text fragment
    const textFrag = document.createDocumentFragment();
    if (heading) textFrag.appendChild(heading);
    if (desc) textFrag.appendChild(desc);
    if (cta) textFrag.appendChild(cta);
    if (textFrag.childNodes.length > 0) {
      textCell = fieldFrag('text', textFrag);
    }

    rows.push([imageCell, textCell]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
