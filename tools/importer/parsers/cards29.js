/* global WebImporter */

export default function parse(element, { document }) {
  if (!element || !document) return;

  // Header row for Cards (cards29) block (one column only)
  const headerRow = ['Cards (cards29)'];

  // Each card is a div.utility-aspect-1x1 containing an img
  const cardDivs = Array.from(element.querySelectorAll(':scope > div.utility-aspect-1x1'));

  const rows = cardDivs.map(cardDiv => {
    // Find image
    const img = cardDiv.querySelector('img');
    let imageCell = '';
    if (img) {
      imageCell = [document.createComment(' field:image '), img];
    }
    // Second cell: only add field:text comment if there is content
    let textCell = '';
    const childNodes = Array.from(cardDiv.childNodes).filter(node => {
      if (node === img) return false;
      if (node.nodeType === 3) {
        return node.textContent.trim();
      }
      if (node.nodeType === 1) {
        return node.textContent.trim();
      }
      return false;
    });
    if (childNodes.length) {
      textCell = [document.createComment(' field:text '), ...childNodes];
    }
    return [imageCell, textCell];
  });

  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
