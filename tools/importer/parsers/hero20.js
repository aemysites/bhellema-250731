/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Hero (hero20)'];

  // --------- Extract background images -----------
  // Get all the images that are used in the visual collage background.
  let bgImagesContainer = null;
  // This structure may be deeply nested, so search for the collage container
  const gridWrappers = element.querySelectorAll('.grid-layout.desktop-3-column');
  if (gridWrappers.length > 0) {
    bgImagesContainer = gridWrappers[0];
  }

  let bgImages = [];
  if (bgImagesContainer) {
    bgImages = Array.from(bgImagesContainer.querySelectorAll('img'));
  }

  // We'll wrap the background images in a div for semantic grouping
  let bgImagesDiv = null;
  if (bgImages.length > 0) {
    bgImagesDiv = document.createElement('div');
    bgImagesDiv.className = 'hero-background-images';
    bgImages.forEach(img => {
      bgImagesDiv.appendChild(img);
    });
  }

  // --------- Extract content: heading, subheading, buttons -----------
  // The main content is inside a container with class 'container small-container ...'
  let contentContainer = element.querySelector('.container.small-container');
  let contentElements = [];
  if (contentContainer) {
    // Grab the heading, subheading, and CTA group as they appear
    // Keep the original tags for styling/semantics
    const h1 = contentContainer.querySelector('h1');
    if (h1) contentElements.push(h1);
    const subheading = contentContainer.querySelector('p');
    if (subheading) contentElements.push(subheading);
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) contentElements.push(buttonGroup);
  }

  // --------- Construct the hero block table -----------
  const rows = [
    headerRow,
    [bgImagesDiv], // row 2: background image(s)
    [contentElements] // row 3: title, subtitle, CTA(s)
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
