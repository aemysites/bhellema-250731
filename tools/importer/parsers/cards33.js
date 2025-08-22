/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exactly one column, block name
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Select all card links
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  cardLinks.forEach(cardLink => {
    // Style cell (blank)
    const styleCell = '';

    // Image cell: first img in card
    const img = cardLink.querySelector('img');
    const imageCell = img || '';

    // Text cell: collect all text content (tag, read time, title, desc, CTA)
    const grid = cardLink.querySelector('.w-layout-grid');
    const textCellContainer = document.createElement('div');
    if (grid) {
      // 1. Get tag and read time (inside flex-horizontal)
      const tagRow = grid.querySelector('.flex-horizontal');
      if (tagRow) {
        Array.from(tagRow.children).forEach(child => {
          textCellContainer.appendChild(child.cloneNode(true));
        });
      }
      // 2. Heading (h3/h4)
      const heading = grid.querySelector('h2,h3,h4,h5');
      if (heading) textCellContainer.appendChild(heading.cloneNode(true));
      // 3. Description (first <p>)
      const desc = grid.querySelector('p');
      if (desc) textCellContainer.appendChild(desc.cloneNode(true));
      // 4. CTA (div containing 'Read')
      const ctaDiv = Array.from(grid.querySelectorAll('div')).find(d => d.textContent.trim().toLowerCase() === 'read');
      if (ctaDiv && cardLink.href) {
        const link = document.createElement('a');
        link.href = cardLink.href;
        link.textContent = ctaDiv.textContent;
        textCellContainer.appendChild(link);
      }
    }
    // Defensive: if nothing found, use empty string
    let textCell = '';
    if (textCellContainer.childNodes.length) {
      textCell = Array.from(textCellContainer.childNodes);
    }
    
    rows.push([styleCell, imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
