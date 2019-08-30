import gql from "graphql-tag";

export default {
     FETCH_PRODUCTS: gql`
    {
        products {
            id
            name
            cost
            description
            category {
                name
                id
            }
        }
    }
    `,
     FETCH_PRODUCT: gql`
    query FetchProduct($id: ID!){
        product(_id: $id) {
            id
            name
            cost
            description
            weight
            category {
                name
                id
            }
        }
      }
    `,
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
    FETCH_CART_ITEMS: gql`
    query FetchCartItems {
      cart @client 
    }
  `
}
