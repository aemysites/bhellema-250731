/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get image container (the div that wraps the <img>)
  function getImageDiv(cardLink) {
    // The image container is the first child div
    const imageDiv = cardLink.querySelector('.utility-aspect-3x2');
    return imageDiv;
  }

  // Helper: get text container (the div with tag, heading, and paragraph)
  function getTextDiv(cardLink) {
    // The text container is the .utility-padding-all-1rem div
    const textDiv = cardLink.querySelector('.utility-padding-all-1rem');
    return textDiv;
  }

  // Get all card links (cards)
  const cardLinks = element.querySelectorAll(':scope > a.card-link');

  // Table header (block name MUST match target exactly)
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  cardLinks.forEach((cardLink) => {
    // --- IMAGE CELL ---
    const imageDiv = getImageDiv(cardLink);
    const imageCell = document.createElement('div');
    imageCell.innerHTML = '<!-- field:image -->';
    if (imageDiv) imageCell.append(imageDiv);

    // --- TEXT CELL ---
    const textDiv = getTextDiv(cardLink);
    const textCell = document.createElement('div');
    textCell.innerHTML = '<!-- field:text -->';
    if (textDiv) textCell.append(textDiv);

    rows.push([
      imageCell,
      textCell,
    ]);
  });

  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
