import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Books from "./books";
import FavouriteBooks from "./favouriteBooks";
import NotFound from "./notFound";
import AdminPage from "./adminPage";
import LoginForm from "./auth/loginForm";
import RegisterForm from "./auth/registerForm";
import Logout from "./auth/logout";

const Router = () => {
  return (
    <main className="container">
      <div className="content">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />

          <Route path="/favourite-books" component={FavouriteBooks} />
          <Route path="/books" component={Books} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/" component={Books} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </main>
  );
};

export default Router;
