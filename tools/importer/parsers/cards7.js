/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Cards (cards7)'];

  // Each direct child of the grid is one card
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = Array.from(cardDivs).map(cardDiv => {
    // Find image in card, place field hint only if an image exists
    const img = cardDiv.querySelector('img');
    let imgCell = '';
    if (img) {
      imgCell = [document.createComment(' field:image '), img];
    }
    // Second cell: must be present, but source HTML has no text content
    // so we leave it empty, and do NOT add any field hint or wrapper
    return [imgCell, ''];
  });
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
