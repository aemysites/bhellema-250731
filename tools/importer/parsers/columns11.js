/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure a valid section
  if (!element || !element.querySelector) return;

  // Use the required block header
  const headerRow = ['Columns (columns11)'];

  // Find the main content container
  const container = element.querySelector('.container');
  if (!container) return;

  // ---
  // FIRST ROW: Title/eyebrow (left) and description/author/button (right)
  // ---
  const topGrid = container.querySelector('.grid-layout.tablet-1-column');
  const leftCol = topGrid?.children[0]; // title area
  const rightCol = topGrid?.children[1]; // description area

  // Collect left column (eyebrow + h1)
  let leftContent = document.createElement('div');
  if (leftCol) {
    Array.from(leftCol.children).forEach((c) => leftContent.appendChild(c.cloneNode(true)));
  }

  // Collect right column (paragraph, author meta, and button)
  let rightContent = document.createElement('div');
  if (rightCol) {
    // Paragraph
    const para = rightCol.querySelector('.rich-text');
    if (para) rightContent.appendChild(para.cloneNode(true));

    // Author meta (but NOT the avatar image)
    const innerGrid = rightCol.querySelector('.grid-layout');
    if (innerGrid) {
      const authorRow = innerGrid.querySelector('.flex-horizontal.y-center');
      if (authorRow) {
        const authorMeta = authorRow.querySelectorAll('div');
        if (authorMeta.length > 1) {
          rightContent.appendChild(authorMeta[1].cloneNode(true));
        }
      }
      // Button
      const button = innerGrid.querySelector('a.button');
      if (button) rightContent.appendChild(button.cloneNode(true));
    }
  }

  // ---
  // SECOND ROW: Two images, side by side
  // ---
  const imageGrid = container.querySelector('.grid-layout.mobile-portrait-1-column');
  let imgCells = [];
  if (imageGrid) {
    const imgDivs = imageGrid.querySelectorAll('.utility-aspect-1x1');
    imgDivs.forEach((imgDiv) => {
      const img = imgDiv.querySelector('img');
      if (img) {
        imgCells.push(img);
      }
    });
  }
  // Defensive: always ensure two columns
  while (imgCells.length < 2) imgCells.push('');

  // Build block table. Remove trailing empty rows, if present.
  const cells = [
    headerRow,
    [leftContent, rightContent],
    imgCells
  ];
  // Remove any trailing rows that are entirely empty
  while (cells.length > 2 && cells[cells.length - 1].every((cell) => {
    if (typeof cell === 'string') return cell.trim() === '';
    if (cell instanceof document.defaultView.HTMLElement) return !cell.textContent.trim() && (!cell.querySelector('img'));
    return false;
  })) {
    cells.pop();
  }

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
