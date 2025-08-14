/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !document) return;

  const headerRow = ['Carousel (carousel16)'];

  // Find grid
  let grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  const slides = Array.from(grid.children);

  // Always two columns: image, text (empty if absent)
  const rows = slides.map((slide) => {
    const img = slide.querySelector('img');
    // Try to find possible text content associated with the slide
    let textContent = '';
    const possibleText = slide.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a');
    if (possibleText.length > 0) {
      const frag = document.createDocumentFragment();
      possibleText.forEach(node => frag.appendChild(node.cloneNode(true)));
      textContent = frag;
    }
    return [img ? img : '', textContent];
  });

  const cells = [headerRow, ...rows];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
