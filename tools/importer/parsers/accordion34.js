/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion items are the direct children with class 'accordion'
  const accordionItems = Array.from(element.querySelectorAll(':scope > div.accordion'));

  // Table must have a single header row with one column, then each data row as an array of two cells
  const tableRows = [];
  tableRows.push(['Accordion']); // header row: single cell
  // Each following row must be an array of two cells
  accordionItems.forEach((item) => {
    // Title cell: .paragraph-lg inside .w-dropdown-toggle
    let titleCell = '';
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      const titleDiv = toggle.querySelector('.paragraph-lg');
      if (titleDiv) {
        // clone so we don't move the node from DOM
        const clonedTitle = titleDiv.cloneNode(true);
        const frag = document.createDocumentFragment();
        frag.appendChild(document.createComment(' field:summary '));
        frag.appendChild(clonedTitle);
        titleCell = frag;
      }
    }

    // Content cell: .w-richtext inside nav.accordion-content
    let contentCell = '';
    const contentNav = item.querySelector('nav.accordion-content');
    if (contentNav) {
      const richText = contentNav.querySelector('.w-richtext');
      if (richText) {
        const clonedRT = richText.cloneNode(true);
        const frag = document.createDocumentFragment();
        frag.appendChild(document.createComment(' field:text '));
        frag.appendChild(clonedRT);
        contentCell = frag;
      }
    }
    // Add the row as an array of two cells
    tableRows.push([titleCell, contentCell]);
  });

  // Create and replace with the table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
