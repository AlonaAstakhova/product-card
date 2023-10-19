fetch('./data.json')
  .then((results) => results.json())
  .then((data) => {
    let sizeList = []
    let colorList = []
    let firstColor = ''
    const prices = {}

    //Формируем списки всех существующих размеров и цветов
    //ЗАДАНИЕ:
    //обработать условия если размеры и цвета не доступен к заказу
    //переписать список размеров и цветов на Set
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

    // Создаем и выводим кнопки размеров
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
    for (let i = 0; i < data.length; i++) {
      if (data[i].size.value === firstSize && data[i].qty > 0) {
        firstColor = data[i].color.value
        prices['validPrice'] = data[i].valid_price
        prices['inValidPrice'] = data[i].invalid_price
        break
      }
    }

    //Делаем активной кнопку цвета, который доступен для первого ующего размера
    const atrColor = `[data-value='${firstColor}']`
    const divColors = document.querySelector('.colors').querySelector(atrColor)
    divColors.classList.add('active')

    //Устанавливаем цену
    document.querySelector('.price').textContent = '$ ' + prices.validPrice
    if (prices.validPrice !== prices.inValidPrice) {
      document.querySelector('.price-before').textContent =
        '$ ' + prices.inValidPrice
    }
  })
  .catch((error) => console.log(error))
