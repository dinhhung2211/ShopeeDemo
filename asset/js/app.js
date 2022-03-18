window.addEventListener('DOMContentLoaded', async () => {
  const ui = new Ui()
  const dataCate = new Category()
  const loading = document.querySelector('.loading')
  try {
    const { products } = await new Api().getData('', 0, '')
    const category = dataCate.getCategory()

    ui.addProductToCart(products)
    ui.renderCategory(category.data.categories)
    ui.renderCategoryMobile(category.data.categories)
    ui.renderProduct(products)
    ui.renderPagination(document.getElementById('pagination'), {
      size: 30, // pages size
      page: 1, // selected page
      step: 1, // pages before and after current
    })
    ui.renderMiniPagination(document.querySelector('.mini-page-controller'), {
      size: 30, // pages size
      page: 1, // selected page
      step: 1, // pages before and after current
    })
    loading.parentElement.removeChild(loading)
    console.log('ok')
  } catch (error) {
    console.log('fail')
  }
  // Click add to cart
  document
    .querySelector('.search-item-result__items')
    .addEventListener('click', (event) => {
      if (event.target.classList.contains('add-to-cart')) {
        event.preventDefault()
        const productId = event.target.dataset.product_id
        const product = new Product(productId)
        console.log(product)
        const storage = new Storage()
        storage.addProductToCart(product)
        ui.addProductToCart()
      }
    })
})

// Click Category
document
  .querySelector('.category-list__body')
  .addEventListener('click', (event) => {
    if (event.target.classList.contains('category-list__category-link')) {
      const iconSelected = document.createElement('i')
      iconSelected.className = 'fas fa-caret-right'

      const actived = document.querySelector('.category-link--active')
      actived.classList.remove('category-link--active')
      document.querySelector('.fa-caret-right').remove()

      event.target.classList.add('category-link--active')
      event.target.prepend(iconSelected)

      const category = event.target.dataset.id
      console.log(category)
      const ui = new Ui()

      // add ui loading products
      const loadingProducts = document.createElement('div')
      loadingProducts.className = 'loading-products'

      const loadingOverlay = document.createElement('div')
      loadingOverlay.className = 'loading-products__overlay'

      const htmlLoading = `<div class="la-ball-pulse la-dark">
          <div></div>
          <div></div>
          <div></div>
      </div>`

      loadingOverlay.innerHTML = htmlLoading
      loadingProducts.appendChild(loadingOverlay)

      document
        .querySelector('.sort-bar')
        .parentNode.insertBefore(
          loadingProducts,
          document.querySelector('.sort-bar')
        )

      const getProducts = async () => {
        try {
          const { products } = await new Api().getData(category, 1, '')
          ui.renderProduct(products)
          ui.renderPagination(document.getElementById('pagination'), {
            size: 30, // pages size
            page: 1, // selected page
            step: 1, // pages before and after current
          })
          loadingProducts.remove()
          console.log('đã vào')
        } catch (error) {
          console.log('fail')
        }
      }
      getProducts()
    }
  })

// Click Category Mobile
document
  .querySelector('.mobile-category__body')
  .addEventListener('click', (event) => {
    if (
      event.target.parentElement.classList.contains('category-item__img') ||
      event.target.classList.contains('category-item__title')
    ) {
      const category = event.target.parentNode.closest('.mobile-category__item')
        .dataset.id
      console.log(category)
      const ui = new Ui()

      // add ui loading products
      const loadingProducts = document.createElement('div')
      loadingProducts.className = 'loading-products'

      const loadingOverlay = document.createElement('div')
      loadingOverlay.className = 'loading-products__overlay'

      const htmlLoading = `<div class="la-ball-pulse la-dark">
          <div></div>
          <div></div>
          <div></div>
      </div>`

      loadingOverlay.innerHTML = htmlLoading
      loadingProducts.appendChild(loadingOverlay)

      document
        .querySelector('.sort-bar')
        .parentNode.insertBefore(
          loadingProducts,
          document.querySelector('.sort-bar')
        )

      const getProducts = async () => {
        try {
          const { products } = await new Api().getData(category, 1, '')
          ui.renderProduct(products)
          ui.renderPagination(document.getElementById('pagination'), {
            size: 30, // pages size
            page: 1, // selected page
            step: 1, // pages before and after current
          })
          loadingProducts.remove()
          console.log('đã vào')
        } catch (error) {
          console.log('fail')
        }
      }
      getProducts()
    }
  })

//  Click pagination
document.getElementById('pagination').addEventListener('click', (event) => {
  const pageNum = document
    .querySelector('.btn-solid.btn-primary')
    .textContent.trim()
  const category = document.querySelector('.category-link--active').dataset.id
  const ui = new Ui()

  // add ui loading products
  const loadingProducts = document.createElement('div')
  loadingProducts.className = 'loading-products'

  const loadingOverlay = document.createElement('div')
  loadingOverlay.className = 'loading-products__overlay'

  const htmlLoading = `<div class="la-ball-pulse la-dark">
      <div></div>
      <div></div>
      <div></div>
  </div>`

  loadingOverlay.innerHTML = htmlLoading
  loadingProducts.appendChild(loadingOverlay)

  document
    .querySelector('.sort-bar')
    .parentNode.insertBefore(
      loadingProducts,
      document.querySelector('.sort-bar')
    )

  const getProducts = async () => {
    try {
      const { products } = await new Api().getData(category, pageNum, '')
      ui.renderProduct(products)
      loadingProducts.remove()
      console.log('đã vào')
    } catch (error) {
      console.log('fail')
    }
  }
  getProducts()
})

// Click mini pagination
document
  .querySelector('.mini-page-controller')
  .addEventListener('click', (event) => {
    const pageNum = document
      .querySelector('.mini-page-controller__current')
      .textContent.trim()
    const category = document.querySelector('.category-link--active').dataset.id
    const ui = new Ui()

    // add ui loading products
    const loadingProducts = document.createElement('div')
    loadingProducts.className = 'loading-products'

    const loadingOverlay = document.createElement('div')
    loadingOverlay.className = 'loading-products__overlay'

    const htmlLoading = `<div class="la-ball-pulse la-dark">
      <div></div>
      <div></div>
      <div></div>
  </div>`

    loadingOverlay.innerHTML = htmlLoading
    loadingProducts.appendChild(loadingOverlay)

    document
      .querySelector('.sort-bar')
      .parentNode.insertBefore(
        loadingProducts,
        document.querySelector('.sort-bar')
      )

    const getProducts = async () => {
      try {
        const { products } = await new Api().getData(category, pageNum, '')
        ui.renderProduct(products)
        loadingProducts.remove()
        console.log('đã vào')
      } catch (error) {
        console.log('fail')
      }
    }
    getProducts()
  })

document.querySelectorAll('.sort-by-options__option').forEach((optionList) => {
  optionList.addEventListener('click', (event) => {
    let option = ''
    const category = document.querySelector('.category-link--active').dataset.id
    const ui = new Ui()
    if (event.target.classList.contains('relevancy-option')) {
      const selected = document.querySelector(
        '.sort-by-options__option--selected'
      )
      selected.classList.remove('sort-by-options__option--selected')
      event.target.classList.add('sort-by-options__option--selected')
      option = 'relevancy'
    } else if (event.target.classList.contains('newest-option')) {
      const selected = document.querySelector(
        '.sort-by-options__option--selected'
      )
      selected.classList.remove('sort-by-options__option--selected')
      event.target.classList.add('sort-by-options__option--selected')
      option = 'newest'
    } else if (event.target.classList.contains('most_sales-option')) {
      const selected = document.querySelector(
        '.sort-by-options__option--selected'
      )
      selected.classList.remove('sort-by-options__option--selected')
      event.target.classList.add('sort-by-options__option--selected')
      option = 'most_sales'
    }

    // add ui loading products
    const loadingProducts = document.createElement('div')
    loadingProducts.className = 'loading-products'

    const loadingOverlay = document.createElement('div')
    loadingOverlay.className = 'loading-products__overlay'

    const htmlLoading = `<div class="la-ball-pulse la-dark">
        <div></div>
        <div></div>
        <div></div>
    </div>`

    loadingOverlay.innerHTML = htmlLoading
    loadingProducts.appendChild(loadingOverlay)

    document
      .querySelector('.sort-bar')
      .parentNode.insertBefore(
        loadingProducts,
        document.querySelector('.sort-bar')
      )

    const getProducts = async () => {
      try {
        const { products } = await new Api().getData(category, 0, option)
        ui.renderProduct(products)
        loadingProducts.remove()
        console.log('đã vào')
      } catch (error) {
        console.log('fail')
      }
    }
    getProducts()
  })
})

// hover price option
const priceOption = document.querySelector('.select-with-status')
priceOption.addEventListener('mouseenter', (event) => {
  priceOption.classList.add('select-with-status--hover')
})

priceOption.addEventListener('mouseleave', (event) => {
  priceOption.classList.remove('select-with-status--hover')
})

document
  .querySelectorAll('.select-with-status__dropdown-item')
  .forEach((price) => {
    price.addEventListener('click', (event) => {
      let option = ''
      const category = document.querySelector('.category-link--active').dataset
        .id
      const ui = new Ui()
      if (event.target.classList.contains('lowest_price')) {
        option = 'lowest_price'
      } else if (event.target.classList.contains('highest_price')) {
        option = 'highest_price'
      }

      // add ui loading products
      const loadingProducts = document.createElement('div')
      loadingProducts.className = 'loading-products'

      const loadingOverlay = document.createElement('div')
      loadingOverlay.className = 'loading-products__overlay'

      const htmlLoading = `<div class="la-ball-pulse la-dark">
        <div></div>
        <div></div>
        <div></div>
    </div>`

      loadingOverlay.innerHTML = htmlLoading
      loadingProducts.appendChild(loadingOverlay)

      document
        .querySelector('.sort-bar')
        .parentNode.insertBefore(
          loadingProducts,
          document.querySelector('.sort-bar')
        )

      const getProducts = async () => {
        try {
          const { products } = await new Api().getData(category, 0, option)
          ui.renderProduct(products)
          loadingProducts.remove()
          console.log('đã vào')
        } catch (error) {
          console.log('fail')
        }
      }
      getProducts()
    })
  })
