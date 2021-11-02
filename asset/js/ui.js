// window.addEventListener('DOMContentLoaded', () => {
//   document.getElementById('popup').classList.add('popup')
//   let html = `
//     <div class="popup__overlay"></div>
//     <div class="popup__body">
//         <a href="#" class="popup__link">
//             <img class="popup__img" src="./asset/img/popup.png">
//         </a>
//         <div class="popup__close-btn">
//             <i class="far fa-times-circle close-btn"></i>
//         </div>
//     </div>
//     `
//   document.getElementById('popup').innerHTML = html
// })

document.getElementById('popup').addEventListener('click', (event) => {
  if (event.target.classList.contains('close-btn')) {
    document.getElementById('popup').classList.remove('popup')
    document.getElementById('popup').innerHTML = ''
  }
})

// Slick
$(document).ready(function () {
  $('.slider-list').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    dots: true,
  })
})

const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

class Product {
  constructor(productId) {
    this.productId = productId
  }
}

class Ui {
  renderCategory(keywords) {
    // Category
    const _category = document.querySelector('.category-list__category')
    if (_category) {
      _category.remove()
    }
    const category = document.createElement('div')
    category.className = 'category-list__category'

    const categorys = keywords.reduce((result, current) => {
      result += `
        <div class="category-list__category-link" data-id="${current.keyword}">
          ${current.keyword}
        </div>
        `
      return result
    }, '')

    category.innerHTML = `${categorys}`

    // Set style and icon for first category
    category
      .getElementsByTagName('div')[0]
      .classList.add('category-link--active')
    const iconSelected = document.createElement('i')
    iconSelected.className = 'fas fa-caret-right'
    category.getElementsByTagName('div')[0].prepend(iconSelected)

    document.querySelector('.category-list__body').appendChild(category)
  }

  renderProduct(products) {
    // Product
    const _product = document.querySelector('.search-item-result__items')
    if (_product) {
      _product.remove()
    }

    const product = document.createElement('div')
    product.className = 'search-item-result__items'

    function itemBage(discount) {
      if (discount !== 'null') {
        const box = document.createElement('div')
        box.className = 'item-badge-box'

        const item = document.createElement('div')
        item.className = 'item-badge'

        const discountPer = document.createElement('span')
        discountPer.className = 'discount-percent'
        let discountPerValue = document.createTextNode(discount)
        discountPer.appendChild(discountPerValue)

        const discountText = document.createElement('span')
        discountText.className = 'discount-percent__text'
        let discountTextValue = document.createTextNode('giảm')
        discountText.appendChild(discountTextValue)

        box.appendChild(item)
        item.appendChild(discountPer)
        item.appendChild(discountText)

        let html = box.outerHTML

        return html
      } else {
        return ''
      }
    }

    function itemPrice(priceOriginal, priceBeforeDiscount) {
      if (priceBeforeDiscount !== 0) {
        const price = document.createElement('div')
        price.className = 'item-price-original'
        let priceValue = document.createTextNode(
          numberWithCommas(priceBeforeDiscount)
        )
        price.appendChild(priceValue)

        const priceBefore = document.createElement('div')
        priceBefore.className = 'item-price-discount'
        let priceBeforeValue = document.createTextNode(
          numberWithCommas(priceOriginal)
        )
        priceBefore.appendChild(priceBeforeValue)

        const html = price.outerHTML + priceBefore.outerHTML

        return html
      } else {
        const priceBefore = document.createElement('div')
        priceBefore.className = 'item-price-discount'
        let priceBeforeValue = document.createTextNode(
          numberWithCommas(priceOriginal)
        )
        priceBefore.appendChild(priceBeforeValue)

        const html = priceBefore.outerHTML

        return html
      }
    }

    function executeRating(value) {
      const countStar = 5

      const starDiv = document.createElement('div')
      starDiv.className = 'item-rate-star'

      const starActive = document.createElement('span')
      starActive.className = 'fa fa-star item-rate-star--checked'

      const star = document.createElement('span')
      star.className = 'fa fa-star'

      if (Math.round(value) > 0) {
        for (let i = 1; i <= Math.round(value); i++) {
          starDiv.appendChild(starActive.cloneNode(true))
        }
      }

      for (let i = 1; i <= countStar - Math.round(value); i++) {
        starDiv.appendChild(star.cloneNode(true))
      }

      const html = starDiv.outerHTML

      return html
    }

    const product_item = products.reduce((result, current) => {
      result += `
      <div class="search-item-result__item">
        <a data-sqe="link" href="">
            <div class="item-box">
                <div class="item-header">
                    <img src="https://cf.shopee.vn/file/${current.image}"
                        alt="" class="item-header__img">
                        ${itemBage(current.discount)}
                </div>
                <div class="item-body">
                    <div class="item-name">
                        ${current.name}
                    </div>
                    <div class="item-price">
                        ${itemPrice(
                          current.price,
                          current.price_before_discount
                        )}
                        <div class="item-price-icon-ship">
                            <i class="fas fa-shipping-fast"></i>
                        </div>
                    </div>
                    <div class="item-rate">
                        <div class="item-rate-farvorite">
                          <i class="fas fa-cart-plus add-to-cart" data-product_id="${
                            current.itemid
                          }"></i>
                        </div>
                        ${executeRating(current.C7)}
                        <div class="item-rate-sold">
                            Đã bán ${current.sold}
                        </div>
                    </div>
                    <div class="item-location">${current.shop_localtion}</div>
                </div>
            </div>
        </a>
      </div>
      `
      return result
    }, '')

    product.innerHTML = `${product_item}`

    document
      .querySelector('.sort-bar')
      .parentNode.insertBefore(
        product,
        document.querySelector('.sort-bar').nextSibling
      )
  }

