/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row
  const headerRow = ['Accordion'];

  // Will collect all accordion items as [title, content]
  const rows = [];

  // Defensive: find all immediate children with class 'divider' (each is an accordion item)
  const accordionItems = Array.from(element.querySelectorAll(':scope > .divider'));

  accordionItems.forEach(item => {
    // Each divider contains a grid with two children: title and content
    const grid = item.querySelector('.grid-layout');
    if (!grid) return; // Skip if structure is unexpected
    const gridChildren = Array.from(grid.children);
    // Title is usually an h4 or similar heading
    const titleEl = gridChildren.find(child => child.classList.contains('h4-heading'));
    // Content is a rich-text paragraph (may contain multiple paragraphs)
    const contentEl = gridChildren.find(child => child.classList.contains('rich-text'));
    // Defensive: skip if missing required elements
    if (!titleEl || !contentEl) return;
    // For model hinting, wrap title in a fragment with comment
    const titleFrag = document.createDocumentFragment();
    titleFrag.appendChild(document.createComment(' field:summary '));
    titleFrag.appendChild(titleEl);
    // For model hinting, wrap content in a fragment with comment
    const contentFrag = document.createDocumentFragment();
    contentFrag.appendChild(document.createComment(' field:text '));
    contentFrag.appendChild(contentEl);
    rows.push([titleFrag, contentFrag]);
  });

  // Build the table cells array
  const cells = [headerRow, ...rows];

  // Create the accordion block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block table
  element.replaceWith(blockTable);
}
