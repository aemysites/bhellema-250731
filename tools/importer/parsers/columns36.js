/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find root content columns (left and right)
  const container = element.querySelector('.container');
  if (!container) return;

  // The grid wraps two primary children: left=content, right=images
  const gridLayout = container.querySelector('.grid-layout');
  if (!gridLayout) return;

  // Grab direct children of the grid layout (columns)
  const columnDivs = Array.from(gridLayout.children);
  if (columnDivs.length < 2) return;

  // Left column (text, buttons)
  const leftCol = columnDivs[0];
  // Right column (images), first child with .grid-layout inside
  const rightCol = columnDivs[1];
  let imagesWrapper = rightCol.querySelector('.grid-layout');

  // Defensive: if no images wrapper fallback to rightCol
  if (!imagesWrapper) imagesWrapper = rightCol;

  // Collect all images inside imagesWrapper
  const images = Array.from(imagesWrapper.querySelectorAll('img'));

  // Compose left content: heading, paragraph, buttons
  // Use entire leftCol for resilience
  // Compose right content: images (in a fragment)
  const rightContent = document.createDocumentFragment();
  images.forEach(img => rightContent.appendChild(img));

  // Table header
  const headerRow = ['Columns (columns36)'];
  // Table content (second row: left & right columns)
  const cellsRow = [leftCol, rightContent];

  // Table 2d array
  const tableArray = [headerRow, cellsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableArray, document);

  // Replace the original element
  element.replaceWith(block);
}
