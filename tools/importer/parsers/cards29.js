/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Cards (cards29)'];
  const rows = [headerRow];

  // Each card is a .utility-aspect-1x1 div (per the HTML structure)
  const cardDivs = element.querySelectorAll(':scope > .utility-aspect-1x1');

  cardDivs.forEach(cardDiv => {
    // Style cell is always blank
    const styleCell = '';
    // Image cell: use image element if present
    let imageCell = '';
    const img = cardDiv.querySelector('img');
    if (img) imageCell = img;
    // Text content: check for any visible element that's not the image
    // (in this HTML, there is none, so we keep empty)
    const textCell = '';
    // Add row
    rows.push([styleCell, imageCell, textCell]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
