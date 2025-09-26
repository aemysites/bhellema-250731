/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero20)'];

  // ---
  // Row 2: Background image collage
  // ---
  // Find the grid layout containing images (collage)
  const imageGrid = element.querySelector('.desktop-3-column');
  let collageImages = [];
  if (imageGrid) {
    collageImages = Array.from(imageGrid.querySelectorAll('img'));
  }

  // Create a fragment for the image collage with field hint
  let imageFrag = null;
  if (collageImages.length) {
    imageFrag = document.createDocumentFragment();
    imageFrag.appendChild(document.createComment(' field:image '));
    collageImages.forEach((img) => {
      imageFrag.appendChild(img);
    });
  }

  // ---
  // Row 3: Text overlay (headline, subheading, buttons)
  // ---
  // Find the overlay content container
  const overlayContent = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let textFrag = null;
  if (overlayContent) {
    textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));
    // Heading
    const h1 = overlayContent.querySelector('h1');
    if (h1) textFrag.appendChild(h1);
    // Subheading
    const subheading = overlayContent.querySelector('p');
    if (subheading) textFrag.appendChild(subheading);
    // Button group
    const buttonGroup = overlayContent.querySelector('.button-group');
    if (buttonGroup) textFrag.appendChild(buttonGroup);
  }

  // Build table rows
  const rows = [
    headerRow,
    [imageFrag],
    [textFrag],
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
