import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [favorites, setFavorites] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState(0);
  const [imageIndexes, setImageIndexes] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const listings = [
    {
      id: 1,
      images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800'],
      title: 'Luxury Villa',
      location: 'Bali, Indonesia',
      type: 'Entire villa',
      price: 450,
      rating: 4.95
    },
    {
      id: 2,
      images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800'],
      title: 'Beach House',
      location: 'Miami, Florida',
      type: 'Entire apartment',
      price: 180,
      rating: 4.87
    },
    {
      id: 3,
      images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'],
      title: 'Modern House',
      location: 'Los Angeles, CA',
      type: 'Entire house',
      price: 320,
      rating: 4.92
    },
    {
      id: 4,
      images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'],
      title: 'Mountain Cabin',
      location: 'Aspen, Colorado',
      type: 'Entire cabin',
      price: 280,
      rating: 4.88
    },
    {
      id: 5,
      images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'],
      title: 'Downtown Loft',
      location: 'New York, NY',
      type: 'Entire loft',
      price: 220,
      rating: 4.91
    },
    {
      id: 6,
      images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'],
      title: 'Tropical Paradise',
      location: 'Maldives',
      type: 'Entire bungalow',
      price: 550,
      rating: 4.96
    }
  ];

  const categories = ['All', 'Amazing views', 'Beachfront', 'Cabins', 'Trending', 'Luxe', 'Islands'];

  const toggleFavorite = (id) => {
    const newFavs = new Set(favorites);
    newFavs.has(id) ? newFavs.delete(id) : newFavs.add(id);
    setFavorites(newFavs);
  };

  const nextImage = (id, totalImages, e) => {
    if (e) e.stopPropagation();
    setImageIndexes(prev => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (id, totalImages, e) => {
    if (e) e.stopPropagation();
    setImageIndexes(prev => ({
      ...prev,
      [id]: ((prev[id] || 0) - 1 + totalImages) % totalImages
    }));
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">airbnb</div>
        
        {!isMobile && (
          <div className="search-bar">
            <input placeholder="Anywhere" />
            <div className="divider"></div>
            <input placeholder="Any week" />
            <div className="divider"></div>
            <input placeholder="Add guests" />
            <button className="search-btn">🔍</button>
          </div>
        )}
        
        <div className="user-menu">
          {!isMobile && <button>Airbnb your home</button>}
          <button>🌐</button>
          <button className="profile">☰ 👤</button>
        </div>
        
        {isMobile && (
          <div className="search-bar">
            <input placeholder="Search" />
            <button className="search-btn">🔍</button>
          </div>
        )}
      </header>

      {/* Categories */}
      <div className="categories">
        {categories.map((cat, i) => (
          <button 
            key={i} 
            className={activeCategory === i ? 'active' : ''} 
            onClick={() => setActiveCategory(i)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Listings */}
      <div className="listings">
        {listings.map(item => {
          const currentImg = imageIndexes[item.id] || 0;
          return (
            <div key={item.id} className="card">
              <div className="img-box">
                <img 
                  src={item.images[currentImg]} 
                  alt={item.title} 
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800?text=Image+Not+Available';
                  }}
                />
                <button 
                  className={`fav ${favorites.has(item.id) ? 'active' : ''}`} 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                  aria-label="Add to favorites"
                >
                  {favorites.has(item.id) ? '❤️' : '🤍'}
                </button>
                {item.images.length > 1 && (
                  <>
                    <button 
                      className="nav prev" 
                      onClick={(e) => prevImage(item.id, item.images.length, e)}
                      aria-label="Previous image"
                    >
                      ‹
                    </button>
                    <button 
                      className="nav next" 
                      onClick={(e) => nextImage(item.id, item.images.length, e)}
                      aria-label="Next image"
                    >
                      ›
                    </button>
                    <div className="dots">
                      {item.images.map((_, i) => (
                        <span 
                          key={i} 
                          className={i === currentImg ? 'active' : ''}
                          onClick={(e) => {
                            e.stopPropagation();
                            setImageIndexes(prev => ({ ...prev, [item.id]: i }));
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="info">
                <div className="top">
                  <div>
                    <h3>{item.title}</h3>
                    <p className="loc">{item.location}</p>
                  </div>
                  <div className="rating">⭐ {item.rating}</div>
                </div>
                <p className="type">{item.type}</p>
                <p className="price"><strong>${item.price}</strong> night</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;