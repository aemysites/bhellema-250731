/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !document) return;

  // Table header per block guidelines
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // Each card is a direct child div (utility-aspect-1x1)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    // Block spec: two columns: image, and mandatory text content (empty if none available)
    rows.push([img, '']); // Always 2 columns: image, then empty text cell
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
