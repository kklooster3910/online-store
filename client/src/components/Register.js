import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Mutations from '../graphql/mutations';
const { REGISTER_USER } = Mutations;

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    // console.log(data);
    // here we can write directly to our cache with our returned mutation data
    client.writeData({
      data: { isLoggedIn: data.register.loggedIn },
      // name: data.register.name
    });
  }

  render() {
    //   debugger;
    return (
      <Mutation
        mutation={REGISTER_USER}
        onCompleted={data => {
        //   console.log(data);
          const { token, name } = data.register;
          localStorage.setItem("auth-token", token);
          localStorage.setItem("name", name);
           //setting token into auth-token of localstorage
          this.props.history.push("/"); //redirecting to homepage afterwards
        }}
        update={(client, data) => this.updateCache(client, data)} //update gets trigger on success of mutation
      >
        {(
          registerUser //references mutation mentioned above
        ) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                registerUser({
                  variables: {
                    //arguments to be passed into mutation
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name
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
                value={this.state.name}
                onChange={this.update("name")}
                placeholder="Name"
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

export default Register