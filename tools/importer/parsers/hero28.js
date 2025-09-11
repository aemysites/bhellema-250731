/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the main grid
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Find the image cell (background image)
  let imageEl = null;
  let imageAlt = '';
  // The image is inside the first grid column, inside .ix-parallax-scale-out-hero
  const imageCell = grid.children[0];
  if (imageCell) {
    const candidateImg = imageCell.querySelector('img');
    if (candidateImg) {
      imageEl = candidateImg;
      imageAlt = candidateImg.getAttribute('alt') || '';
    }
  }

  // Find the text cell (title, subtitle, actions)
  let textWrapper = null;
  let textContent = [];
  const textCell = grid.children[1];
  if (textCell) {
    // The structure is .container > .utility-margin-bottom-6rem
    textWrapper = textCell.querySelector('.utility-margin-bottom-6rem');
    if (textWrapper) {
      // We want the h1 (title) and possibly other elements (cta, subtitle)
      // In this HTML, just h1 is present
      // Defensive: copy all direct children except for empty button group
      Array.from(textWrapper.children).forEach((child) => {
        // Ignore empty button group
        if (child.classList.contains('button-group') && !child.textContent.trim()) {
          return;
        }
        textContent.push(child);
      });
    }
  }

  // Compose the table rows

  // Row 1: header
  const headerRow = ['Hero (hero28)'];

  // Row 2: background image
  let imageCellContent = '';
  if (imageEl) {
    // Add field comment and image element
    // Only add HTML comment if something is in cell
    // Place comment before image
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(' field:image '));
    frag.appendChild(imageEl);
    imageCellContent = frag;
  }
  
  // Row 3: text content (title, subtitle, etc)
  let textCellContent = '';
  if (textContent.length > 0) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(' field:text '));
    textContent.forEach((el) => frag.appendChild(el));
    textCellContent = frag;
  }

  // Build the table
  const cells = [
    headerRow,
    [imageCellContent],
    [textCellContent]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
