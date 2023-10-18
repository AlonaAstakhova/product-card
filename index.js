fetch('./data.json')
  .then((results) => results.json())
  .then((data) => {
    let arrSize = []
    let arrColor = []

    data.forEach((el) => {
      const size = el.size.value
      const color = el.color.value
      if (!arrSize.includes(size)) {
        arrSize = [...arrSize, el.size.value]
      }
      if (!arrColor.includes(color)) {
        arrColor = [...arrColor, el.color.value]
      }
    })

    function sizeList(arrSize, elSize) {
      const sizeMap = {
        XS: 1,
        S: 2,
        M: 3,
        L: 4,
        XL: 5,
      }
      // debugger
      arrSize
        .sort((a, b) => sizeMap[a] - sizeMap[b])
        .forEach((size) => {
          const button = document.createElement('button')
          button.className = 'size'
          button.textContent = size
          // console.log(elSize.size.value)
          //   if (elSize.size.value == undefined) {
          //     button.className += ' active'
          //   }
          const divSize = document.querySelector("[data-js='size']")
          divSize.append(button)
        })
    }

    function colorList(arrColor) {
      arrColor.forEach((color) => {
        const button = document.createElement('button')
        button.className = 'color'
        button.textContent = color
        // button.className += ' active'
        // button.className += ' disabled'
        const divSize = document.querySelector("[data-js='color']")
        divSize.append(button)
      })
    }

    let values = ''
    data.map((el, i) => {
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
                      <h2 class="price" id="valid_price">${
                        '$ ' + el.valid_price
                      }</h2>
                      <p class="description">Best protection from the hot sun!</p>
                      <p class="instock"> In stock </p>
                      <div class="sizes" >
                         <span>Size:</span>
                         ${sizeList(arrSize, el)}
                      </div>
                      <div class="colors" >
                        <span>Color:</span>
                        ${colorList(arrColor)}
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

    //     document.querySelector('.instock').style.backgroundColor = 'rgb(255, 0, 0)'
  })
  .catch((error) => console.log(error))
