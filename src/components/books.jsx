import React, { Component } from "react";
import ItemsList from "./itemsList";
import Genres from "./genres";
import Search from "./common/search";
import http from "../services/httpService";
import auth from "../services/authService";
import { paginate } from "../services/pagination";
import Pagination from "./common/pagination";

class Books extends Component {
  state = {
    genres: [],
    books: [],
    selectedGenre: "allGenres",
    search: "",
    currentPage: 1,
    pageSize: 3,
    user: null,
  };

  async componentDidMount() {
    await this.getUser();
    this.getData();
  }

  getUser() {
    return new Promise(async (resolve) => {
      const user = await auth.getCurrentUser();
      this.setState({ user });
      resolve();
    });
  }

  async getGenres() {
    const genres = await http.get("genres");
    this.setState({
      genres: Object.values(genres),
    });
  }

  async getBooks() {
    var books = await http.get("books");
    books = Object.values(books);

    if (this.state.user) {
      const fl = this.state.user.favouriteList;
      books.forEach((book) => (book.liked = fl.indexOf(book.id) !== -1));
    }
    books.forEach((book) => {
      switch (book.genreId) {
        case 1:
          return (book.genreName = "Adventure");
        case 2:
          return (book.genreName = "Fantasy");
        case 3:
          return (book.genreName = "History");
        case 4:
          return (book.genreName = "Romance");
        case 5:
          return (book.genreName = "Science");
      }
    });

    this.setState({
      books: books,
    });
  }

  async getData() {
    const genres = await http.get("genres");
    var books = await http.get("books");
    books = Object.values(books);
    books.forEach((book) => {
      book.genreName = genres[book.genreId].name;
    });

    if (this.state.user) {
      const fl = this.state.user.favouriteList;
      books.forEach((book) => (book.liked = fl.indexOf(book.id) !== -1));
    }
    this.setState({
      genres: Object.values(genres),
      books,
    });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleLike = (book) => {
    const books = [...this.state.books];
    const index = books.indexOf(book);
    books[index] = { ...books[index] };
    books[index].liked = !books[index].liked;
    const updatedUser = this.updateUserLikedList(books[index]);
    this.setState({ books, updatedUser });
  };

  updateUserLikedList = (book) => {
    const user = { ...this.state.user };
    const likedList = user.favouriteList;
    const index = likedList.indexOf(book.id);
    const uid = auth.getToken();

    book.liked ? likedList.push(book.id) : likedList.splice(index, 1);
    http.post("users", uid, user);
    return user;
  };

  handleGenreSelect = (genre) => {
    if (genre === "allGenres") {
      this.setState({ selectedGenre: genre, search: "", currentPage: 1 });
    }
    this.setState({ selectedGenre: genre, search: "" });
  };

  handleSearch = (query) => {
    this.setState({ search: query, selectedGenre: "allGenres" });
  };

  getPageData = () => {
    const { selectedGenre, search, books, currentPage, pageSize } = this.state;

    let filtered = books;
    if (this.props.favourite) filtered = filtered.filter((book) => book.liked);
    if (search) {
      filtered = filtered.filter((b) =>
        b.name.toLowerCase().startsWith(search.toLowerCase())
      );
    } else if (!search && selectedGenre !== "allGenres") {
      filtered = filtered.filter((b) => b.genreName === selectedGenre);
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

            <ItemsList books={allBooks} onLike={this.handleLike} />

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
