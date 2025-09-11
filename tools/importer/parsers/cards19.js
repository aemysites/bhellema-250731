/* global WebImporter */
export default function parse(element, { document }) {
  // Get all top-level card containers
  const cardElements = Array.from(element.querySelectorAll(':scope > div'));

  // Table header (block name)
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  cardElements.forEach(cardEl => {
    // Icon cell
    let iconCell = '';
    const iconContainer = cardEl.querySelector(':scope > div.icon, :scope > div > .icon');
    if (iconContainer) {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(' field:image '));
      frag.appendChild(iconContainer);
      iconCell = frag;
    }

    // Text cell
    let textCell = '';
    const textP = cardEl.querySelector('p');
    if (textP && textP.textContent.trim()) {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(' field:text '));
      frag.appendChild(textP);
      textCell = frag;
    }

    rows.push([iconCell, textCell]);
  });

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
