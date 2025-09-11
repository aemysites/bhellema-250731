/* global WebImporter */
export default function parse(element, { document }) {
  // --- HEADER ROW ---
  const headerRow = ['Hero (hero20)'];

  // --- BACKGROUND IMAGE COLLAGE ---
  let imageCell = null;
  const collageGrid = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout');
  if (collageGrid) {
    // Collect all images and reference the actual elements (not clones)
    const imgs = collageGrid.querySelectorAll('img');
    if (imgs.length > 0) {
      const figure = document.createElement('figure');
      imgs.forEach(img => figure.appendChild(img)); // direct references
      // Add model field hint for 'image'
      const comment = document.createComment(' field:image ');
      imageCell = [comment, figure];
    }
  }
  if (!imageCell) imageCell = [''];

  // --- TEXT, SUBHEADING, CTA ---
  let textCell = null;
  const content = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (content) {
    const parts = [];
    // Heading
    const h1 = content.querySelector('h1');
    if (h1) parts.push(h1);
    // Subheading
    const subheading = content.querySelector('p');
    if (subheading) parts.push(subheading);
    // CTA group
    const ctaGroup = content.querySelector('.button-group');
    if (ctaGroup) parts.push(ctaGroup);
    // Add model field hint for 'text'
    const comment = document.createComment(' field:text ');
    textCell = [comment, ...parts];
  }
  if (!textCell) textCell = [''];

  // --- TABLE ASSEMBLY ---
  const rows = [
    headerRow,
    [imageCell],
    [textCell],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
