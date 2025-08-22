/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (container for columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children of the grid for left and right columns
  const gridChildren = grid.querySelectorAll(':scope > *');
  if (gridChildren.length < 2) return;

  // --- LEFT COLUMN ---
  // Collect ALL content blocks in the left column (not just heading/subheading/button)
  const leftCol = gridChildren[0];
  let leftContent = [];
  // Use all child nodes preserving order/text
  leftCol.childNodes.forEach((node) => {
    // Only push elements or meaningful text nodes (not whitespace)
    if (node.nodeType === Node.ELEMENT_NODE) {
      leftContent.push(node);
    } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      // Wrap in a <span> to preserve text nodes
      const span = document.createElement('span');
      span.textContent = node.textContent;
      leftContent.push(span);
    }
  });
  // Defensive: If no content found, fallback to textContent
  if (leftContent.length === 0 && leftCol.textContent.trim()) {
    leftContent.push(leftCol.textContent.trim());
  }

  // --- RIGHT COLUMN ---
  // Use the image for the right column
  const rightCol = gridChildren[1];
  let rightContent = [];
  if (rightCol.tagName === 'IMG') {
    rightContent.push(rightCol);
  } else {
    // Find all images inside rightCol (in case of wrappers)
    const imgs = rightCol.querySelectorAll('img');
    imgs.forEach(img => rightContent.push(img));
    // Defensive: If no image, add text content
    if (rightContent.length === 0 && rightCol.textContent.trim()) {
      rightContent.push(rightCol.textContent.trim());
    }
  }

  // Compose table rows
  const headerRow = ['Columns (columns15)'];
  const contentRow = [leftContent, rightContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow, contentRow
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
