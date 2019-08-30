import React from 'react';
import {Query, ApolloConsumer} from 'react-apollo';
import Queries from '../../graphql/queries';
const {FETCH_CART_ITEMS} = Queries;

class AddtoCart extends React.Component {
  constructor(props) {
    super(props)
  }
//   updateCache(client, { data }) {
//     console.log(data)
//     client.writeData({
//      cart: data
//    })
//  }
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Query query={FETCH_CART_ITEMS} >
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;
              
              return (
                // <div></div>
                <button
                onClick={e => {
                    e.preventDefault();
                    const { cart } = client.readQuery({query: FETCH_CART_ITEMS});
                    // const { cart } = data
                    const item = { id: this.props.id, cost: this.props.cost, __typeName: "Product" }; // item to be pushed in
                    // cart.push(item)
                    // console.log(item)
                    // console.log(cart)
                    // console.log(data)
                    // console.log(something)
                    const data2 = { cart: [...cart, item]}
                    console.log(cart)
                    console.log(data)
                    console.log(data2)
                    console.log(client)
                    client.writeQuery({query: FETCH_CART_ITEMS, data2});
                    // client.writeData( { data: { data2 }} )
                    // localStorage.setItem("cart", cart)
                  }}
                >
                  Add To Cart!
                </button>
              );
            }}
          </Query>
        )}
      </ApolloConsumer>
    );
  }
}

export default AddtoCart