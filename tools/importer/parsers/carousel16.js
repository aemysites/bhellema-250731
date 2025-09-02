/* global WebImporter */
export default function parse(element, { document }) {
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const slideDivs = Array.from(grid.children);

  // Header row: always 1 column
  const headerRow = ['Carousel (carousel16)'];
  const cells = [headerRow];

  // Data rows: if there is no text content, only the image cell is present
  slideDivs.forEach((slideDiv) => {
    const img = slideDiv.querySelector('img');
    let imageCell = '';
    if (img) {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(' field:media_image '));
      frag.appendChild(document.createTextNode('\n'));
      frag.appendChild(img);
      imageCell = frag;
    }
    // Check for text content (none expected in this HTML)
    // So we add only the image cell
    cells.push([imageCell]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
