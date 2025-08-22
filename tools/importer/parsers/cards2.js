/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract variant/tag text
  function getTagText(link) {
    const tagGroup = link.querySelector('.tag-group');
    if (tagGroup) {
      const tag = tagGroup.querySelector('.tag');
      if (tag) return tag.textContent.trim();
    }
    return '';
  }

  // Helper function to extract image element
  function getImage(link) {
    const img = link.querySelector('img');
    return img || '';
  }

  // Helper function to extract rich text content (excluding images)
  function getRichText(link) {
    const nodes = [];
    // Get heading
    const h3 = link.querySelector('h3');
    if (h3) nodes.push(h3);
    // Get paragraph
    const p = link.querySelector('p');
    if (p) nodes.push(p);
    if (nodes.length === 1) return nodes[0];
    if (nodes.length > 1) return nodes;
    return '';
  }

  // Get the grid area
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  const cards = [];

  // Big card on left (first child link, should have image, style, text)
  const gridChildren = Array.from(grid.children);
  let i = 0;
  if (gridChildren[i].matches('a.utility-link-content-block')) {
    const link = gridChildren[i];
    cards.push([
      getTagText(link),
      getImage(link),
      getRichText(link),
    ]);
    i++;
  }

  // Next column: two image cards
  if (gridChildren[i] && gridChildren[i].matches('.flex-horizontal.flex-vertical.flex-gap-sm')) {
    const col = gridChildren[i];
    const cardLinks = col.querySelectorAll('a.utility-link-content-block');
    cardLinks.forEach(link => {
      cards.push([
        getTagText(link),
        getImage(link),
        getRichText(link),
      ]);
    });
    i++;
  }

  // Final column: text-only cards (no image, no tag)
  if (gridChildren[i] && gridChildren[i].matches('.flex-horizontal.flex-vertical.flex-gap-sm')) {
    const col = gridChildren[i];
    const cardLinks = col.querySelectorAll('a.utility-link-content-block');
    cardLinks.forEach(link => {
      // Only push if there is actual content in the rich text, not empty
      const content = getRichText(link);
      // Only include this row if there is some visible content
      if (
        (typeof content === 'string' && content.trim() !== '') ||
        (Array.isArray(content) && content.length > 0) ||
        (content && content.textContent && content.textContent.trim() !== '')
      ) {
        cards.push(['', '', content]);
      }
    });
  }

  const headerRow = ['Cards (cards2)'];
  const cells = [headerRow, ...cards];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
