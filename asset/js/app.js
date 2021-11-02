// let category

window.addEventListener('DOMContentLoaded', async () => {
  const ui = new Ui()
  const loading = document.querySelector('.loading')
  try {
    const { keywords, products } = await new Api().getData('', 1)
    ui.addProductToCart()
    ui.renderCategory(keywords)
    ui.renderProduct(products.items)
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
      const ui = new Ui()
      // const loading = document.querySelector('.loading')
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
          const { products } = await new Api().getData(category, 1)
          ui.renderProduct(products.items)
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
  const category = document
    .querySelector('.category-link--active')
    .textContent.trim()
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
      const { products } = await new Api().getData(category, pageNum)
      ui.renderProduct(products.items)
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
    const category = document
      .querySelector('.category-link--active')
      .textContent.trim()
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
        const { products } = await new Api().getData(category, pageNum)
        ui.renderProduct(products.items)
        loadingProducts.remove()
        console.log('đã vào')
      } catch (error) {
        console.log('fail')
      }
    }
    getProducts()
  })
