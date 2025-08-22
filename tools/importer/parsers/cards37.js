/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract main cards from grid
  function getCardRows(element) {
    // Outermost grid: first card is a, then a nested grid for others
    const cards = [];
    // Immediate child divs in the container
    const container = element.querySelector('.container');
    if (!container) return cards;
    const outerGrid = container.querySelector('.grid-layout');
    if (!outerGrid) return cards;
    // The grid contains: 1st card (a), then nested grid with the remaining cards
    const gridChildren = Array.from(outerGrid.children);
    if (!gridChildren.length) return cards;
    // First card (large)
    const firstCard = gridChildren.find(child => child.matches('a.utility-link-content-block'));
    if (firstCard) cards.push(firstCard);
    // Find the nested grid which contains more cards
    const nestedGrid = gridChildren.find(child => child.classList.contains('grid-layout'));
    if (nestedGrid) {
      // All cards (a.utility-link-content-block) in nested grid
      const nestedCards = Array.from(nestedGrid.querySelectorAll('a.utility-link-content-block'));
      cards.push(...nestedCards);
    }
    return cards;
  }

  // Helper to extract card info
  function extractCardInfo(card) {
    let imageElem = null;
    let textElem = null;
    let ctaElem = null;
    // Try to find image: look for img inside 2x3 or 1x1 aspect divs
    const aspectImg = card.querySelector('.utility-aspect-2x3 img, .utility-aspect-1x1 img');
    if (aspectImg) {
      imageElem = aspectImg;
    }
    // Text and CTA
    // Text is inside .utility-padding-all-2rem (first card), or directly under the card (others)
    const textContainer = card.querySelector('.utility-padding-all-2rem') || card;
    // Title: h3 (can be h2-heading or h4-heading), find first h3/h4 inside text container
    const title = textContainer.querySelector('h2, h3, h4');
    // Description: p element (first one)
    const desc = textContainer.querySelector('p');
    // CTA: .button (as div or a)
    let ctaBtn = textContainer.querySelector('.button');
    // If not found as .button, try to find button or a with suitable classes
    if (!ctaBtn) {
      ctaBtn = textContainer.querySelector('a.button, button.button');
    }
    // Compose text content element array
    const textContent = [];
    if (title) textContent.push(title);
    if (desc) textContent.push(desc);
    if (ctaBtn) textContent.push(ctaBtn);
    return [
      '', // Style column (empty)
      imageElem || '', // Image column
      textContent.length ? textContent : '', // Text column (array if content, else empty string)
    ];
  }

  // Build the table rows
  const headerRow = ['Cards (cards37)'];
  const rows = [headerRow];
  const cards = getCardRows(element);
  cards.forEach(card => {
    rows.push(extractCardInfo(card));
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the element with the new block table
  element.replaceWith(table);
}
