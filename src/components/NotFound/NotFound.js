
function NotFound({history}) {
    
    return (
        <div className="not-found-page" style={{
            background: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '2rem',
            position: 'relative'
        }}>
            {/* Curtain effect on sides */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100px',
                height: '100%',
                background: 'linear-gradient(90deg, rgba(150,0,0,0.8), transparent)',
                zIndex: 1
            }}></div>
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100%',
                background: 'linear-gradient(270deg, rgba(150,0,0,0.8), transparent)',
                zIndex: 1
            }}></div>
            
            {/* Film strip effect */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '30px',
                background: 'repeating-linear-gradient(90deg, #000, #000 20px, #333 20px, #333 40px)'
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '30px',
                background: 'repeating-linear-gradient(90deg, #000, #000 20px, #333 20px, #333 40px)'
            }}></div>
            
            {/* Main content */}
            <div style={{ 
                position: 'relative',
                zIndex: 2,
                maxWidth: '800px'
            }}>
                <h1 style={{
                    fontSize: '6rem',
                    fontWeight: 'bold',
                    color: '#ff0000',
                    textShadow: '0 0 10px rgba(255, 0, 0, 0.7)',
                    marginBottom: '1rem',
                    fontFamily: "'Arial Black', sans-serif"
                }}>404</h1>
                
                <h2 style={{
                    fontSize: '2.5rem',
                    marginBottom: '1.5rem',
                    fontFamily: "'Oswald', sans-serif",
                    textTransform: 'uppercase'
                }}>
                    <span style={{ color: '#ffcc00' }}>Movie</span> Not Found
                </h2>
                
                <p style={{
                    fontSize: '1.2rem',
                    marginBottom: '2.5rem',
                    lineHeight: '1.6'
                }}>
                    The page you're looking for has left the theater.<br />
                    Maybe it's in another dimension or got cut from the final reel.
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button 
                        onClick={() => history.goBack()}
                        style={{
                            padding: '12px 24px',
                            background: '#ff0000',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            transition: 'all 0.3s',
                            boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
                            textTransform: 'uppercase'
                        }}
                        onMouseOver={(e) => e.target.style.background = '#cc0000'}
                        onMouseOut={(e) => e.target.style.background = '#ff0000'}
                    >
                        Go Back
                    </button>
                    
                    <button 
                        onClick={() => history.push('/')}
                        style={{
                            padding: '12px 24px',
                            background: '#ffcc00',
                            color: '#000',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            transition: 'all 0.3s',
                            boxShadow: '0 0 10px rgba(255, 204, 0, 0.5)',
                            textTransform: 'uppercase'
                        }}
                        onMouseOver={(e) => e.target.style.background = '#e6b800'}
                        onMouseOut={(e) => e.target.style.background = '#ffcc00'}
                    >
                        Home Page
                    </button>
                </div>
                
                {/* Clapboard icon */}
                <div style={{
                    marginTop: '3rem',
                    fontSize: '3rem',
                    animation: 'flip 2s infinite'
                }}>
                    🎬
                </div>
            </div>
            
            {/* Add some styles for animation */}
            <style>{`
                @keyframes flip {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(10deg); }
                }
            `}</style>
        </div>
    );
}

export default NotFound;