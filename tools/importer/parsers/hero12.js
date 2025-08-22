/* global WebImporter */
export default function parse(element, { document }) {
  // Header row (per guidelines)
  const headerRow = ['Hero (hero12)'];

  // --- 1. Find background image (block's background) ---
  let bgImg = null;
  const gridContainers = element.querySelectorAll(':scope > div');
  if (gridContainers.length > 0) {
    const img = gridContainers[0].querySelector('img.cover-image');
    if (img) bgImg = img;
  }

  // --- 2. Find content: title, subheading, CTA, and inner image ---
  let contentElems = [];
  if (gridContainers.length > 1) {
    const cardBody = gridContainers[1].querySelector('.card-body');
    if (cardBody) {
      const grid = cardBody.querySelector('.w-layout-grid');
      if (grid) {
        // The secondary image (left column)
        const innerImage = grid.querySelector('img.image');
        if (innerImage) contentElems.push(innerImage);
        // The text column: h2, list, button
        const textCol = Array.from(grid.querySelectorAll('div')).find(div => div.querySelector('h2'));
        if (textCol) {
          // 1. Heading
          const h2 = textCol.querySelector('h2');
          if (h2) contentElems.push(h2);
          // 2. All subheading/list lines (include icons)
          textCol.querySelectorAll('.flex-horizontal').forEach(fh => {
            if (fh.textContent.trim()) contentElems.push(fh);
          });
          // 3. CTA Button
          const btn = textCol.querySelector('a.button');
          if (btn) contentElems.push(btn);
        }
      }
    }
  }

  // --- 3. Build table: Always create 3 rows as per block spec, but do not create an empty cell in row three ---
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    contentElems.length > 0 ? [contentElems] : []
  ].filter(row => row.length > 0);
  
  // Guarantee 3 rows (header, image, content), but do NOT add a blank row if content is empty.
  while (rows.length < 3) {
    rows.push(['']);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
