import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Row,
  Col,
  Spinner,
  Form,
  Pagination,
} from "react-bootstrap";
import MovieCard from '../MovieCard/MovieCard';

function MoviesList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const isSearching = searchQuery.trim().length > 0;
      const endpoint = isSearching
        ? "https://api.themoviedb.org/3/search/movie"
        : "https://api.themoviedb.org/3/movie/popular";

      const params = {
        api_key: "29cf44b93ca83bf48d9356395476f7ad",
        page: page,
        language: "en-US",
        include_adult: false,
        ...(isSearching && { query: searchQuery }),
      };

      const response = await axios.get(endpoint, {
        params,
        paramsSerializer: (params) =>
          Object.entries(params)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join("&"),
      });

      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
      setCurrentPage(page);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(1);
  }, []);

  const handlePageChange = (page) => {
    fetchMovies(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
// Remove these lines from MoviesList:
// const [favorites, setFavorites] = useState(new Set());
// const toggleFavorite = (movieId) => {
//   const newFavorites = new Set(favorites);
//   if (newFavorites.has(movieId)) {
//     newFavorites.delete(movieId);
//   } else {
//     newFavorites.add(movieId);
//   }
//   setFavorites(newFavorites);
// };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies(1);
  };

  if (loading && currentPage === 1) {
    return (
      <Container-fluid className='text-center py-5'>
        <Spinner animation='border' variant='danger' />
        <h4 className='mt-3 text-white'>Loading movies...</h4>
      </Container-fluid>
    );
  }

  if (error) {
    return (
      <Container-fluid className='py-5'>
        <div className='alert alert-danger'>Error: {error}</div>
        <Button variant='danger' onClick={() => fetchMovies()}>
          Retry
        </Button>
      </Container-fluid>
    );
  }

  return (
    <Container-fluid className='py-4' style={{ backgroundColor: "#111" }}>
      <div
        className='mb-5 p-4 rounded-3 shadow'
        style={{
          backgroundColor: "rgba(30, 30, 30, 0.8)",
          border: "1px solid rgba(255, 190, 11, 0.2)",
        }}
      >
        <Form onSubmit={handleSubmit} className='mb-4'>
          <div className='d-flex my-3'>
            <Form.Control
              type='text'
              placeholder='Search for movies...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='me-2'
            />
            <Button variant='warning' type='submit'>
              Search
            </Button>
          </div>
        </Form>
      </div>

      <Row xs={1} md={2} lg={3} xl={4} className='g-4'>
        {movies.map((movie) => (
          <Col key={movie.id}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <div className='d-flex justify-content-center mt-5'>
          <Pagination>
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {currentPage > 2 && (
              <Pagination.Item
                onClick={() => handlePageChange(currentPage - 2)}
              >
                {currentPage - 2}
              </Pagination.Item>
            )}
            {currentPage > 1 && (
              <Pagination.Item
                onClick={() => handlePageChange(currentPage - 1)}
              >
                {currentPage - 1}
              </Pagination.Item>
            )}
            <Pagination.Item active>{currentPage}</Pagination.Item>
            {currentPage < totalPages && (
              <Pagination.Item
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {currentPage + 1}
              </Pagination.Item>
            )}
            {currentPage < totalPages - 1 && (
              <Pagination.Item
                onClick={() => handlePageChange(currentPage + 2)}
              >
                {currentPage + 2}
              </Pagination.Item>
            )}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}
    </Container-fluid>
  );
}

export default MoviesList;