/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Cards (cards10)'];

  // Get all direct children card links (each card)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a.card-link'));

  // We'll collect rows here
  const rows = [headerRow];

  cardLinks.forEach((card) => {
    // Style cell: get the variant from the tag (first tag in tag-group), if present
    let style = '';
    const tagGroup = card.querySelector('.tag-group');
    if (tagGroup) {
      const tag = tagGroup.querySelector('.tag');
      if (tag && tag.textContent) {
        style = tag.textContent.trim();
      }
    }

    // Image cell: find the image in the first child div
    let image = null;
    const aspectDiv = card.querySelector('.utility-aspect-3x2');
    if (aspectDiv) {
      image = aspectDiv.querySelector('img');
    }

    // Rich text cell: title and description from the second main div
    let richContent = [];
    const contentDiv = card.querySelector('.utility-padding-all-1rem');
    if (contentDiv) {
      // Find title (h3)
      const h3 = contentDiv.querySelector('h3');
      if (h3) {
        richContent.push(h3);
      }
      // Find description (p)
      const p = contentDiv.querySelector('p');
      if (p) {
        richContent.push(p);
      }
    }
    // Defensive: Always include three cells per row, even if some are empty
    rows.push([
      style || '',
      image || '',
      richContent.length ? richContent : ''
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
