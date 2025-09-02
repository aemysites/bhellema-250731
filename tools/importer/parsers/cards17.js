/* global WebImporter */
export default function parse(element, { document }) {
  // Table header (block name only)
  const headerRow = ['Cards (cards17)'];

  // Each direct child div is a card
  const cardDivs = element.querySelectorAll(':scope > div');

  const rows = [headerRow];

  cardDivs.forEach((cardDiv) => {
    // Image cell with correct HTML comment (not escaped, not wrapped)
    const img = cardDiv.querySelector('img');
    let imageCell = '';
    if (img) {
      imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(' field:image '));
      imageCell.appendChild(img.cloneNode(true));
    }

    // Text cell: only add field:text comment if there is content
    let textCell = '';
    let textContent = '';
    Array.from(cardDiv.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        textContent += node.textContent.trim() + ' ';
      }
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'IMG') {
        const t = node.textContent.trim();
        if (t) textContent += t + ' ';
      }
    });
    textContent = textContent.trim();
    if (textContent) {
      textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(' field:text '));
      textCell.append(textContent);
    } else {
      textCell = '';
    }

    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
