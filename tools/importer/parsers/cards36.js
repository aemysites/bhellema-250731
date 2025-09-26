/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a cell with a field comment and content
  function createHintedCell(field, content) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${field} `));
    frag.appendChild(content);
    return frag;
  }

  // Get the main grid
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // The first card (large, left) is the first direct child (an <a> tag)
  const mainCard = grid.querySelector('a.utility-link-content-block');

  // The next two groups are flex containers with more cards
  const flexGroups = Array.from(grid.querySelectorAll(':scope > div'));
  // The first flex group contains two image cards
  const flexGroup1 = flexGroups[0];
  // The second flex group contains text-only cards separated by dividers
  const flexGroup2 = flexGroups[1];

  // Helper to extract card info from a card anchor
  function extractCard(cardAnchor) {
    // Try to find an image (may be absent)
    const img = cardAnchor.querySelector('img');
    let imageCell = '';
    if (img) {
      // Wrap in <picture> for best practice
      const picture = document.createElement('picture');
      picture.appendChild(img);
      imageCell = createHintedCell('image', picture);
    }
    // Compose text cell from everything except the image container
    // Remove image container from clone
    const cardClone = cardAnchor.cloneNode(true);
    // Remove any image wrappers
    Array.from(cardClone.querySelectorAll('img')).forEach(e => e.remove());
    Array.from(cardClone.querySelectorAll('.utility-aspect-1x1, .utility-aspect-3x2')).forEach(e => e.remove());
    // Remove tag group if present (keep as part of text)
    // The rest is text: tag, heading, paragraph
    // Remove empty wrappers
    Array.from(cardClone.querySelectorAll('div:empty')).forEach(e => e.remove());
    // Remove empty attributes
    cardClone.removeAttribute('href');
    cardClone.className = '';
    // Remove empty class attributes from descendants
    Array.from(cardClone.querySelectorAll('[class]')).forEach(e => {
      if (!e.className.trim()) e.removeAttribute('class');
    });
    // Remove id attributes
    Array.from(cardClone.querySelectorAll('[id]')).forEach(e => e.removeAttribute('id'));
    cardClone.removeAttribute('id');
    // Remove data-* attributes
    Array.from(cardClone.querySelectorAll('[data-hlx-imp-color],[data-hlx-imp-bgcolor],[data-aisg-image-id]')).forEach(e => {
      e.removeAttribute('data-hlx-imp-color');
      e.removeAttribute('data-hlx-imp-bgcolor');
      e.removeAttribute('data-aisg-image-id');
    });
    // Remove utility-margin-bottom-X classes
    Array.from(cardClone.querySelectorAll('[class]')).forEach(e => {
      if (/utility-margin-bottom/.test(e.className)) e.className = '';
    });
    // Remove empty wrappers again
    Array.from(cardClone.querySelectorAll('div:empty')).forEach(e => e.remove());
    // If only one child, unwrap
    let textContent = cardClone;
    if (cardClone.children.length === 1) {
      textContent = cardClone.firstElementChild;
    }
    const textCell = createHintedCell('text', textContent);
    return [imageCell, textCell];
  }

  // Collect all card rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards36)']);

  // 1. Main card (large, left)
  if (mainCard) {
    rows.push(extractCard(mainCard));
  }

  // 2. Flex group 1: two image cards
  if (flexGroup1) {
    const imageCards = Array.from(flexGroup1.querySelectorAll('a.utility-link-content-block'));
    imageCards.forEach(card => {
      rows.push(extractCard(card));
    });
  }

  // 3. Flex group 2: text-only cards, separated by dividers
  if (flexGroup2) {
    // Only direct children that are anchors are cards
    const textCards = Array.from(flexGroup2.children).filter(el => el.tagName === 'A');
    textCards.forEach(card => {
      // No image cell for text-only cards
      const textCell = extractCard(card)[1];
      rows.push(['', textCell]);
    });
  }

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
