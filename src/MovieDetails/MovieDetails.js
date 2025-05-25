import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieDetail({history}) {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=29cf44b93ca83bf48d9356395476f7ad&append_to_response=credits,videos`
                );
                setMovie(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="alert alert-danger m-5">
            Error: {error}
            <button className="btn btn-sm btn-outline-danger ms-3" onClick={() => window.location.reload()}>
                Retry
            </button>
        </div>
    );

    if (!movie) return <div className="alert alert-warning m-5">No movie found</div>;

    // Format runtime
    const formatRuntime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    // Get director
    const director = movie.credits?.crew.find(person => person.job === 'Director');
    // Get top 5 cast members
    const topCast = movie.credits?.cast.slice(0, 5);
    // Get trailer
    const trailer = movie.videos?.results.find(video => video.type === 'Trailer');

    return (
        <div className="movie-detail-page">
            {/* Hero Section with Backdrop */}
            <div 
                className="position-relative vh-100 d-flex align-items-end"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-4 mb-4 mb-md-0">
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                alt={movie.title}
                                className="img-fluid rounded-4 shadow-lg"
                                style={{ border: '5px solid white' }}
                            />
                        </div>
                        <div className="col-md-8 text-white">
                            <h1 className="display-3 fw-bold mb-3">{movie.title} 
                                <span className="text-muted ms-3 fs-4">({new Date(movie.release_date).getFullYear()})</span>
                            </h1>
                            
                            <div className="d-flex flex-wrap gap-2 mb-4">
                                <span className="badge bg-primary fs-6">
                                    ★ {movie.vote_average.toFixed(1)}/10
                                </span>
                                {movie.genres.map(genre => (
                                    <span key={genre.id} className="badge bg-secondary fs-6">
                                        {genre.name}
                                    </span>
                                ))}
                                <span className="badge bg-light text-dark fs-6">
                                    {formatRuntime(movie.runtime)}
                                </span>
                            </div>

                            <h4 className="fst-italic text-warning mb-4">"{movie.tagline}"</h4>
                            
                            <h3 className="mb-3">Overview</h3>
                            <p className="fs-5 mb-4">{movie.overview}</p>
                            
                            {director && (
                                <p className="fs-5">
                                    <span className="fw-bold">Director: </span>
                                    {director.name}
                                </p>
                            )}

                            {trailer && (
                                <button 
                                    className="btn btn-danger btn-lg mt-3 me-3"
                                    onClick={() => window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank')}
                                >
                                    ▶ Watch Trailer
                                </button>
                            )}
                            
                            <button 
                                className="btn btn-outline-light btn-lg mt-3"
                                onClick={() => history.goBack()}
                            >
                                ← Back to Movies
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Details Section */}
            <div className="bg-dark text-white py-5">
                <div className="container">
                    <div className="row">
                        {/* Cast Section */}
                        <div className="col-md-6 mb-5 mb-md-0">
                            <h2 className="border-bottom border-warning pb-2 mb-4">Top Cast</h2>
                            <div className="row">
                                {topCast?.map(person => (
                                    <div key={person.id} className="col-6 col-md-4 mb-4">
                                        <div className="text-center">
                                            <img 
                                                src={person.profile_path 
                                                    ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                                                    : 'https://via.placeholder.com/200x300?text=No+Image'}
                                                alt={person.name}
                                                className="img-fluid rounded-circle mb-2 shadow"
                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                            />
                                            <h5 className="mb-1">{person.name}</h5>
                                            <p className="text-muted small">{person.character}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Facts Section */}
                        <div className="col-md-6">
                            <h2 className="border-bottom border-warning pb-2 mb-4">Movie Facts</h2>
                            <ul className="list-unstyled fs-5">
                                <li className="mb-3">
                                    <span className="fw-bold text-warning">Status: </span>
                                    {movie.status}
                                </li>
                                <li className="mb-3">
                                    <span className="fw-bold text-warning">Release Date: </span>
                                    {new Date(movie.release_date).toLocaleDateString()}
                                </li>
                                <li className="mb-3">
                                    <span className="fw-bold text-warning">Original Language: </span>
                                    {movie.original_language.toUpperCase()}
                                </li>
                                <li className="mb-3">
                                    <span className="fw-bold text-warning">Budget: </span>
                                    ${movie.budget.toLocaleString()}
                                </li>
                                <li className="mb-3">
                                    <span className="fw-bold text-warning">Revenue: </span>
                                    ${movie.revenue.toLocaleString()}
                                </li>
                                {movie.homepage && (
                                    <li className="mb-3">
                                        <span className="fw-bold text-warning">Website: </span>
                                        <a href={movie.homepage} target="_blank" rel="noopener noreferrer" className="text-white">
                                            Official Site
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Production Companies */}
            {movie.production_companies?.length > 0 && (
                <div className="bg-black py-5">
                    <div className="container">
                        <h2 className="text-white border-bottom border-warning pb-2 mb-4">Production Companies</h2>
                        <div className="row g-4">
                            {movie.production_companies.map(company => (
                                <div key={company.id} className="col-6 col-md-3 col-lg-2">
                                    <div className="bg-dark p-3 rounded text-center h-100">
                                        {company.logo_path ? (
                                            <img 
                                                src={`https://image.tmdb.org/t/p/w200${company.logo_path}`} 
                                                alt={company.name}
                                                className="img-fluid"
                                                style={{ maxHeight: '80px', objectFit: 'contain' }}
                                            />
                                        ) : (
                                            <p className="text-white m-0">{company.name}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieDetail;