import React, { Component } from "react";
import BooksList from "./booksList";
import Genres from "./genres";
import Search from "./common/search";
import http from "./services/httpService";
import { paginate } from "./services/pagination";
import Pagination from "./common/pagination";

class Books extends Component {
  state = {
    genres: [],
    books: [],
    selectedGenre: "allGenres",
    search: "",
    currentPage: 1,
    pageSize: 3,
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

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, search: "" });

    console.log(this.state.selectedGenre);
  };

  handleSearch = (query) => {
    this.setState({ search: query, selectedGenre: "allGenres" });
    console.log(this.state.search);
  };

  getPageData = () => {
    const { selectedGenre, search, books, currentPage, pageSize } = this.state;

    let filtered = books;
    if (search) {
      filtered = books.filter((b) =>
        b.name.toLowerCase().startsWith(search.toLowerCase())
      );
    } else if (!search && selectedGenre !== "allGenres") {
      filtered = books.filter((b) => b.genre.name === selectedGenre);
    }

    const allBooks = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, allBooks };
  };

  render() {
    const { genres, selectedGenre, search, currentPage, pageSize } = this.state;
    const { totalCount, allBooks } = this.getPageData();

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

            <BooksList books={allBooks} />

            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Books;
