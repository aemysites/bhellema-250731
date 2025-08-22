/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate child accordion items
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion'));
  const rows = [];
  // Header row for block table
  rows.push(['Accordion']);
  // For each accordion item, extract title and content
  accordions.forEach(acc => {
    // Title: find paragraph-lg inside w-dropdown-toggle
    const toggle = acc.querySelector('.w-dropdown-toggle');
    let title = '';
    if (toggle) {
      const titleElem = toggle.querySelector('.paragraph-lg');
      title = titleElem ? titleElem.textContent.trim() : '';
    }
    // Content: rich-text inside w-dropdown-list nav
    const nav = acc.querySelector('nav');
    let content = '';
    if (nav) {
      const richText = nav.querySelector('.rich-text');
      content = richText ? richText : nav; // fallback to full nav if not found
    }
    // Defensive: ensure both cells are present
    rows.push([title, content]);
  });
  // Create the Accordion block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element with block table
  element.replaceWith(table);
}
