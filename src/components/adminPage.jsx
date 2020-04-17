import React, { Component } from "react";
import ItemsList from "./itemsList";
import Search from "./common/search";
import http from "../services/httpService";
import { paginate } from "../services/pagination";
import Pagination from "./common/pagination";

class AdminPage extends Component {
  state = {
    books: [],
    search: "",
    currentPage: 1,
    pageSize: 3,
  };

  componentDidMount() {
    this.getBooks();
  }

  async getBooks() {
    const books = await http.get("books");
    this.setState({
      books: Object.values(books),
    });
  }

  handleSearch = (query) => {
    this.setState({ search: query, selectedGenre: "allGenres" });
    console.log(this.state.search);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPageData = () => {
    const { search, books, currentPage, pageSize } = this.state;

    let filtered = books;
    if (search) {
      filtered = books.filter((b) =>
        b.name.toLowerCase().startsWith(search.toLowerCase())
      );
    } else {
      filtered = books;
    }

    const allBooks = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, allBooks };
  };

  render() {
    const { search, currentPage, pageSize } = this.state;
    const { totalCount, allBooks } = this.getPageData();

    return (
      <div>
        <button className="btn btn-success">New Book</button>

        <Search value={search} onChange={this.handleSearch} />

        <ItemsList books={allBooks} />

        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </div>
    );
  }
}

export default AdminPage;
