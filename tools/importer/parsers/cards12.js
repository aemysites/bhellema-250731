/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards12) block: 2 columns, multiple rows, header row is block name
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Select all card anchors (each card is an <a> element)
  const cards = Array.from(element.querySelectorAll('a.utility-link-content-block'));

  cards.forEach(card => {
    // --- Image cell ---
    let imageCell = null;
    const imgWrapper = card.querySelector('.utility-aspect-2x3');
    if (imgWrapper) {
      const img = imgWrapper.querySelector('img');
      if (img) {
        // Wrap image in a fragment with field hint
        const frag = document.createDocumentFragment();
        frag.appendChild(document.createComment(' field:image '));
        frag.appendChild(img);
        imageCell = frag;
      }
    }

    // --- Text cell ---
    let textCell = null;
    // Compose the text cell content: tag, date, heading
    const tagDateRow = card.querySelector('.flex-horizontal');
    const heading = card.querySelector('h3');
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(' field:text '));
    if (tagDateRow) frag.appendChild(tagDateRow);
    if (heading) frag.appendChild(heading);
    textCell = frag;

    rows.push([imageCell || '', textCell || '']);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
