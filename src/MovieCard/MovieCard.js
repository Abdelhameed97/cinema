import { Link } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../Redux/Action";


function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const isFavorite = wishlist.some((favMovie) => favMovie.id === movie.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromWishlist(movie.id));
    } else {
      dispatch(addToWishlist(movie));
    }
  };
  // Handle missing poster images
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <Card
      className='h-100 shadow-sm border-0 movie-card'
      style={{
        backgroundColor: "#1a1a1a",
        transition: "all 0.3s ease",
      }}
    >
      <div className='position-relative'>
        <Card.Img
          variant='top'
          src={posterUrl}
          alt={movie.title}
          style={{
            height: "400px",
            objectFit: "cover",
            borderBottom: "1px solid rgba(255, 190, 11, 0.2)",
          }}
        />
        <Badge
          bg='warning'
          className='position-absolute top-0 start-0 m-2 d-flex align-items-center'
          style={{ zIndex: 1 }}
        >
          <FaStar className='me-1 text-dark' />
          <span className='text-dark fw-bold'>
            {movie.vote_average?.toFixed(1) || "N/A"}
          </span>
        </Badge>
        <button
          className='position-absolute top-0 end-0 m-2 btn btn-link p-0'
          onClick={toggleFavorite}
          style={{ zIndex: 1 }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <FaHeart className='text-danger' size={24} />
          ) : (
            <FaRegHeart className='text-white' size={24} />
          )}
        </button>
      </div>

      <Card.Body className='d-flex flex-column'>
        <Card.Title className='text-white mb-2' style={{ minHeight: "48px" }}>
          {movie.title}
        </Card.Title>
        <Card.Text className='text-warning mb-2 fw-bold'>
          {movie.release_date && new Date(movie.release_date).getFullYear()}
        </Card.Text>
        <Card.Text
          className='text-white-50 mb-3 flex-grow-1'
          style={{ fontSize: "0.9rem" }}
        >
          {movie.overview?.length > 150
            ? `${movie.overview.substring(0, 150)}...`
            : movie.overview || "No overview available"}
        </Card.Text>
        <div className='mt-auto'>
          <Link
            to={`/movies/${movie.id}`}
            className='btn btn-outline-warning w-100'
            style={{
              borderColor: "#ffbe0b",
              color: "#ffbe0b",
              transition: "all 0.3s ease",
            }}
          >
            View Details
          </Link>
        </div>
      </Card.Body>

      <style>{`
        .movie-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(255, 190, 11, 0.1) !important;
        }
        .btn-outline-warning:hover {
          background-color: rgba(255, 190, 11, 0.1);
        }
      `}</style>
    </Card>
  );
}

export default MovieCard;
