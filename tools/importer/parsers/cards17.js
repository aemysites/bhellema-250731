/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must have a single column with the block name
  const headerRow = ['Cards (cards17)'];

  // According to provided HTML, each card only contains an image (no descriptive text)
  // But: Ensure we do not miss any possible text inside the cardDiv (robust extraction)
  const cardDivs = element.querySelectorAll(':scope > .utility-aspect-1x1');
  const rows = Array.from(cardDivs).map(cardDiv => {
    const img = cardDiv.querySelector('img');
    // Combine all non-empty text nodes in the cardDiv (for future robustness)
    let textContent = '';
    cardDiv.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        textContent += node.textContent.trim() + ' ';
      }
    });
    textContent = textContent.trim();
    return ['', img ? img : '', textContent];
  });

  // Build and replace table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
