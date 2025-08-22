/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for the block table
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Get all card links in the grid
  const cards = element.querySelectorAll(':scope > a.utility-link-content-block');

  cards.forEach((card) => {
    // Variant/Style cell
    let styleCell = '';
    const styleTag = card.querySelector('.tag');
    if (styleTag) {
      styleCell = styleTag.textContent.trim();
    }

    // Image/Icon cell
    let imageCell = '';
    const imageDiv = card.querySelector('.utility-aspect-2x3');
    if (imageDiv) {
      const img = imageDiv.querySelector('img');
      if (img) {
        imageCell = img;
      }
    }

    // Rich Text cell (title in strong, then date)
    let richCell = document.createElement('div');
    const title = card.querySelector('h3');
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      richCell.appendChild(strong);
    }
    const dateDiv = card.querySelector('.paragraph-sm');
    if (dateDiv) {
      richCell.appendChild(document.createElement('br'));
      richCell.appendChild(document.createTextNode(dateDiv.textContent.trim()));
    }
    // If both title and date are missing, empty cell
    if (!title && !dateDiv) richCell = '';

    // Add row to table: [style, image, rich text]
    rows.push([styleCell, imageCell, richCell]);
  });

  // Create the block table and replace the original element
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}
