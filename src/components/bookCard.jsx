import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTheaterMasks, faHeart } from "@fortawesome/free-solid-svg-icons";

class BookCard extends Component {
  render() {
    const { book, onLike } = this.props;
    return (
      <div className="bookCard">
        <div className="card" style={{ maxWidth: "540px" }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={book.imageUrl} className="card-img" alt={book.name} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  {book.name} <br />
                  <span className="author">by {book.author}</span>
                </h5>
                <p className="card-text">{book.description}</p>
                <p className="card-genre">
                  <FontAwesomeIcon icon={faTheaterMasks} />
                  {book.genre.name}
                </p>
                <div className="cardLike" onClick={() => onLike(book)}>
                  <FontAwesomeIcon icon={faHeart} className="like" />
                  Add to Favourite
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookCard;
