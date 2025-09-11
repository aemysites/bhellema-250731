/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create model hint comment
  function createFieldComment(name) {
    return document.createComment(` field:${name} `);
  }

  // Find the active tab pane (the one that's visible)
  const activePane = element.querySelector('.w-tab-pane.w--tab-active');
  if (!activePane) return;

  // Find grid inside active tab
  const grid = activePane.querySelector('.w-layout-grid');
  if (!grid) return;

  // Find all card anchor elements
  const cards = Array.from(grid.querySelectorAll('a'));

  // Always use the block name and variant as header
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  cards.forEach(card => {
    // Image cell
    let imageCell = '';
    const img = card.querySelector('img');
    if (img) {
      imageCell = [createFieldComment('image'), img.cloneNode(true)];
    }

    // Text cell: gather all visible text (not just h3 and .paragraph-sm)
    let textCell = '';
    // Collect all text-based children in card (h3, div.paragraph-sm, etc)
    const textContentEls = [];
    // In some cards, text is direct children; in others, inside wrappers
    card.childNodes.forEach(child => {
      // Only element nodes
      if (child.nodeType === 1) {
        if (child.matches('h3, .paragraph-sm')) {
          textContentEls.push(child.cloneNode(true));
        } else {
          // For wrappers, look for h3/paragraph-sm inside
          const h3 = child.querySelector('h3');
          if (h3) textContentEls.push(h3.cloneNode(true));
          // Get all .paragraph-sm elements inside
          child.querySelectorAll('.paragraph-sm').forEach(para => {
            textContentEls.push(para.cloneNode(true));
          });
        }
      }
    });
    // If text content elements found, add comment and content
    if (textContentEls.length > 0) {
      const wrapper = document.createElement('div');
      textContentEls.forEach(el => wrapper.appendChild(el));
      textCell = [createFieldComment('text'), wrapper];
    }

    rows.push([imageCell, textCell]);
  });

  // Replace element with block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
