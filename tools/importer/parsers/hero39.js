/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Get top-level grid layout children
  const gridChildren = element.querySelectorAll(':scope > div.w-layout-grid > div');

  // Find image section (usually contains the background image)
  let imageSection = null;
  let textSection = null;
  if (gridChildren.length === 2) {
    imageSection = gridChildren[0];
    textSection = gridChildren[1];
  } else {
    // Fallback: Look for image and text by heuristics
    gridChildren.forEach((child) => {
      if (child.querySelector('img')) imageSection = child;
      if (child.querySelector('h1, p, .button-group')) textSection = child;
    });
  }

  // Defensive: Get the background image (first img in imageSection)
  let imageEl = null;
  if (imageSection) {
    imageEl = imageSection.querySelector('img');
  }

  // Defensive: Get heading, paragraph, CTA from textSection
  let headingEl = null;
  let paragraphEl = null;
  let ctaEl = null;
  if (textSection) {
    headingEl = textSection.querySelector('h1, h2, h3, h4, h5, h6');
    paragraphEl = textSection.querySelector('p');
    // Find call-to-action link
    const ctaGroup = textSection.querySelector('.button-group');
    if (ctaGroup) {
      ctaEl = ctaGroup.querySelector('a');
    }
  }

  // Compose content cell for text section
  const contentCell = [];
  if (headingEl) contentCell.push(headingEl);
  if (paragraphEl) contentCell.push(paragraphEl);
  if (ctaEl) contentCell.push(ctaEl);

  // Compose the table rows
  const rows = [
    ['Hero (hero39)'], // header row
    [imageEl ? imageEl : ''], // image row
    [contentCell], // text + CTA row
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
