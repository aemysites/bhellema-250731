/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid containing all slides
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of grid (each one is a card/slide)
  const slideDivs = Array.from(grid.children);

  // Header row per block guidelines
  const rows = [ [ 'Carousel (carousel16)' ] ];

  slideDivs.forEach((slideDiv) => {
    // Defensive: find image inside slideDiv
    const imgContainer = slideDiv.querySelector('.utility-aspect-2x3');
    let img = imgContainer ? imgContainer.querySelector('img') : null;

    if (img) {
      // First cell: image with field comment
      const imgCell = document.createElement('div');
      imgCell.innerHTML = '<!-- field:media_image -->';
      imgCell.appendChild(img);
      // Always add an empty second cell (no field hint), per block structure requirement
      rows.push([imgCell, '']);
    }
  });

  // Create the block table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
