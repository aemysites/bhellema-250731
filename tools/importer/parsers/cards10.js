/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create model hint comment
  function createModelHintComment(name) {
    return document.createComment(` field:${name} `);
  }

  // Get all direct card links
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  // Build header row
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  cards.forEach((card) => {
    // First cell: image
    const imageWrapper = card.querySelector('.utility-aspect-3x2');
    let imageCellContent = null;
    if (imageWrapper) {
      // Find the image inside
      const img = imageWrapper.querySelector('img');
      if (img) {
        // Add the model hint as a comment node before the image
        imageCellContent = [createModelHintComment('image'), img];
      }
    }
    // If no image found, set cell empty (no comment)
    if (!imageCellContent) imageCellContent = '';

    // Second cell: text content
    const textWrapper = card.querySelector('.utility-padding-all-1rem');
    let textCellContent = null;
    if (textWrapper) {
      // We'll include the tag(s), heading, and paragraph as a single block
      // Add the model hint as a comment node before the content
      textCellContent = [createModelHintComment('text')];
      // Tag group (optional)
      const tagGroup = textWrapper.querySelector('.tag-group');
      if (tagGroup) textCellContent.push(tagGroup);
      // Heading (optional)
      const heading = textWrapper.querySelector('h3, .h4-heading');
      if (heading) textCellContent.push(heading);
      // Paragraph (optional)
      const desc = textWrapper.querySelector('p');
      if (desc) textCellContent.push(desc);
      // Remove the hint if cell is actually empty
      if (textCellContent.length === 1) textCellContent = '';
    }
    if (!textCellContent) textCellContent = '';

    // Row for this card
    rows.push([imageCellContent, textCellContent]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
