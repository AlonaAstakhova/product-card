fetch('./data.json')
  .then((results) => results.json())
  .then((data) => {
    let sizeList = []
    let colorList = []
    let disColorList = []
    let firstColor = ''
    const prices = {}

    //ЗАДАНИЕ:
    //переписать список размеров и цветов на Set

    //Формируем списки всех существующих размеров и цветов
    data.forEach((el) => {
      const size = el.size.value
      const color = el.color.value

      if (!sizeList.includes(size)) {
        sizeList = [...sizeList, el.size.value]
      }
      if (!colorList.includes(color)) {
        colorList = [...colorList, el.color.value]
      }
    })

    //Сортируем размеры от XS к XL создаем и выводим кнопки
    const sizeMap = {
      XS: 1,
      S: 2,
      M: 3,
      L: 4,
      XL: 5,
    }

    sizeList
      .sort((a, b) => sizeMap[a] - sizeMap[b])
      .forEach((size) => {
        const button = document.createElement('button')
        button.className = 'size'
        button.textContent = size
        button.setAttribute('data-value', size)
        const divSize = document.querySelector("[data-js='size']")
        divSize.append(button)
      })

    // Создаем и выводим кнопки цветов
    colorList.forEach((color) => {
      const button = document.createElement('button')
      button.className = 'color'
      button.textContent = color
      button.setAttribute('data-value', color)
      const divColor = document.querySelector("[data-js='color']")
      divColor.append(button)
    })

    //Делаем активной первую существующую кнопку размера
    const firstSize = sizeList.sort((a, b) => sizeMap[a] - sizeMap[b])[0]
    const atrSize = `[data-value='${firstSize}']`
    const divSizes = document.querySelector('.sizes').querySelector(atrSize)
    divSizes.classList.add('active')

    //находим первый достуный цвет и собираем данные о цене
    function frColor(data, firstSize) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].size.value === firstSize && data[i].qty > 0) {
          firstColor = data[i].color.value
          prices['validPrice'] = data[i].valid_price
          prices['inValidPrice'] = data[i].invalid_price
          break
        }
      }

      //Делаем активной кнопку цвета, который доступен для первого cуществующего размера
      const atrColor = `[data-value='${firstColor}']`
      const divColors = document
        .querySelector('.colors')
        .querySelector(atrColor)
      divColors.classList.add('active')
    }

    frColor(data, firstSize)

    //находим и составляем список недоступных цветов для первого cуществующего размера
    function disabledColor(data, firstSize) {
      let colorListFirstSize = []
      data.forEach((el, i) => {
        if (el.size.value === firstSize && data[i].qty > 0) {
          if (!colorListFirstSize.includes(el.color.value)) {
            colorListFirstSize = [...colorListFirstSize, el.color.value]
          }
        }
        disColorList = colorList.filter(
          (el) => !colorListFirstSize.includes(el)
        )
      })

      //Делаем неактивными кнопки цветов, которые недоступны для первого cуществующего размера и устанавливаем "disabled"
      disColorList.forEach((disColor) => {
        const atrDisColor = `[data-value='${disColor}']`
        const divDisColors = document
          .querySelector('.colors')
          .querySelector(atrDisColor)
        divDisColors.classList.add('disabled')
      })
    }

    disabledColor(data, firstSize)

    //Устанавливаем цену
    function price() {
      document.querySelector('.price').textContent = '$ ' + prices.validPrice

      if (prices.validPrice !== prices.inValidPrice) {
        document.querySelector('.price-before').textContent =
          '$ ' + prices.inValidPrice
      }
      // else {
      // document.querySelector('.price-before').textContent =
      //   '$ ' + prices.inValidPrice
      // document.querySelector('.price-before').style.color = 'rgb(255,255,255)'
      // document.querySelector('.price-before').style.textDecoration = 'none'
      // }
    }

    price()

    //Обработка клика клиента по кнопкам размера
    const onButtonSize = (event) => {
      let sizeClick = event.target.dataset.value
      if (sizeClick) {
        //снять активный статус с других кнопок, снять статус disabled
        document.querySelectorAll('.size').forEach((size) => {
          size.classList.remove('active')
        })
        document.querySelectorAll('.color').forEach((color) => {
          color.classList.remove('disabled')
          color.classList.remove('active')
        })
        //убрать цены
        document.querySelector('.price-before').textContent = ''
        document.querySelector('.price').textContent = ''
        //ставим активный статус на выбраную кнопку
        document
          .querySelector(`[data-value='${sizeClick}']`)
          .classList.add('active')
        //на втором наборе опций проверяем какие опции доступны и на недоступные ставим disabled
        disabledColor(data, sizeClick)
        //находим первую доступную опцию во втором ряду и делаем ее активной
        frColor(data, sizeClick)
        //показываем цены для выбранного размера и цвета
        price()
      }
    }
    document
      .querySelector("[data-js='size']")
      .addEventListener('click', onButtonSize)

    //Обработка клика клиента по кнопкам размера
    const onButtonColor = (event) => {
      let colorClick = event.target.dataset.value
      if (colorClick) {
        //убрать цены
        document.querySelector('.price-before').textContent = ''
        document.querySelector('.price').textContent = ''

        if (
          !document
            .querySelector(`[data-value='${colorClick}']`)
            .classList.contains('disabled')
        ) {
          //снять активный статус с других кнопок цвета
          document.querySelectorAll('.color').forEach((color) => {
            color.classList.remove('active')
          })
          //ставим активный статус на выбраную кнопку
          document
            .querySelector(`[data-value='${colorClick}']`)
            .classList.add('active')
        }
        //находим верную цену для выбранного цвета и размера
        document.querySelectorAll('.size').forEach((size) => {
          if (size.classList.contains('active')) {
            data.filter((el) => {
              if (
                el.color.value === colorClick &&
                el.size.value === size.textContent
              ) {
                prices['validPrice'] = el.valid_price
                prices['inValidPrice'] = el.invalid_price
              }
            })
          }
        })
        //показываем цены для выбранного размера и цвета
        price()
      }
    }
    document
      .querySelector("[data-js='color']")
      .addEventListener('click', onButtonColor)
  })

  .catch((error) => console.log(error))
