/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to add field comment
  function fieldComment(name) {
    return document.createComment(` field:${name} `);
  }

  // Get all main card wrappers
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // For main cards: first child is the big left card, next is middle column with 2 cards with images, last is column with small cards without images
  const children = Array.from(grid.children);
  // Defensive check for expected structure
  if (!children.length) return;

  // Prepare rows for block table
  const rows = [];
  // Header
  rows.push(['Cards (cards2)']);

  // 1. Big left card (first child)
  const bigCard = children[0];
  if (bigCard) {
    // Find image
    const imgWrap = bigCard.querySelector('.utility-aspect-1x1');
    const img = imgWrap && imgWrap.querySelector('img');
    // Find text content (tag, heading, paragraph)
    const textContent = document.createElement('div');
    // Tag
    const tagGroup = bigCard.querySelector('.tag-group');
    if (tagGroup) {
      textContent.appendChild(tagGroup);
    }
    // Heading
    const heading = bigCard.querySelector('h3');
    if (heading) {
      textContent.appendChild(heading);
    }
    // Paragraph
    const para = bigCard.querySelector('p');
    if (para) {
      textContent.appendChild(para);
    }
    // Compose row
    rows.push([
      [fieldComment('image'), img],
      [fieldComment('text'), textContent]
    ]);
  }

  // 2. Middle column: 2 cards with images
  const middleCol = children[1];
  if (middleCol) {
    // Find all direct card anchors
    const midCards = Array.from(middleCol.querySelectorAll(':scope > a'));
    midCards.forEach((card) => {
      // Image
      const imgWrap = card.querySelector('.utility-aspect-3x2');
      const img = imgWrap && imgWrap.querySelector('img');
      // Text content
      const textContent = document.createElement('div');
      // Tag
      const tagGroup = card.querySelector('.tag-group');
      if (tagGroup) textContent.appendChild(tagGroup);
      // Heading
      const heading = card.querySelector('h3');
      if (heading) textContent.appendChild(heading);
      // Paragraph
      const para = card.querySelector('p');
      if (para) textContent.appendChild(para);
      // Compose row
      rows.push([
        [fieldComment('image'), img],
        [fieldComment('text'), textContent]
      ]);
    });
  }

  // 3. Right column: only text cards (no image)
  const rightCol = children[2];
  if (rightCol) {
    // Cards separated by .divider elements
    // Get all child anchors (cards)
    const rightCards = Array.from(rightCol.querySelectorAll(':scope > a'));
    rightCards.forEach((card) => {
      // Image cell will be empty, but field comment is required
      // Text
      const textContent = document.createElement('div');
      // Heading
      const heading = card.querySelector('h3');
      if (heading) textContent.appendChild(heading);
      // Paragraph
      const para = card.querySelector('p');
      if (para) textContent.appendChild(para);
      rows.push([
        [fieldComment('image')],
        [fieldComment('text'), textContent]
      ]);
    });
  }

  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace element
  element.replaceWith(table);
}
