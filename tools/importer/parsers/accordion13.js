/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header - must be exactly one cell
  const rows = [['Accordion']];

  // Each immediate child .divider is an accordion item
  const accordionItems = Array.from(element.querySelectorAll(':scope > .divider'));
  accordionItems.forEach((divider) => {
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    const title = grid.querySelector('.h4-heading');
    const content = grid.querySelector('.rich-text.paragraph-lg');
    if (!title || !content) return;
    rows.push([title, content]);
  });

  // Create the table
  const table = document.createElement('table');

  rows.forEach((row, i) => {
    const tr = document.createElement('tr');
    if (i === 0) {
      // header row: one th cell only
      const th = document.createElement('th');
      th.textContent = row[0];
      tr.appendChild(th);
    } else {
      // data rows: two td cells
      row.forEach((cell) => {
        const td = document.createElement('td');
        if (cell instanceof HTMLElement) {
          td.appendChild(cell);
        } else {
          td.textContent = cell;
        }
        tr.appendChild(td);
      });
    }
    table.appendChild(tr);
  });

  element.replaceWith(table);
}
