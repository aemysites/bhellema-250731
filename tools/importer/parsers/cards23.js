/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a field-hinted fragment
  function fieldFragment(field, content) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${field} `));
    frag.appendChild(content);
    return frag;
  }

  // Find all tab panes (each contains a grid of cards)
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  const cards = [];

  tabPanes.forEach((tabPane) => {
    // Each tabPane contains a grid-layout div
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a> inside the grid
    const cardEls = grid.querySelectorAll('a.utility-link-content-block');
    cardEls.forEach((cardEl) => {
      // Card image (optional)
      let img = cardEl.querySelector('img');
      let imgCell = '';
      if (img) {
        imgCell = fieldFragment('image', img);
      }
      // Card text (title + description)
      // Try to get the heading and paragraph
      let textCell = '';
      const frag = document.createDocumentFragment();
      // Heading
      const heading = cardEl.querySelector('h3');
      if (heading) {
        frag.appendChild(heading);
      }
      // Description
      const desc = cardEl.querySelector('div.paragraph-sm');
      if (desc) {
        frag.appendChild(document.createElement('br'));
        frag.appendChild(desc);
      }
      if (frag.childNodes.length > 0) {
        textCell = fieldFragment('text', frag);
      }
      cards.push([imgCell, textCell]);
    });
  });

  // Compose the table rows
  const rows = [];
  rows.push(['Cards (cards23)']);
  cards.forEach(([imgCell, textCell]) => {
    rows.push([
      imgCell || '',
      textCell || '',
    ]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
