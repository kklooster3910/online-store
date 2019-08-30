import React from 'react';
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import AddtoCart from "./AddtoCart"
// import { Link } from 'react-router-dom';
const { FETCH_PRODUCT } = Queries;
const ProductDetail = (props) => {
  return(
    <Query query={FETCH_PRODUCT} variables={{id: props.match.params.id}}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        // debugger;
        return (
          <div>
            name: {data.product.name}
            <br />
            weight: {data.product.weight}
            <br />
            description: {data.product.description}
            <br />
            category: {data.product.category === null ? "no category" : data.product.category.name}
            <br />
            cost: {data.product.cost}
            <AddtoCart id={data.product.id} cost={data.product.cost}/>
          </div>
        );
      }}
    </Query>
  )
}

  
export default ProductDetail