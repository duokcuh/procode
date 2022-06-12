const App = () => {
  
  const veggies = [];
  
  const root = document.getElementById('root');
  const list = document.createElement('ul');
  const form = document.createElement('form');
  root.append(form, list);
  
  form.className = 'row g-3 my-3';
  form.innerHTML = `
  <div class="col-auto">
    <input type="text" class="form-control" id="inputVeggie" placeholder="Input veggie" name="new-veggie">
  </div>
  <div class="col-auto">
    <button type="submit" class="btn btn-primary">Add to list</button>
  </div>
  `;
  
  form.onsubmit = ev => {
    ev.preventDefault();
    veggies.push(new FormData(form).get('new-veggie'));
    document.getElementById('inputVeggie').value = '';
    list.innerHTML = veggies.map(elem => (`<li>${elem}</li>`)).join('');
  };
}

App();
