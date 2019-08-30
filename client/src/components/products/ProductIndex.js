import React from 'react';
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { Link } from 'react-router-dom';
const { FETCH_PRODUCTS } = Queries;

const ProductIndex = () => {
  return(
    <Query query={FETCH_PRODUCTS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        // debugger;
        return (
          <ul>
            {data.products.map(product => (
              <li key={product.id}>
                <Link to={`/product/${product.id}`}> {product.name}</Link>
                <br />
                description: {product.description}
                <br />
                category:{" "}
                {product.category === null
                  ? "no category"
                  : product.category.name}
                {/* category: {product.category.name} */}
                <br />
                cost: {product.cost}
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
  )
}

  
export default ProductIndex