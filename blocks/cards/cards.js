import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div, index) => {
      if (index === 0) {
        // First column: style - apply the text content as a class name
        // first column contains name of the block, and style of the block
        // eg, "card, dark"
        const styleClass = div.textContent?.trim().toLowerCase().replace(',', '');
        if (styleClass) {
          li.className = styleClass;
        }
        div.remove(); // Remove the style column from the DOM
      } else if (index === 1 && div.children.length === 1 && div.querySelector('picture')) {
        // Second column: image
        div.className = 'cards-card-image';
      } else {
        // Third column: text content
        div.className = 'cards-card-body';
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
