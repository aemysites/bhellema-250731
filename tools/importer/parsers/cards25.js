/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create field comment
  function fieldComment(name) {
    return document.createComment(` field:${name} `);
  }

  // Find all direct children (each card)
  const cardNodes = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [];
  // Each row: [image cell, text cell]

  cardNodes.forEach((card) => {
    // Try to find the image (mandatory for this block)
    const img = card.querySelector('img');
    let imageCell = [];
    if (img) {
      imageCell = [fieldComment('image'), img];
    } else {
      imageCell = [''];
    }

    // Try to find the text content (h3, p, etc)
    // Look for typical text container
    let textCell = [];
    let textDiv = null;
    // Typical structure: ...<div><div><h3>...</h3><p>...</p></div></div>...
    const innerDivs = card.querySelectorAll(':scope > div > div');
    for (let d of innerDivs) {
      if (d.querySelector('h3') || d.querySelector('p')) {
        textDiv = d;
        break;
      }
    }
    if (textDiv) {
      textCell = [fieldComment('text'), ...Array.from(textDiv.childNodes)];
    } else {
      textCell = [''];
    }
    rows.push([imageCell, textCell]);
  });

  const headerRow = ['Cards (cards25)'];
  const tableRows = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
