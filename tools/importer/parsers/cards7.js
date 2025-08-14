/* global WebImporter */
export default function parse(element, { document }) {
  // Always use header row as required
  const headerRow = ['Cards (cards7)'];

  // Get all card image wrappers
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = [];

  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    // For cards7 block, always two columns: image, text
    // There is no text in the HTML so use empty string for cell 2
    if (img) {
      rows.push([img.cloneNode(true), '']);
    }
  });

  if (rows.length > 0) {
    // Compose cells: header row, then each image+text (even if text is empty)
    const cells = [headerRow, ...rows];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
