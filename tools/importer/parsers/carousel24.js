/* global WebImporter */
export default function parse(element, { document }) {
  // Carousel (carousel24) block
  // Table header row
  const headerRow = ['Carousel (carousel24)'];

  // Find all slides
  const slides = [];
  // Defensive: support multiple slides if present
  const cardBodies = element.querySelectorAll('.card-body');

  cardBodies.forEach((cardBody) => {
    // Extract image (mandatory)
    const img = cardBody.querySelector('img');
    let imageCell = '';
    if (img) {
      // Reference the existing image element, do not clone
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(' field:media_image '));
      frag.appendChild(img);
      imageCell = frag;
    }

    // Extract text content (optional)
    // Heading is .h4-heading, description is any other text
    const heading = cardBody.querySelector('.h4-heading');
    let textCell = '';
    if (heading) {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(' field:content_text '));
      frag.appendChild(heading);
      textCell = frag;
    }

    slides.push([imageCell, textCell]);
  });

  // Compose table cells
  const cells = [headerRow, ...slides];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
