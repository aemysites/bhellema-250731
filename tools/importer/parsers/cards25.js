/* global WebImporter */
export default function parse(element, { document }) {
  // Block header
  const headerRow = ['Cards (cards25)'];

  // Utility function: Extracts the image (first img found)
  function getCardImage(cardElem) {
    const img = cardElem.querySelector('img');
    return img ? img : null;
  }

  // Utility: Extracts heading & description
  function getCardText(cardElem) {
    const wrapper = cardElem.querySelector('.utility-padding-all-2rem') || cardElem;
    let h3 = wrapper.querySelector('h3');
    let p = wrapper.querySelector('p');
    const nodes = [];
    if (h3) nodes.push(h3);
    if (p) nodes.push(p);
    if (nodes.length > 0) {
      // field:text (because heading+description is text)
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(' field:text '));
      nodes.forEach(n => frag.appendChild(n));
      return frag;
    }
    return null;
  }

  // Parse each card (immediate children)
  const cards = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [];
  cards.forEach(cardElem => {
    // Is this a card with text, or just an image?
    const img = getCardImage(cardElem);
    const text = getCardText(cardElem);

    let imageCell = null;
    let textCell = null;

    if (img) {
      // field:image
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(' field:image '));
      frag.appendChild(img);
      imageCell = frag;
    } else {
      imageCell = '';
    }

    if (text) {
      textCell = text;
    } else {
      textCell = '';
    }

    rows.push([imageCell, textCell]);
  });

  // Compose cells for createTable
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
