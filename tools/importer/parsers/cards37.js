/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to prepend a field comment if value exists
  function fieldWrap(field, node) {
    if (!node || (typeof node === 'string' && node.trim() === '')) return '';
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${field} `));
    if (typeof node === 'string') {
      const temp = document.createElement('div');
      temp.innerHTML = node;
      Array.from(temp.childNodes).forEach(n => frag.appendChild(n));
    } else {
      frag.appendChild(node);
    }
    return frag;
  }

  // Find the grid with all cards (has at least 4 direct children with 'utility-link-content-block')
  const grids = element.querySelectorAll('.w-layout-grid');
  let outerGrid = null;
  for (const grid of grids) {
    const cards = grid.querySelectorAll(':scope > a.utility-link-content-block, :scope > div.w-layout-grid > a.utility-link-content-block');
    if (cards.length >= 4) {
      outerGrid = grid;
      break;
    }
  }
  if (!outerGrid) return;

  // Flatten: Some cards are direct children, others are inside a nested grid
  let cardNodes = [];
  Array.from(outerGrid.children).forEach(child => {
    if (child.matches('a.utility-link-content-block')) {
      cardNodes.push(child);
    } else if (child.matches('.w-layout-grid')) {
      cardNodes.push(...child.querySelectorAll(':scope > a.utility-link-content-block'));
    }
  });

  const rows = [ ['Cards (cards37)'] ]; // header

  cardNodes.forEach(card => {
    // IMAGE: first image inside direct child or nested div
    let imgCell = '';
    const img = card.querySelector('img.cover-image');
    if (img) {
      imgCell = fieldWrap('image', img);
    }

    // TEXTS: title, description, CTA/button
    let textCell = '';
    // Find heading (h2/h3/h4)
    const heading = card.querySelector('h2, h3, h4, h5, h6');
    // Find paragraphs (for description)
    const para = card.querySelector('p');
    // Find CTA, e.g. .button (may be a div, a, or button)
    const cta = card.querySelector('.button, .btn, a.button, button');
    // Build the text cell fragment
    const frag = document.createDocumentFragment();
    if (heading) frag.appendChild(heading);
    if (para) frag.appendChild(para);
    if (cta) frag.appendChild(cta);
    if (frag.childNodes.length > 0) {
      textCell = fieldWrap('text', frag);
    }
    rows.push([imgCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
