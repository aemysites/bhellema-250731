import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  Array.from(block.children).forEach((child, index) => {
    // Remove the first <div> if it's a direct child
    const firstDiv = child.querySelector('div');
    if (firstDiv && firstDiv.parentElement === child) {
      // child.removeChild(firstDiv);
      // hide the first div
      firstDiv.style.display = 'none';
    }

    if (index === 0) {
      const nextDiv = child.querySelector('div');
      if (nextDiv && nextDiv.parentElement === child) {
        const h2 = document.createElement('h2');
        h2.innerHTML = nextDiv.innerHTML;
        child.replaceChild(h2, nextDiv);
      }
    }
  });
}