  renderPagination(e, data) {
    let pagination = {
      size: 0,
      page: 0,
      step: 0,
      code: '',
    }

    let paginationElement

    function extend(data) {
      data = data || {}
      pagination.size = data.size || 300
      pagination.page = data.page || 1
      pagination.step = data.step || 3
    }

    function add(s, f) {
      if (s === 2 || s === 4) {
        s = 3
      }
      if (s >= 5) {
        s = s - 1
      }
      for (var i = s; i < f; i++) {
        pagination.code += '<button class="btn-no-outline">' + i + '</button>'
      }
    }

    // add last page with separator
    function last() {
      pagination.code +=
        '<button class="btn-no-outline btn-none-outline--none-click">...</button>'
    }

    // add first page with separator
    function first(s) {
      if (s >= 6) {
        pagination.code +=
          '<button class="btn-no-outline">1</button><button class="btn-no-outline">2</button><button class="btn-no-outline btn-none-outline--none-click">...</button>'
      } else {
        pagination.code +=
          '<button class="btn-no-outline">1</button><button class="btn-no-outline">2</button>'
      }
    }

    function click() {
      pagination.page = +this.innerHTML
      start()
    }

    // previous page
    function prev() {
      pagination.page--
      if (pagination.page < 1) {
        pagination.page = 1
      }
      start()
    }

    // next page
    function next() {
      pagination.page++
      if (pagination.page > pagination.size) {
        pagination.page = pagination.size
      }
      start()
    }

    // binding pages
    function bind() {
      var a = paginationElement.getElementsByTagName('button')
      for (var i = 0; i < a.length; i++) {
        if (+a[i].innerHTML === pagination.page)
          a[i].className = 'btn-solid btn-primary'
        a[i].addEventListener('click', click, false)
      }
    }

    function finish() {
      paginationElement.innerHTML = pagination.code
      pagination.code = ''
      bind()
    }

    // find pagination type
    function start() {
      if (pagination.size < pagination.step * 2 + 6) {
        add(1, pagination.size + 1)
      } else if (pagination.page < pagination.step * 2 + 1) {
        add(1, pagination.step * 2 + 4)
        last()
      } else if (pagination.page > pagination.size - pagination.step * 2) {
        first()
        add(pagination.size - pagination.step * 2 - 2, pagination.size + 1)
      } else {
        first(pagination.page)
        add(
          pagination.page - pagination.step,
          pagination.page + pagination.step + 2
        )
        last()
      }
      finish()
    }

    // binding buttons
    function buttons(e) {
      var nav = e.getElementsByTagName('button')
      nav[0].addEventListener('click', prev, false)
      nav[1].addEventListener('click', next, false)
    }

    function create(e) {
      var html = [
        `<button class="icon-btn icon-btn--left">
          <i class="fas fa-chevron-left"></i>
        </button>`, // previous button
        '<span style="display: flex;"></span>', // pagination container
        `<button class="icon-btn icon-btn--right">
          <i class="fas fa-chevron-right"></i>
        </button>`, // next button
      ]

      e.innerHTML = html.join('')
      paginationElement = e.getElementsByTagName('span')[0]
      buttons(e)
    }

    extend(data)
    create(e)
    start()
  }

  renderMiniPagination(e, data) {
    let pagination = {
      size: 0,
      page: 0,
      step: 0,
      code: '',
    }

    let paginationElement

    function extend(data) {
      data = data || {}
      pagination.size = data.size || 300
      pagination.page = data.page || 1
      pagination.step = data.step || 3
    }

    function miniPage() {
      pagination.code += `
        <span class="mini-page-controller__current">${pagination.page}</span>
        /
        <span class="mini-page-controller__total">${pagination.size}</span>`

      paginationElement.innerHTML = pagination.code
      pagination.code = ''
    }

    // previous page
    function prev() {
      pagination.page--
      if (pagination.page < 1) {
        pagination.page = 1
      }
      miniPage()
    }

    // next page
    function next() {
      pagination.page++
      if (pagination.page > pagination.size) {
        pagination.page = pagination.size
      }
      miniPage()
    }

    // binding buttons
    function buttons(e) {
      var nav = e.getElementsByTagName('button')
      nav[0].addEventListener('click', prev, false)
      nav[1].addEventListener('click', next, false)
    }

    function create(e) {
      var html = [
        `<div class="mini-page-controller__state">
          <span class="mini-page-controller__current">${pagination.page}</span>
          /
          <span class="mini-page-controller__total">${pagination.size}</span>
        </div>`,
        `<button class="btn-outline mini-page-controller__prev-btn btn-outline--disabled">
          <i class="fas fa-chevron-left"></i>
        </button>`, // previous button
        `<button class="btn-outline mini-page-controller__next-btn">
          <i class="fas fa-chevron-right"></i>
        </button>`, // next button
      ]

      e.innerHTML = html.join('')
      paginationElement = e.getElementsByTagName('div')[0]
      buttons(e)
    }

    extend(data)
    create(e)
  }

  addProductToCart() {
    const storage = new Storage()
    const products = storage.getProducts()
    if (products.length >= 1) {
      const cartNum = document.getElementById('header__cart-number')
      cartNum.classList.add('header__cart-number')
      cartNum.innerHTML = products.length
    }
  }
}

class Storage {
  getProducts() {
    return JSON.parse(localStorage.getItem('products')) || []
  }

  addProductToCart(product) {
    const products = this.getProducts()
    products.push(product)
    localStorage.setItem('products', JSON.stringify(products))
  }
}
