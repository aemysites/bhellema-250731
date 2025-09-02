/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (main flex wrapper)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  let imageEl = null;
  let textEl = null;

  if (grid) {
    // Find all direct children
    const childDivs = grid.querySelectorAll(':scope > div');
    // First area: image background container (look for .ix-parallax-scale-out-hero)
    for (const div of childDivs) {
      if (div.querySelector('img.cover-image')) {
        imageEl = div.querySelector('img.cover-image');
        break;
      }
    }
    // Second area: headline container (look for .container)
    for (const div of childDivs) {
      if (div.classList.contains('container')) {
        textEl = div;
        break;
      }
    }
  }

  // Build the image cell content with comment
  let imageCell = '';
  if (imageEl) {
    imageCell = document.createElement('div');
    imageCell.appendChild(document.createComment(' field:image '));
    imageCell.appendChild(imageEl);
  }

  // Build the text cell content with comment
  let textCell = '';
  if (textEl) {
    textCell = document.createElement('div');
    textCell.appendChild(document.createComment(' field:text '));
    // Find the h1 inside textEl
    const h1 = textEl.querySelector('h1');
    if (h1) textCell.appendChild(h1);
    // Add all p, h2, h3, h4, etc. except h1
    const others = Array.from(textEl.querySelectorAll(':scope *')).filter(e =>
      (['H2','H3','H4','P'].includes(e.tagName) && e !== h1)
    );
    others.forEach(e => textCell.appendChild(e));
    // Add CTAs if any (buttons or links)
    const ctas = textEl.querySelectorAll('a, button');
    ctas.forEach(e => textCell.appendChild(e));
  }

  // Compose table cells: header, image, text (as required for Hero block)
  // Always 3 rows for Hero28, even if middle or last cell is empty
  const rows = [
    ['Hero (hero28)'],
    [imageCell],
    [textCell]
  ];

  // Guarantee: Always 3 rows (header, image, text). If imageCell or textCell is missing, cell is empty.
  if (!imageCell) rows[1] = [''];
  if (!textCell) rows[2] = [''];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
