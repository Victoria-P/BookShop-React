import React, { Component } from "react";
import BooksList from "./booksList";
import Genres from "./genres";
import Search from "./common/search";
import http from "./services/httpService";

class Books extends Component {
  state = {
    genres: [],
    books: [],
    selectedGenre: "allGenres",
    search: "",
  };

  componentDidMount() {
    this.getGenres();
    this.getBooks();
  }

  async getGenres() {
    const genres = await http.get("genres");
    this.setState({
      genres: Object.values(genres),
    });
  }

  async getBooks() {
    const books = await http.get("books");
    this.setState({
      books: Object.values(books),
    });
  }

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre });

    console.log(this.state.selectedGenre);
  };

  handleSearch = (query) => {
    this.setState({ search: query });
    console.log(this.state.search);
  };

  render() {
    const { genres, selectedGenre, search, books } = this.state;

    const searched = books.filter((b) =>
      b.name.startsWith(search.toLowerCase())
    );

    return (
      <div>
        <div className="row">
          <div className="col-3 m-2">
            <Genres
              genres={genres}
              selectedGenre={selectedGenre}
              onItemSelected={this.handleGenreSelect}
            />
          </div>
          <div className="col m-2">
            <Search value={search} onChange={this.handleSearch} />

            <BooksList books={searched ? searched : books} />
          </div>
        </div>
      </div>
    );
  }
}

export default Books;
