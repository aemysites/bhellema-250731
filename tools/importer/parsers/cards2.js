/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract elements in a robust way, given block layout
  const cards = [];

  // Header row as per instruction
  const headerRow = ['Cards (cards2)'];
  cards.push(headerRow);

  // Find the card grid
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Card 1: Large card (the first direct child, an <a>)
  const [firstCardLink, ...rest] = grid.children;
  if (firstCardLink && firstCardLink.classList.contains('utility-link-content-block')) {
    // Image (second card cell)
    const imageWrap = firstCardLink.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
    let image = null;
    if (imageWrap) image = imageWrap.querySelector('img');

    // Text block (third card cell)
    // We'll gather all the content except the image
    const textNodes = [];
    // tag group
    const tagGroup = firstCardLink.querySelector('.tag-group');
    if (tagGroup) textNodes.push(tagGroup);
    // heading
    const heading = firstCardLink.querySelector('h2, h3, h4, h1');
    if (heading) textNodes.push(heading);
    // description
    const desc = firstCardLink.querySelector('p');
    if (desc) textNodes.push(desc);

    cards.push([
      '',
      image || '',
      textNodes
    ]);
  }

  // Card 2 & 3: Two cards in flex-horizontal.flex-vertical.flex-gap-sm
  const flexRows = grid.querySelectorAll('.flex-horizontal.flex-vertical.flex-gap-sm');
  if (flexRows.length >= 1) {
    // The first .flex-horizontal... contains the next two image cards
    const flex1 = flexRows[0];
    const flexCardLinks = flex1.querySelectorAll(':scope > a.utility-link-content-block');
    flexCardLinks.forEach(link => {
      // image
      const imageWrap = link.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
      let image = null;
      if (imageWrap) image = imageWrap.querySelector('img');
      // text block
      const textNodes = [];
      // tag group
      const tagGroup = link.querySelector('.tag-group');
      if (tagGroup) textNodes.push(tagGroup);
      // heading
      const heading = link.querySelector('h2, h3, h4, h1');
      if (heading) textNodes.push(heading);
      // description
      const desc = link.querySelector('p');
      if (desc) textNodes.push(desc);
      cards.push([
        '',
        image || '',
        textNodes
      ]);
    });
  }

  // Remaining cards: small text-only cards in the second .flex-horizontal...
  if (flexRows.length >= 2) {
    const flex2 = flexRows[1];
    // Each card is an <a>, separated by <div class="divider">
    const cardLinks = flex2.querySelectorAll(':scope > a.utility-link-content-block');
    cardLinks.forEach(link => {
      // No image for these cards
      // text block
      const textNodes = [];
      // heading
      const heading = link.querySelector('h2, h3, h4, h1');
      if (heading) textNodes.push(heading);
      // description
      const desc = link.querySelector('p');
      if (desc) textNodes.push(desc);
      cards.push([
        '',
        '',
        textNodes
      ]);
    });
  }

  // Build the block table
  const table = WebImporter.DOMUtils.createTable(cards, document);
  element.replaceWith(table);
}
