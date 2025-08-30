import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

const Main: React.FC = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  
  const categories = [
    { name: '펜션', icon: '/images/inn_icon.png', category: 'pension' },
    { name: '카페', icon: '/images/cafe_icon.svg', category: 'cafe' },
    { name: '미용', icon: '/images/restaurant_icon.svg', category: 'grooming' },
    { name: '동물병원', icon: '/images/hospital_icon.svg', category: 'hospital' },
    { name: '놀이터', icon: '/images/playground_icon.svg', category: 'playground' },
    { name: '유치원', icon: '/images/kindergarten.svg', category: 'kindergarden' },
  ];

  const bannerImages = [
    '/images/banner1.jpg',
    '/images/banner2.jpg',
    '/images/banner3.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  return (
    <div className="main-page">
      <header>
        <section className="banner-slider">
          <div className="banner-container">
            {bannerImages.map((image, index) => (
              <img 
                key={index}
                className={`banner-img ${index === currentBanner ? 'active' : ''}`}
                src={image} 
                alt={`배너 ${index + 1}`} 
              />
            ))}
          </div>
        </section>
      </header>

      <section className="container">
        <section className="category">
          {categories.map((category) => (
            <Link
              key={category.category}
              to={`/aroundme?category=${category.category}`}
              className="category-item"
            >
              <img src={category.icon} alt={category.name} />
              <p>{category.name}</p>
            </Link>
          ))}
        </section>

        <section className="news">
          <h2>산책갈까 소식</h2>
          <article>
            {/* 뉴스 컨텐츠가 필요한 경우 여기에 추가 */}
          </article>
        </section>
      </section>
    </div>
  );
};

export default Main;