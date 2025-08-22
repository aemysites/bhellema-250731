/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !element.querySelectorAll) return;

  // Header row with block name only
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Each card
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((cardDiv) => {
    // Always 3 columns: style (not present, so empty), icon, rich text
    const styleCell = '';
    let iconCell = '';
    const iconDiv = cardDiv.querySelector('.icon');
    if (iconDiv && iconDiv.firstElementChild) {
      iconCell = iconDiv.firstElementChild;
    }
    let contentCell = '';
    const p = cardDiv.querySelector('p');
    if (p) {
      contentCell = p;
    }
    rows.push([styleCell, iconCell, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
