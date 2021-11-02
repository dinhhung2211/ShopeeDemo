class Api {
  async getData(category, pageNum) {
    if (category === null || category === undefined || category === '') {
      category = 'Áo Croptop'
    }
    let pageSize = 50

    const getKeywords = fetch(
      `https://shopee-product.herokuapp.com/api/v1.0/keywords`
    ).then((res) =>
      res.json().then((json) => {
        if (res.ok) {
          return json
        }
        throw json.message
      })
    )

    const getProducts = fetch(
      `https://shopee-product.herokuapp.com/api/v1.0/products?key_word=${category}&limit=${pageSize}&newest=${pageNum}`
    ).then((res) =>
      res.json().then((json) => {
        if (res.ok) {
          return json
        }
        throw json.message
      })
    )

    const [keywords, products] = await Promise.all([getKeywords, getProducts])
    return {
      keywords,
      products,
    }
  }
}
