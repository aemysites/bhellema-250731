/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards24) block: header row
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Find all card links in the grid
  const cards = element.querySelectorAll(':scope > a.utility-link-content-block');

  cards.forEach(card => {
    // FIRST COLUMN: IMAGE
    let imageCell = '';
    const imageDiv = card.querySelector('div[class*="utility-aspect-2x3"]');
    const img = imageDiv ? imageDiv.querySelector('img') : null;
    if (img) {
      // Move the <img> node (do not clone)
      const tempDiv = document.createElement('div');
      tempDiv.appendChild(img);
      imageCell = `<!-- field:image -->${tempDiv.innerHTML}`;
    } else {
      imageCell = '';
    }

    // SECOND COLUMN: TEXT (meta and heading)
    let textCell = '';
    const metaRow = card.querySelector('div.flex-horizontal');
    const heading = card.querySelector('h3');
    if (metaRow || heading) {
      let textContent = '';
      if (metaRow) {
        const tempDiv = document.createElement('div');
        tempDiv.appendChild(metaRow);
        textContent += tempDiv.innerHTML;
      }
      if (heading) {
        const tempDiv = document.createElement('div');
        tempDiv.appendChild(heading);
        textContent += tempDiv.innerHTML;
      }
      textCell = `<!-- field:text -->${textContent}`;
    } else {
      textCell = '';
    }

    rows.push([imageCell, textCell]);
  });

  // Build table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
