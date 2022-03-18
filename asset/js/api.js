class Api {
  async getData(category, pageNum, option) {
    // Setup API
    if (!category) {
      category = '11035567'
    }
    let SHOPEE_APP_URL = 'shopee.p.rapidapi.com'
    let SHOPEE_APP_DOMAIN = 'shopee.vn'
    let SHOPEE_APP_KEY = '2e8d812fc8msh9be74e4ebba0071p1b7890jsnac481eb9b2d1'
    let pageSize = 50

    const getProducts = await fetch(
      `https://${SHOPEE_APP_URL}/${SHOPEE_APP_DOMAIN}/category/${category}/list-items?limit=${pageSize}&offset=${
        pageSize + pageNum
      }${option && `&sort_by=${option}`}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': `${SHOPEE_APP_URL}`,
          'x-rapidapi-key': `${SHOPEE_APP_KEY}`,
        },
      }
    )

    const dataProducts = await getProducts.json()

    const products = dataProducts.data.items

    return {
      products,
    }
  }
}
