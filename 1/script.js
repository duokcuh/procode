const multiply = arr => arr.reduce((a, b) => a * b);

const isFitting = (box, item) => !box.some((_, idx) => box[idx] < item[idx]);

const getBoxes = (qty, [min, max]) => {
  //emulation of getting boxes
  const boxes = [];
  for (; qty; qty--) {
    let box = [];
    for (let d = 0; d < 3; d++) {
      box.push(Math.floor((Math.random() * (max - min + 1))) + min);
    }
    boxes.push(box.sort((a, b) => a - b));
  }
  
  return boxes;
}

const getBestPrice = item => {
  item.sort((a, b) => a - b);
  const boxes = getBoxes(3, [10, 100]);
  console.log('boxes: ', boxes);
  console.log('box prices: ', boxes.map(elem => multiply(elem)));
  const bestPrice = boxes.reduce((best, cur) => (isFitting(cur, item) && multiply(cur) < best)
    ? multiply(cur)
    : best, Infinity);
  return (isFinite(bestPrice)
    ? (bestPrice / 100).toFixed(2) + ' UAH. Pay and enjoy:)'
    : 'No matching box. Just forget:)');
  
}

const itemSize = document.getElementById('item-size');
itemSize.addEventListener('submit', event => {
  event.preventDefault();
  
  const item = [];
  const sizes = itemSize.querySelectorAll('.form-control');
  sizes.forEach(elem => item.push(elem.value));
  
  const boxPrice = document.getElementById('box-price');
  boxPrice.textContent = getBestPrice(item);
});