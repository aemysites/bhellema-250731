/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the slides
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all slides (divs with an img)
  const slides = Array.from(grid.children).filter((child) => child.querySelector('img'));

  // Always use the required header row
  const headerRow = ['Carousel (carousel16)'];
  const rows = [headerRow];

  slides.forEach((slide) => {
    const img = slide.querySelector('img');
    if (!img) return;
    // Per spec, must always have TWO columns: first image, second text (empty if none)
    rows.push([img, '']);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
