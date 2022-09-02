import {Component} from 'react'
import Cookies from 'js-cookie'

import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
  }

  componentDidMount() {
    console.log('component did mount called')
    this.getData()
  }

  getData = async () => {
    const url = 'https://apis.ccbp.in/products'
    const token = Cookies.get('jwt_token')
    console.log(token)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    const {products} = data

    const formattedData = products.map(eachProduct => ({
      title: eachProduct.title,
      brand: eachProduct.brand,
      id: eachProduct.id,
      price: eachProduct.price,
      imageUrl: eachProduct.image_url,
    }))

    this.setState({productsList: formattedData})
  }

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
