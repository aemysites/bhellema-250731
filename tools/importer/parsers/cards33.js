/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: extract all block-level text content from the right side
  function createTextCell(cardRoot) {
    // Get the innermost grid div (text and tags)
    const contentDiv = cardRoot.querySelector('.w-layout-grid > div');
    if (!contentDiv) return document.createElement('span');
    const frag = document.createDocumentFragment();
    // Find all relevant children to preserve order: tag+min, heading, desc, CTA
    // We'll walk all direct children and keep relevant tags
    Array.from(contentDiv.childNodes).forEach((child) => {
      if (child.nodeType !== 1) return; // only element nodes
      if (
        child.matches('.flex-horizontal') ||
        child.matches('h3, .h4-heading') ||
        child.matches('p') ||
        (child.tagName === 'DIV' && child.textContent.trim().toLowerCase() === 'read')
      ) {
        frag.appendChild(child.cloneNode(true));
      }
    });
    if (!frag.hasChildNodes()) return document.createElement('span');
    // Prepend model hint if content present
    frag.insertBefore(document.createComment(' field:text '), frag.firstChild);
    return frag;
  }
  // Build header row
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];
  // Find all cards
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  cards.forEach((card) => {
    // Image cell
    const img = card.querySelector('img');
    let imgCell = document.createElement('span');
    if (img) {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(' field:image '));
      frag.appendChild(img.cloneNode(true));
      imgCell = frag;
    }
    // Text cell
    const textCell = createTextCell(card);
    rows.push([imgCell, textCell]);
  });
  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
