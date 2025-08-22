/* global WebImporter */
export default function parse(element, { document }) {
  // Always create a header row with only one column containing the block name
  const headerRow = ['Cards (cards7)'];
  const rows = [headerRow];

  // Select all card divs (direct children)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Style/variant cell: not present, so empty string
    let styleCell = '';
    // Image/Icon cell: select the img element
    let imgCell = '';
    const img = cardDiv.querySelector('img');
    if (img) {
      imgCell = img;
    }
    // Rich Text cell: not present, so empty string
    let richTextCell = '';
    // All cards must have 3 columns, as required
    rows.push([styleCell, imgCell, richTextCell]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
