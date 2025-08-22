/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Locate the card-body (defensive)
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // 2. Image extraction (mandatory)
  const image = cardBody.querySelector('img');

  // 3. Heading extraction (optional)
  const heading = cardBody.querySelector('.h4-heading');

  // 4. Second cell: build array, keep DOM references, preserve semantics
  const textCell = [];
  if (heading) textCell.push(heading);
  // (No additional paragraphs, lists, or CTA in this example)

  // 5. Table assembly
  const rows = [];
  rows.push(['Carousel (carousel21)']); // Block header, must match exactly
  rows.push([
    image,
    textCell.length ? textCell : ''
  ]);

  // 6. Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // 7. Replace element with table
  element.replaceWith(table);
}