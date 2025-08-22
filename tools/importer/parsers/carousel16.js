/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container inside the section
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct child slide wrappers
  const slides = Array.from(grid.children);
  if (!slides.length) return;

  // Prepare table rows: header row first (exactly one column)
  const rows = [ ['Carousel (carousel16)'] ];

  // For each slide, extract the image. Only add a second column if text content is present.
  slides.forEach(slide => {
    const img = slide.querySelector('img');
    // There is no textual content for these slides in the HTML, so only one column per row
    if (img) rows.push([img]);
  });

  // Create the table block using WebImporter utility
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
