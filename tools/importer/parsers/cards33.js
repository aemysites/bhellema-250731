/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards33) block header row
  const headerRow = ['Cards (cards33)'];

  // Each card is an <a> direct child of the grid container
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Generate rows for each card
  const rows = cardLinks.map((card) => {
    // Find image for the card
    const img = card.querySelector('img');
    // Find the grid inner div (contains all text)
    const innerDiv = card.querySelector(':scope > div');

    // Prepare text cell: extract only relevant content, flat
    let textCellContent = document.createDocumentFragment();
    if (innerDiv) {
      // Remove the image node if present in innerDiv
      const clones = innerDiv.cloneNode(true);
      const cloneImg = clones.querySelector('img');
      if (cloneImg) cloneImg.remove();
      // Unwrap grid if necessary
      let nodes;
      if (clones.classList.contains('w-layout-grid')) {
        nodes = Array.from(clones.childNodes);
      } else {
        nodes = [clones];
      }
      nodes.forEach(node => textCellContent.appendChild(node));
    }

    // Always add field comments to the proper cell
    const imageCell = img ? [document.createComment(' field:image '), img] : [document.createComment(' field:image ')];
    // For text cell, always include field:text comment
    let textCell;
    if (textCellContent.childNodes.length) {
      textCell = [document.createComment(' field:text '), textCellContent];
    } else {
      textCell = [document.createComment(' field:text ')];
    }
    return [imageCell, textCell];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows,
  ], document);

  element.replaceWith(table);
}
