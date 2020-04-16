import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import firebase from "../../firebase";

class RegisterForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      username: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    email: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;
    const auth = firebase.auth();
    const response = await auth.createUserWithEmailAndPassword(email, password);
    console.log(response);
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
