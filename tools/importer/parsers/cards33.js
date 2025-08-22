/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as specified
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Each card is an <a> direct child
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach(card => {
    // --- Column 1: Style/Tag ---
    let style = '';
    const tagDiv = card.querySelector('.tag > div');
    if (tagDiv) style = tagDiv.textContent.trim();

    // --- Column 2: Image ---
    let img = '';
    const imgEl = card.querySelector('img');
    if (imgEl) img = imgEl;

    // --- Column 3: Rich Text (no images) ---
    // Find main content div (after .cover-image)
    let richText = '';
    const gridDiv = card.querySelector('.w-layout-grid.grid-layout');
    if (gridDiv) {
      // Find the inner content div (has meta, h3, p, 'Read')
      const contentDivs = gridDiv.querySelectorAll('div');
      let contentDiv = null;
      // Choose the div that contains h3
      for (const div of contentDivs) {
        if (div.querySelector('h3, .h4-heading')) {
          contentDiv = div;
          break;
        }
      }
      if (!contentDiv && contentDivs.length > 1) {
        contentDiv = contentDivs[1];
      }
      if (contentDiv) {
        const frag = document.createDocumentFragment();
        // Meta (read time, not tag)
        const flexMeta = contentDiv.querySelector('.flex-horizontal');
        if (flexMeta) {
          const metaClone = flexMeta.cloneNode(true);
          const tag = metaClone.querySelector('.tag');
          if (tag) tag.remove();
          if (metaClone.textContent.trim()) frag.appendChild(metaClone);
        }
        // Heading
        const heading = contentDiv.querySelector('h3, .h4-heading');
        if (heading) frag.appendChild(heading);
        // Paragraph
        const para = contentDiv.querySelector('p');
        if (para) frag.appendChild(para);
        // 'Read' link/button
        const readDiv = Array.from(contentDiv.querySelectorAll('div')).find(d => d.textContent.trim() === 'Read');
        if (readDiv) frag.appendChild(readDiv);
        richText = frag;
      }
    }

    rows.push([
      style,
      img,
      richText,
    ]);
  });

  // Table replacement
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
