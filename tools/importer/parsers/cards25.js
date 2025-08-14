/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Check that element exists
  if (!element || !document) return;

  // Helper: Extract a card's image and its content (title + description)
  function extractCard(cardEl) {
    // Find first image in card
    const img = cardEl.querySelector('img');
    // Find heading (h3) and paragraph, if available
    const heading = cardEl.querySelector('h3');
    const description = cardEl.querySelector('p');
    // Build content cell: h3 above p, if present
    const contentParts = [];
    if (heading) contentParts.push(heading);
    if (description) contentParts.push(description);
    // Defensive: If neither h3 nor p, fallback to all text
    if (contentParts.length === 0) {
      // Try to get all text except img
      Array.from(cardEl.childNodes).forEach((node) => {
        if (node.nodeType === 3 && node.textContent.trim()) {
          contentParts.push(document.createTextNode(node.textContent));
        }
        if (node.nodeType === 1 && node.tagName !== 'IMG') {
          contentParts.push(node);
        }
      });
    }
    return [img, contentParts];
  }

  // Get all immediate grid children
  const cards = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [];
  // Always use header row
  rows.push(['Cards (cards25)']);

  // Loop cards, skipping any that lack image
  cards.forEach((cardEl) => {
    // Only include if contains an image
    const img = cardEl.querySelector('img');
    if (img) {
      const [image, content] = extractCard(cardEl);
      // Defensive: Only add row if image and some content
      if (image && content.length > 0) {
        rows.push([image, content]);
      }
    }
  });

  // Create block table and replace element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
