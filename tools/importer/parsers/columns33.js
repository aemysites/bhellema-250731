/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns33)'];

  // Defensive: Get the grid layout container (holds columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (columns)
  const columns = Array.from(grid.children);

  // Column 1: Image
  let imageCell = null;
  const img = columns.find((el) => el.tagName === 'IMG');
  if (img) {
    imageCell = img;
  }

  // Column 2: Structured text content
  let textCell = null;
  const textCol = columns.find((el) => el !== img);
  if (textCol) {
    // Compose all relevant children in order
    const frag = document.createDocumentFragment();
    // Eyebrow and tag (horizontal flex)
    const flexTop = textCol.querySelector('.flex-horizontal.x-left.y-center');
    if (flexTop) {
      frag.appendChild(flexTop);
    }
    // Heading
    const heading = textCol.querySelector('.h2-heading');
    if (heading) {
      frag.appendChild(heading);
    }
    // Byline (horizontal flex)
    const flexByline = textCol.querySelector('.flex-horizontal.flex-gap-xxs');
    if (flexByline) {
      frag.appendChild(flexByline);
    }
    textCell = frag;
  }

  // Build the table rows
  const cells = [
    headerRow,
    [imageCell, textCell]
  ];

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
