/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get the background image (first image in the grid)
  function getBackgroundImage() {
    const grid = element.querySelector('.w-layout-grid.grid-layout');
    if (!grid) return null;
    const img = grid.querySelector('img');
    return img || null;
  }

  // Helper: Get content for the hero block (feature image + headings + list + cta)
  function getHeroContent() {
    // The content is inside .card-body .w-layout-grid (3col/1col)
    const grid = element.querySelector('.card-body .w-layout-grid');
    if (!grid) return '';
    const featureImg = grid.querySelector('img');
    const textArea = grid.querySelector('div[id^="w-node-"]');
    // Compose a DOM fragment containing all main content in order
    const frag = document.createDocumentFragment();
    if (featureImg) frag.appendChild(featureImg);
    if (textArea) {
      // Headline
      const heading = textArea.querySelector('h2');
      if (heading) frag.appendChild(heading);
      // List and text rows
      const flexVertical = textArea.querySelector('.flex-vertical');
      if (flexVertical) {
        // Each flex-horizontal is an icon+text row
        const items = flexVertical.querySelectorAll('.flex-horizontal');
        if (items.length) {
          const ul = document.createElement('ul');
          items.forEach(item => {
            const text = item.querySelector('p');
            if (text) {
              const li = document.createElement('li');
              li.textContent = text.textContent.trim();
              ul.appendChild(li);
            }
          });
          frag.appendChild(ul);
        }
      }
      // CTA button
      const cta = textArea.querySelector('.button-group a.button');
      if (cta) {
        const btn = document.createElement('a');
        btn.href = cta.href;
        btn.textContent = cta.textContent.trim();
        btn.className = 'button';
        frag.appendChild(btn);
      }
    }
    return frag.childNodes.length ? frag : '';
  }

  const headerRow = ['Hero (hero12)'];
  const bgImg = getBackgroundImage();
  const bgImgRow = [bgImg ? bgImg : ''];
  const heroContent = getHeroContent();
  const contentRow = [heroContent ? heroContent : ''];

  const rows = [headerRow, bgImgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
