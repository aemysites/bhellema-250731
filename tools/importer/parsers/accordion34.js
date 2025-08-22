/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Find all accordion items that are direct children
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion.w-dropdown'));

  // Build rows: first row is header ('Accordion'), then each item is [title, content]
  const rows = [
    ['Accordion'],
  ];

  accordions.forEach(acc => {
    // Title cell: get as much of the full title block as possible
    let title = acc.querySelector('.w-dropdown-toggle .paragraph-lg');
    if (!title) {
      // fallback: try first div under .w-dropdown-toggle
      title = acc.querySelector('.w-dropdown-toggle div');
    }
    // Always use the DOM node for cell, not its textContent
    const titleCell = title || '';

    // Content cell: prefer .w-richtext if present, else the inner div, else .w-dropdown-list itself
    const contentWrapper = acc.querySelector('.w-dropdown-list');
    let contentCell = '';
    if (contentWrapper) {
      const rich = contentWrapper.querySelector('.w-richtext');
      if (rich) {
        contentCell = rich;
      } else {
        const inner = contentWrapper.querySelector('div');
        contentCell = inner || contentWrapper;
      }
    }
    rows.push([titleCell, contentCell]);
  });

  // Create and replace with the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
