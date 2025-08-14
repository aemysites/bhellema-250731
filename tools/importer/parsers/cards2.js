/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract heading from a card anchor/div
  function findHeading(node) {
    return node.querySelector('h2, h3, h4, h5, h6');
  }

  // Helper to extract the main image from a card anchor/div
  function findImage(node) {
    return node.querySelector('img');
  }

  // Helper to extract description paragraph from a card anchor/div
  function findParagraph(node) {
    return node.querySelector('p');
  }

  // Get the main grid that contains all cards
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Prepare array for table rows
  const cells = [];
  // Header row as specified
  cells.push(['Cards (cards2)']);

  // The grid has a complex arrangement: left big card, top right with images, bottom right is a list of text cards
  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // 1. Left big card (first child is anchor)
  const leftCard = gridChildren[0];
  if (leftCard && leftCard.tagName === 'A') {
    const img = findImage(leftCard);
    // Compose text node (tag, heading, paragraph)
    const textParts = [];
    const tagDiv = leftCard.querySelector('.tag-group');
    if (tagDiv) textParts.push(tagDiv);
    const heading = findHeading(leftCard);
    if (heading) textParts.push(heading);
    const para = findParagraph(leftCard);
    if (para) textParts.push(para);
    cells.push([
      img || '',
      textParts
    ]);
  }

  // 2. Top right: smaller cards with image
  const topRight = gridChildren[1];
  if (topRight) {
    // It has two anchor children
    const topRightCards = Array.from(topRight.querySelectorAll(':scope > a'));
    topRightCards.forEach(card => {
      const img = findImage(card);
      const textParts = [];
      const tagDiv = card.querySelector('.tag-group');
      if (tagDiv) textParts.push(tagDiv);
      const heading = findHeading(card);
      if (heading) textParts.push(heading);
      const para = findParagraph(card);
      if (para) textParts.push(para);
      cells.push([
        img || '',
        textParts
      ]);
    });
  }

  // 3. Bottom right: a flex container (no images, just linked blocks)
  const bottomRight = gridChildren[2];
  if (bottomRight) {
    // Find all direct child anchors (cards)
    const listCards = Array.from(bottomRight.querySelectorAll(':scope > a'));
    listCards.forEach(card => {
      // No image in these cards
      const heading = findHeading(card);
      const para = findParagraph(card);
      // Compose text node
      const textParts = [];
      if (heading) textParts.push(heading);
      if (para) textParts.push(para);
      cells.push([
        '',
        textParts
      ]);
    });
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the section with the table
  element.replaceWith(table);
}
