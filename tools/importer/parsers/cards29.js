/* global WebImporter */
export default function parse(element, { document }) {
  // Always use this exact header row (block name only)
  const headerRow = ['Cards (cards29)'];
  const rows = [headerRow];

  // For each card: create a row with three columns: style, image, rich text (empty except image)
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((cardDiv) => {
    // Style (not present)
    const styleCell = '';
    // Image/Icon (img element, or empty)
    const img = cardDiv.querySelector('img');
    const imageCell = img ? img : '';
    // Rich text (not present)
    const richTextCell = '';
    // Always 3 columns per card row
    rows.push([styleCell, imageCell, richTextCell]);
  });

  // Replace with a 3-column table, as required by block spec
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
