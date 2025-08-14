/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (each card)
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = [];
  // Header as specified (block name and variant)
  rows.push(['Cards (cards19)']);
  cardDivs.forEach((cardDiv) => {
    // Defensive: find icon/svg as the 'image' (first SVG descendant in .icon)
    let iconContainer = cardDiv.querySelector('.icon');
    let icon = iconContainer && iconContainer.firstElementChild;
    // Defensive: find text (the first p)
    let text = cardDiv.querySelector('p');
    // Defensive: both are required for this block
    if (icon && text) {
      // Place the actual SVG element directly (not a string, not cloned)
      rows.push([
        icon, // icon/svg in first cell
        text // text in second cell (keeps original element)
      ]);
    }
  });
  // Build the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
