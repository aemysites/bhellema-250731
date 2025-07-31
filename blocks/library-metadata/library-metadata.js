import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  // Look for the block name in the first div's second child
  // const blockNameElement = block.querySelector('div:first-child > div:nth-child(2)');
  // const blockname = blockNameElement?.textContent?.trim() || 'Block Name';

  // // Look for the description in the second div's second child
  // const descEl = block.querySelector('div:nth-child(2) > div:nth-child(2)');
  // const newBlock = document.createElement('div');

  // const heading = document.createElement('h2');
  // heading.textContent = blockname;
  // newBlock.append(heading);
  // newBlock.append(descEl);

  // moveInstrumentation(block, newBlock);

  // newBlock.classList.add('library-metadata');
  // block.replaceChildren(newBlock);
}
