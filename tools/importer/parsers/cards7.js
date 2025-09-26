/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to wrap content with field comment
  function fieldFragment(fieldName, content) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${fieldName} `));
    frag.appendChild(content);
    return frag;
  }

  // Get all immediate child divs (each is a card)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Prepare header row with exactly one column
  const headerRow = ['Cards (cards7)'];
  const rows = [headerRow];

  // For each card, create a row with image and text columns
  cardDivs.forEach((cardDiv) => {
    // Find image element inside card
    const img = cardDiv.querySelector('img');
    let imageCell = '';
    if (img) {
      // Wrap image in a <picture> for best practice
      const picture = document.createElement('picture');
      picture.appendChild(img);
      imageCell = fieldFragment('image', picture);
    }
    // No text content in this HTML, so second cell is empty (no field hint)
    rows.push([imageCell, '']);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
