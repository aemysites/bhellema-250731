/* global WebImporter */
export default function parse(element, { document }) {
  // Create table for Accordion block
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  // Header row: single cell, colspan=2, text 'Accordion'
  const headerRow = document.createElement('tr');
  const headerCell = document.createElement('td');
  headerCell.textContent = 'Accordion';
  headerCell.setAttribute('colspan', '2');
  headerRow.appendChild(headerCell);
  tbody.appendChild(headerRow);

  // Find all accordion items
  const accordionItems = element.querySelectorAll('.accordion.w-dropdown');
  accordionItems.forEach((item) => {
    // Title cell: get all text content from the toggle (less specific selector)
    const toggle = item.querySelector('[role="button"]');
    let titleText = '';
    if (toggle) {
      // Get all text, not just .paragraph-lg
      titleText = toggle.textContent.trim();
    }

    // Content cell: get all content from accordion-content (less specific selector)
    const contentNav = item.querySelector('.accordion-content');
    let contentCell = '';
    if (contentNav) {
      // Get the full content block, not just .rich-text
      const contentDiv = contentNav.querySelector('div');
      if (contentDiv) {
        contentCell = contentDiv.cloneNode(true);
      } else {
        contentCell = contentNav.cloneNode(true);
      }
    }

    // Compose row
    const tr = document.createElement('tr');
    const tdTitle = document.createElement('td');
    tdTitle.textContent = titleText;
    const tdContent = document.createElement('td');
    if (contentCell) tdContent.appendChild(contentCell);
    tr.appendChild(tdTitle);
    tr.appendChild(tdContent);
    tbody.appendChild(tr);
  });

  element.replaceWith(table);
}
