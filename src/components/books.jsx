import React, { Component } from "react";
import BooksList from "./booksList";
import Genres from "./genres";

class Books extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-3 m-2">
            <Genres />
          </div>
          <div className="col m-2">
            <BooksList />
          </div>
        </div>
      </div>
    );
  }
}

export default Books;
