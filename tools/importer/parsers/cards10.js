/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: process only a .grid-layout containing card-link anchors
  if (!element || !element.classList.contains('grid-layout')) return;

  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Each card is an <a> with class 'card-link', inside the grid
  const cardLinks = [...element.querySelectorAll(':scope > a.card-link')];
  cardLinks.forEach(card => {
    // Find the image: it is inside the first child div of the anchor
    let imageDiv = card.querySelector(':scope > div');
    let img = imageDiv ? imageDiv.querySelector('img') : null;
    
    // Defensive: always use the actual img element if present
    const imageCell = img || '';

    // Text content is in the second div of the anchor (utility-padding-all-1rem)
    let textDivs = card.querySelectorAll(':scope > div');
    let textContainer = textDivs[1] || null;
    let textCellContent = [];

    if (textContainer) {
      // Tag (optional). It's inside .tag-group, which contains .tag
      const tagGroup = textContainer.querySelector('.tag-group');
      if (tagGroup) {
        // Clone or reference the tag group as a block, for resilience
        textCellContent.push(tagGroup);
      }
      // Heading (title)
      const heading = textContainer.querySelector('h3,h2,h4,h1');
      if (heading) textCellContent.push(heading);
      // Description (p)
      const paragraph = textContainer.querySelector('p');
      if (paragraph) textCellContent.push(paragraph);
    }

    // Build row: [image, text content]
    // If textCellContent is empty, use an empty string
    rows.push([
      imageCell,
      textCellContent.length ? textCellContent : ''
    ]);
  });

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
