/* global WebImporter */
export default function parse(element, { document }) {
  // Block header must match exactly
  const headerRow = ['Cards (cards7)'];

  // Get all direct card containers
  const cardElements = element.querySelectorAll(':scope > div');

  // Compose rows for each card
  const rows = Array.from(cardElements).map(card => {
    // Style cell (blank)
    const styleCell = '';
    // Image/Icon cell
    const img = card.querySelector('img');
    const imageCell = img ? img : '';
    // Text content cell: ensure it is truly blank (no text in card)
    let textCell = '';
    // Remove the image and check if any text remains
    const cardClone = card.cloneNode(true);
    const imgClone = cardClone.querySelector('img');
    if (imgClone) imgClone.remove();
    // If there's text, add it, else keep as blank
    const cardText = cardClone.textContent.trim();
    if (cardText) textCell = cardText;
    return [styleCell, imageCell, textCell];
  });

  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
