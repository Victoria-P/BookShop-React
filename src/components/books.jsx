import React, { Component } from "react";
import BooksList from "./booksList";
import Genres from "./genres";

class Books extends Component {
  state = {
    genres: [],
    books: [],
    selectedGenre: "allGenres",
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre });

    console.log(this.state.selectedGenre);
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-3 m-2">
            <Genres
              genres={this.state.genres}
              selectedGenre={this.state.selectedGenre}
              onItemSelected={this.handleGenreSelect}
            />
          </div>
          <div className="col m-2">
            <BooksList books={this.state.books} />
          </div>
        </div>
      </div>
    );
  }
}

export default Books;
