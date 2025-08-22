/* global WebImporter */
export default function parse(element, { document }) {
  // Get all accordion items
  const accordionDividers = Array.from(element.querySelectorAll(':scope > .divider'));
  const rows = [];
  accordionDividers.forEach(divider => {
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    const titleEl = grid.querySelector('.h4-heading');
    const contentEl = grid.querySelector('.rich-text');
    if (!titleEl || !contentEl) return;
    rows.push([
      titleEl,
      contentEl
    ]);
  });
  // Create table with header row containing exactly one column 'Accordion'
  const table = document.createElement('table');
  const headerTr = document.createElement('tr');
  const headerTh = document.createElement('th');
  headerTh.textContent = 'Accordion';
  headerTr.appendChild(headerTh);
  table.appendChild(headerTr);
  rows.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const td = document.createElement('td');
      td.appendChild(cell);
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
  element.replaceWith(table);
}
