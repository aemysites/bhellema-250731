/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: If block is empty, do nothing
  if (!element) return;

  // Prepare the block header row
  const headerRow = ['Accordion'];
  const rows = [headerRow];

  // Select all accordion items (each .accordion.w-dropdown is one)
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion.w-dropdown'));

  accordionItems.forEach((item) => {
    // Find the clickable title (usually .paragraph-lg or similar inside .w-dropdown-toggle)
    const toggle = item.querySelector(':scope > .w-dropdown-toggle');
    // Defensive: If no toggle, skip this item
    if (!toggle) return;
    const title = toggle.querySelector('.paragraph-lg') || toggle;

    // Find the content (the body inside .w-dropdown-list)
    const contentNav = item.querySelector(':scope > .w-dropdown-list');
    let content = '';
    if (contentNav) {
      // Try to grab the rich text if present, else the .w-dropdown-list
      const rich = contentNav.querySelector('.w-richtext') || contentNav;
      content = rich;
    }
    // Push a row: [title, content], referencing real elements
    rows.push([
      title,
      content
    ]);
  });

  // Create the accordion table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new block table
  element.replaceWith(table);
}
