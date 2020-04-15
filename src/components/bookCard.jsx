import React, { Component } from "react";
import firebase from "../firebase";

class BookCard extends Component {
  render() {
    const { book } = this.props;

    return (
      <div className="bookCard">
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={book.imageUrl} className="card-img" alt={book.name} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  {book.name} | {book.author}
                </h5>
                <p className="card-text">{book.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookCard;
