/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all card links - these are the card containers
  const cards = Array.from(element.querySelectorAll('.utility-link-content-block'));

  // Header row: block name only (1 column)
  const headerRow = ['Cards (cards37)'];
  const rows = [headerRow];

  // For each card, extract and build row
  cards.forEach(cardEl => {
    // Image: find inside .utility-aspect-2x3 or .utility-aspect-1x1
    let imgDiv = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let img = imgDiv ? imgDiv.querySelector('img') : null;
    // Rich text content: get h3, p, and button (but no image)
    const richDiv = document.createElement('div');
    let heading = cardEl.querySelector('h3');
    let desc = cardEl.querySelector('p');
    let button = cardEl.querySelector('.button');
    if (heading) richDiv.appendChild(heading);
    if (desc) richDiv.appendChild(desc);
    if (button) richDiv.appendChild(button);
    // Only image and rich text columns, no unnecessary empty style column
    rows.push([img || '', richDiv]);
  });

  // Replace element with table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
