/* global WebImporter */
export default function parse(element, { document }) {
  // --- 1. Extract all hero background images (from the image grid) ---
  const imageGrid = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  let images = [];
  if (imageGrid) {
    images = Array.from(imageGrid.querySelectorAll('img'));
  }
  // Put all images into a <div> for the background
  let backgroundDiv = null;
  if (images.length > 0) {
    backgroundDiv = document.createElement('div');
    images.forEach(img => backgroundDiv.appendChild(img));
  }

  // --- 2. Extract the hero content: heading, subheading, and CTAs ---
  const contentSection = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let contentDiv = null;
  if (contentSection) {
    contentDiv = document.createElement('div');
    // Heading (keep original node for semantic/formatting)
    const heading = contentSection.querySelector('h1');
    if (heading) contentDiv.appendChild(heading);
    // Subheading (paragraph)
    const subheading = contentSection.querySelector('p');
    if (subheading) contentDiv.appendChild(subheading);
    // CTA buttons group (links)
    const buttonGroup = contentSection.querySelector('.button-group');
    if (buttonGroup) contentDiv.appendChild(buttonGroup);
  }

  // --- 3. Assemble rows according to the specification ---
  const headerRow = ['Hero (hero20)'];
  const rows = [
    headerRow,
    [backgroundDiv],
    [contentDiv],
  ];

  // --- 4. Create the table block ---
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
