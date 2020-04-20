import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import auth from "../../services/authService";

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
    await auth.register(this.state.data);
    window.location = "/";
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Sign Up")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
