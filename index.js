let stock = document.querySelector('.instock')
// console.log(stock)

function stockFoo(qty) {
  if (qty === 0) {
    // stock.style.backgroundColor = 'red'
  }
}

function choice_color(p) {
  let colors = document.querySelectorAll('.choice_color')
  colors.forEach((cl) => {
    console.log(1)
    if (p === cl) {
      return (cl.className = cl.classList.add(' active'))
    }
  })
}

fetch('./data.json')
  .then((results) => results.json())
  .then((data) => {
    let values = ''
    data.map((el) => {
      let invalid_price = ''
      if (el.invalid_price !== el.valid_price) {
        invalid_price = '$ ' + el.invalid_price
      }

      stockFoo(el.qty)
      choice_color(el.color.value)

      values += ` <div class="card">
          <div class="header">
            <h1>Unusual shaped wooden shutter</h1>
            <span class="article">Article: 1238912</span>
            <hr />
          </div>
          <div class="data">
            <img class="photo" src="images/shutter.png" alt="shutter" />
            <div class="form">
              <p class="price-before" id="invalid_price">${invalid_price}</p>
              <h2 class="price" id="valid_price">${'$ ' + el.valid_price}</h2>
              <p class="description">Best protection from the hot sun!</p>
              <p class="instock" style="background-color: #b3cc05" id="instock">In stock</p>
              <div class="choice-list">
                <span>Size:</span>
                <button class="choice_size active">s</button>
                <button class="choice_size">m</button>
                <button class="choice_size">l</button>
                <button class="choice_size">xl</button>
              </div>
              <div class="color-list">
                <span>Color:</span>
                <button class="choice_color disabled" id='black'>black</button>
                <button class="choice_color" id='blue'>blue</button>
                <button class="choice_color" id='khaki'>khaki</button>
                <button class="choice_color" id='green'>green</button>
              </div>
              <button class="add-to-cart">add to cart</button>
              <div class="btn-scd">
                <button class="add">add</button>
                <button class="go">go to cart</button>
              </div>
              <p class="info">
                Delivery information: <span class="info-data">1-2 days</span>
              </p>
              <p class="info">
                Payment method:
                <span class="info-data"
                  >by credit card on the website or in cash upon receipt of the
                  goods</span
                >
              </p>
              <p class="info">
                Exchange and return: <span class="info-data">14 days</span>
              </p>
            </div>
          </div>
        </div>`
    })
    document.getElementById('cards').innerHTML = values
  })
  .catch((error) => console.log(error))
