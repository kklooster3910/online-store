import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Mutations from '../graphql/mutations';
const { LOGIN_USER } = Mutations;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    // console.log(data);
    // here we can write directly to our cache with our returned mutation data
    // console.log(data.login)
   
    client.writeData({
      data: { isLoggedIn: data.login.loggedIn },
      // name: data.login.name 
    });
  }

  render() {
    return (
      <Mutation
        mutation={LOGIN_USER}
        onCompleted={data => {
            // console.log(data);
          const { token, name } = data.login;
          localStorage.setItem("auth-token", token);
          localStorage.setItem("name", name);
          this.props.history.push("/"); //redirecting to homepage afterwards
        }}
        update={(client, data) => this.updateCache(client, data)} //update gets trigger on success of mutation
      >
        {(
          loginUser //references mutation mentioned above
        ) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                loginUser({
                  variables: {
                    //arguments to be passed into mutation
                    email: this.state.email,
                    password: this.state.password
                  }
                });
              }}
            >
              <input
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
              />
              <input
                value={this.state.password}
                onChange={this.update("password")}
                type="password"
                placeholder="Password"
              />
              <button type="submit">Log In</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Login