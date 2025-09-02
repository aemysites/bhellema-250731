/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create HTML field comments
  function createFieldComment(name) {
    return document.createComment(` field:${name} `);
  }

  // Compose table rows
  const rows = [];
  // Header: single cell (with colspan=2 to match row structure)
  rows.push(['Accordion']);

  // Gather accordion items
  const accordionItems = element.querySelectorAll(':scope > div.accordion');
  accordionItems.forEach((item) => {
    // SUMMARY/TITLE CELL
    const titleEl = item.querySelector('.w-dropdown-toggle .paragraph-lg');
    const summaryCell = [];
    if (titleEl) {
      summaryCell.push(createFieldComment('summary'));
      summaryCell.push(titleEl);
    }
    // TEXT/CONTENT CELL
    const contentWrap = item.querySelector('.accordion-content .utility-padding-all-1rem');
    let textEl = contentWrap && contentWrap.querySelector('.w-richtext');
    if (!textEl && contentWrap) textEl = contentWrap;
    const textCell = [];
    if (textEl) {
      textCell.push(createFieldComment('text'));
      textCell.push(textEl);
    }
    rows.push([summaryCell, textCell]);
  });

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Fix: set colspan=2 on first row's cell to ensure a valid table
  const firstRow = table.querySelector('tr');
  if (firstRow && firstRow.children.length === 1) {
    firstRow.children[0].setAttribute('colspan', '2');
  }

  element.replaceWith(table);
}
