/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // Extract all card containers
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach(cardDiv => {
    // Column 1: style/variant (none in input, so always empty)
    const styleCell = '';
    // Column 2: image (img element)
    const imgEl = cardDiv.querySelector('img');
    // Column 3: rich text content (use alt attribute ONLY, no other text in these cards)
    let richText = '';
    if (imgEl && imgEl.alt) {
      richText = imgEl.alt;
    }
    rows.push([styleCell, imgEl || '', richText]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
