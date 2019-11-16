import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const Product = props => {
  return (
    <div class="product-page">
      <div class="product-informations">
        <h1 class="product-name">{props.data.product.name}</h1>
        <Img fixed={props.data.product.localImage.childImageSharp.fixed} />
        <p>
          Channel: {props.data.product.channelCode} |{" "}
          <small>Code: {props.data.product.code}</small>
        </p>
        <p>{props.data.product.description}</p>
      </div>
      <ul>
        {props.data.allProduct.nodes.map(product => {
          return (
            <li key={product.slug}>
              <Link to={`/product/${product.slug}`}>{product.name}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Product

export const query = graphql`
  query ProductPageQuery($slug: String) {
    product(slug: { eq: $slug }) {
      code
      slug
      name
      description
      channelCode
      localImage {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fixed(width: 125, height: 125) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }

    allProduct {
      nodes {
        name
        slug
      }
    }
  }
`
