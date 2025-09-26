/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to add field comment before content
  function fieldCell(fieldName, content) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${fieldName} `));
    if (content) frag.appendChild(content);
    return frag;
  }

  // --- 1. Table header row ---
  const headerRow = ['Hero'];

  // --- 2. Image row (Hero block allows image, but none present in this HTML) ---
  // No image found, so leave cell empty (no field hint for empty cell)
  const imageRow = [''];

  // --- 3. Text row (richtext: heading, subheading, CTA links) ---
  // We'll combine all text content into a single fragment for the 'text' field
  const textFrag = document.createDocumentFragment();

  // Find heading
  const heading = element.querySelector('h1');
  if (heading) textFrag.appendChild(heading);

  // Find subheading
  const subheading = element.querySelector('p');
  if (subheading) textFrag.appendChild(subheading);

  // Find CTA buttons (links)
  const buttonGroup = element.querySelector('.button-group');
  if (buttonGroup) {
    // Wrap all links in a div for layout preservation
    const ctaDiv = document.createElement('div');
    ctaDiv.className = 'button-group';
    buttonGroup.querySelectorAll('a').forEach(a => {
      ctaDiv.appendChild(a);
    });
    textFrag.appendChild(ctaDiv);
  }

  // Only add field hint if there's content
  const textRow = [textFrag.childNodes.length ? fieldCell('text', textFrag) : ''];

  // --- Assemble table ---
  const cells = [
    headerRow,
    imageRow,
    textRow
  ];

  // Create block table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
