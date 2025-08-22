/* global WebImporter */
export default function parse(element, { document }) {
  // Collect all divider blocks (each represents an accordion item)
  const accordionItems = Array.from(element.querySelectorAll(':scope > .divider'));

  // Build table rows: first row is header with exactly one cell
  const rows = [ ['Accordion'] ];

  accordionItems.forEach((item) => {
    const grid = item.querySelector(':scope > .w-layout-grid');
    if (grid) {
      // Find title and content
      const title = grid.querySelector('.h4-heading');
      const content = grid.querySelector('.rich-text, .w-richtext');
      // Use full elements in cells for formatting retention
      rows.push([
        title ? title.cloneNode(true) : document.createTextNode(''),
        content ? content.cloneNode(true) : document.createTextNode('')
      ]);
    }
  });

  // Use DOMUtils to build the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
