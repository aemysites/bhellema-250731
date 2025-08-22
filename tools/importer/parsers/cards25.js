/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract all text content from a card div, ensuring no missing text
  function extractCardContent(cardDiv) {
    // Prefer .utility-padding-all-2rem, fallback to cardDiv
    let contentRoot = cardDiv.querySelector('.utility-padding-all-2rem') || cardDiv;
    const richTextCell = [];
    // Collect every direct child node of contentRoot that is a text element
    contentRoot.childNodes.forEach((node) => {
      // Accept h3 or p element nodes only (in proper order)
      if (node.nodeType === Node.ELEMENT_NODE && (node.tagName === 'H3' || node.tagName === 'P')) {
        richTextCell.push(node);
      }
    });
    // If no h3/p present, fallback to all text content
    if (richTextCell.length === 0) {
      const txt = contentRoot.textContent.trim();
      if (txt) {
        richTextCell.push(document.createTextNode(txt));
      }
    }
    return richTextCell.length > 0 ? richTextCell : '';
  }

  const rows = [
    ['Cards (cards25)'], // Header row, exactly one column
  ];

  // Each immediate child div is a card
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((cardDiv) => {
    // Find the image for the card
    const img = cardDiv.querySelector('img');
    // Extract all rich text content
    const cardContent = extractCardContent(cardDiv);
    // Determine style/variant
    let style = '';
    const classList = cardDiv.classList;
    if ([...classList].some(cl => cl.includes('section-image-wrapper'))) {
      style = 'card, dark';
    } else if ([...classList].some(cl => cl.includes('utility-aspect-1x1') || cl.includes('utility-aspect-3x2'))) {
      style = 'card';
    }
    // Always add 3 columns for each row
    rows.push([
      style,
      img || '',
      cardContent,
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
