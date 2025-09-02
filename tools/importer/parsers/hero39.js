/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !document) return;

  // 1. HEADER ROW: block name (must be exact)
  const headerRow = ['Hero (hero39)'];

  // 2. IMAGE ROW: extract background image
  let imageCell = '';
  const imageEl = element.querySelector('img.cover-image');
  if (imageEl) {
    // Use the existing image element reference
    imageCell = [document.createComment(' field:image '), imageEl];
  } else {
    imageCell = '';
  }

  // 3. TEXT ROW: headline, paragraphs, CTA
  let textCell = '';
  const textContainer = element.querySelector('.container');
  if (textContainer) {
    const frag = document.createDocumentFragment();

    // Headline (h1)
    const h1 = textContainer.querySelector('h1');
    if (h1) frag.appendChild(h1);

    // Paragraph(s)
    const ps = textContainer.querySelectorAll('p');
    ps.forEach(p => frag.appendChild(p));

    // CTA button/link
    const cta = textContainer.querySelector('a.button');
    if (cta) frag.appendChild(cta);

    // Only add content if we actually have anything
    if (frag.childNodes.length > 0) {
      textCell = [document.createComment(' field:text '), frag];
    } else {
      textCell = '';
    }
  } else {
    textCell = '';
  }

  // Compose table: ensure each row after header has ONLY ONE column
  const table = [
    headerRow,
    [imageCell],
    [textCell]
  ];

  // Replace element with import table
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
