/* global WebImporter */
export default function parse(element, { document }) {
  // Always start with the correct header
  const headerRow = ['Cards (cards17)'];
  const cells = [headerRow];

  // Select all direct image cells
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    let imageCell = '';
    if (img) {
      // Model hint must go directly in the td, not wrapped in a div
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(' field:image '));
      frag.appendChild(img);
      imageCell = frag;
    }
    // No text in this layout, so second cell is empty
    cells.push([imageCell, '']);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
