import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  // Look for the block name in the first div's second child
  const blockNameElement = block.querySelector('div:first-child > div:nth-child(2)');
  const blockname = blockNameElement?.textContent?.trim() || 'Block Name';

  // Look for the description in the second div's second child
  const descriptionElement = block.querySelector('div:nth-child(2) > div:nth-child(2)');

  const newBlock = document.createElement('div');
  const descriptionBlock = document.createElement('div');
  descriptionBlock.innerHTML = descriptionElement.innerHTML;

  moveInstrumentation(descriptionElement, descriptionBlock);

  newBlock.innerHTML = `<h2>${blockname}</h2>${descriptionElement.outerHTML}`;
  newBlock.classList.add('library-metadata');
  block.replaceChildren(newBlock);
}
