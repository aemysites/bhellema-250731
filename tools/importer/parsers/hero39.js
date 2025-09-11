/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing visual and content
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // --- Row 2: Image ---
  // The image cell is the first child of the grid
  const imageHolder = grid.children[0];
  const imageEl = imageHolder.querySelector('img');
  let imageCell = '';
  if (imageEl) {
    const pic = document.createElement('picture');
    pic.appendChild(imageEl);
    // Add field hint for model property 'image'
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(' field:image '));
    frag.appendChild(pic);
    imageCell = frag;
  }

  // --- Row 3: Content (heading, paragraph, button) ---
  // The content cell is the second child of the grid
  const contentHolder = grid.children[1];
  let textCellFrag = document.createDocumentFragment();
  let hasContent = false;

  // Find heading
  const h1 = contentHolder.querySelector('h1');
  if (h1) {
    textCellFrag.appendChild(document.createComment(' field:text '));
    textCellFrag.appendChild(h1);
    hasContent = true;
  }

  // Find subheading paragraph
  const subParagraph = contentHolder.querySelector('p');
  if (subParagraph) {
    if (hasContent) textCellFrag.appendChild(document.createElement('br'));
    textCellFrag.appendChild(subParagraph);
    hasContent = true;
  }

  // Find CTA/button
  const cta = contentHolder.querySelector('.button-group a');
  if (cta) {
    if (hasContent) textCellFrag.appendChild(document.createElement('br'));
    textCellFrag.appendChild(cta);
    hasContent = true;
  }

  // Table header should match block name exactly
  const headerRow = ['Hero (hero39)'];
  const tableRows = [
    headerRow,
    [imageCell || ''],
    [hasContent ? textCellFrag : '']
  ];

  // Build the table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
