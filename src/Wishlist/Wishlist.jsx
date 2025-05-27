import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import MovieCard from "../MovieCard/MovieCard";

function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist);

  return (
    <div>
      <h1 className="text-center py-5">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="text-center py-5">
          <h4>Your wishlist is empty</h4>
          <p>Add movies to your wishlist by clicking the heart icon</p>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} xl={4} className='g-4'>
          {wishlist.map((movie) => (
            <Col key={movie.id}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Wishlist;