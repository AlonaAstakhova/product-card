fetch('./data.json')
  .then((results) => results.json())
  .then((data) => {
    let values = ''
    data.map((el) => {
      let invalid_price = ''
      if (el.invalid_price !== el.valid_price) {
        invalid_price = '$ ' + el.invalid_price
      }

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
              <p class="instock">In stock</p>
              <div class="choice-list">
                <span>Size:</span>
                <button class="choice active">s</button>
                <button class="choice">m</button>
                <button class="choice">l</button>
                <button class="choice">xl</button>
              </div>
              <div class="color-list">
                <span>Color:</span>
                <button class="choice disabled">black</button>
                <button class="choice">blue</button>
                <button class="choice">khaki</button>
                <button class="choice">green</button>
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
