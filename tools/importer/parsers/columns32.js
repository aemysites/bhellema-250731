/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the two columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get columns (image and content)
  const columns = Array.from(grid.children);
  let cells = [];

  // First column: image
  const img = columns[0]?.querySelector('img');
  if (img) cells.push(img);

  // Second column: content
  const contentRoot = columns[1];
  if (contentRoot) {
    const frag = document.createElement('div');
    // Eyebrow + tag
    const flexHoriz = contentRoot.querySelector('.flex-horizontal.x-left.y-center');
    if (flexHoriz) {
      const eyebrow = flexHoriz.querySelector('.eyebrow');
      if (eyebrow) {
        frag.appendChild(document.createTextNode(eyebrow.textContent.trim() + ' '));
      }
      const tag = flexHoriz.querySelector('.tag');
      if (tag) {
        const tagText = tag.textContent.trim();
        if (tagText) {
          const tagElem = document.createElement('span');
          tagElem.textContent = tagText;
          frag.appendChild(tagElem);
        }
      }
      frag.appendChild(document.createElement('br'));
    }
    // Heading
    const heading = contentRoot.querySelector('h2');
    if (heading) {
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent.trim();
      frag.appendChild(h2);
    }
    // Author, role, date line
    const metaRow = contentRoot.querySelector('.flex-horizontal.flex-gap-xxs');
    if (metaRow) {
      const pieces = Array.from(metaRow.children).map(div => div.textContent.trim()).filter(Boolean);
      if (pieces.length) {
        const meta = document.createElement('div');
        meta.textContent = pieces.join(' ');
        frag.appendChild(meta);
      }
    }
    cells.push(frag);
  }

  // Only include non-empty cells in the content row
  const headerRow = ['Columns block (columns32)'];
  const tableRows = [headerRow, cells];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
