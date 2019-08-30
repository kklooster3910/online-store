import React from 'react';
import {ApolloConsumer} from 'react-apollo';
import { Link } from 'react-router-dom';
import { Query } from "react-apollo";
import Queries from "../graphql/queries";
const { IS_LOGGED_IN } = Queries;

const Nav = props => {
    // debugger;
    return (
        <ApolloConsumer>
        {client => (
          
          <Query query={IS_LOGGED_IN}>
          {({ data }) => {
            if (data.isLoggedIn) {
                // console.log(data)
                // console.log(client)
              return (
                <div>
                    <div>Current User: {localStorage.getItem("name")} </div>
                <button
                  onClick={e => {
                    e.preventDefault();
                    localStorage.removeItem("auth-token");
                    client.writeData({ data: { isLoggedIn: false } });
                    props.history.push("/");
                  }}
                >
                  Logout
                </button>
                  </div>
              );
            } else {
              return (
                <div>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </div>
              );
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
  );
};

export default Nav;
