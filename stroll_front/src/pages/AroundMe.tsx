import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { placeAPI } from '../services/api';
import { Place, SearchParams } from '../types';
import KakaoMap from '../components/KakaoMap';
import './AroundMe.css';

interface AroundMeProps {
  user?: { id: string; nickname: string } | null;
}

const AroundMe: React.FC<AroundMeProps> = ({ user }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [myLocation, setMyLocation] = useState('내 위치:');
  const [filters, setFilters] = useState({
    maxDistance: parseInt(searchParams.get('maxDistance') || '50'),
    minStar: parseInt(searchParams.get('minStar') || '0'),
  });
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedOrder, setSelectedOrder] = useState(searchParams.get('order') || 'distance');

  const categories = [
    { name: '전체', value: '' },
    { name: '펜션', value: 'pension' },
    { name: '카페', value: 'cafe' },
    { name: '미용', value: 'grooming' },
    { name: '동물병원', value: 'hospital' },
    { name: '놀이터', value: 'playground' },
    { name: '유치원', value: 'kindergarden' },
  ];

  const orderOptions = [
    { name: '거리 순', value: 'distance' },
    { name: '별점 순', value: 'star' },
  ];

  useEffect(() => {
    fetchPlaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const params: SearchParams = {
        keywords: searchParams.get('keywords') || undefined,
        address: searchParams.get('address') || undefined,
        category: searchParams.get('category') || undefined,
        order: (searchParams.get('order') as 'distance' | 'star') || 'distance',
        maxDistance: parseInt(searchParams.get('maxDistance') || '50'),
        minStar: parseInt(searchParams.get('minStar') || '0'),
        x: parseFloat(searchParams.get('x') || '0'),
        y: parseFloat(searchParams.get('y') || '0'),
        page: parseInt(searchParams.get('page') || '1'),
      };

      const response = await placeAPI.getPlaces(params);
      setPlaces(response.places);
    } catch (error) {
      console.error('장소 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    updateSearchParams({ category, page: '1' });
  };

  const handleOrderClick = (order: string) => {
    setSelectedOrder(order);
    updateSearchParams({ order, page: '1' });
  };

  const handleFilterChange = (filterType: 'maxDistance' | 'minStar', value: number) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleFilterSubmit = () => {
    updateSearchParams({
      maxDistance: filters.maxDistance.toString(),
      minStar: filters.minStar.toString(),
      page: '1',
    });
  };

  const updateSearchParams = (newParams: Record<string, string>) => {
    const current = Object.fromEntries(searchParams);
    const updated = { ...current, ...newParams };
    
    // 빈 값들 제거
    Object.keys(updated).forEach(key => {
      if (!updated[key] || updated[key] === '0') {
        delete updated[key];
      }
    });
    
    setSearchParams(updated);
  };

  const handleLocationSet = (address: string, x: number, y: number) => {
    setMyLocation(`내 위치: ${address}`);
    updateSearchParams({
      address,
      x: x.toString(),
      y: y.toString(),
      page: '1',
    });
    setShowMap(false);
  };

  return (
    <div className="aroundme-page">
      <header>
        <div className="container">
          <h1>내 주변</h1>
          <p>
            <span>{myLocation}</span>
            <button 
              className="location-btn btn-primary"
              onClick={() => setShowMap(true)}
            >
              내 위치 설정
            </button>
          </p>
        </div>
      </header>

      <div className="container">
        <div className="content-wrapper">
          {/* 카테고리 필터 */}
          <ul className="category-ul">
            {categories.map((category) => (
              <li
                key={category.value}
                className={selectedCategory === category.value ? 'selected' : ''}
                onClick={() => handleCategoryClick(category.value)}
              >
                {category.name}
              </li>
            ))}
            {user && (
              <Link to="/newplace" className="add-new-place-btn btn-primary">
                새 장소 등록
              </Link>
            )}
          </ul>

          <div className="main-content">
            {/* 사이드 필터 */}
            <aside className="side-filter">
              <div className="distance-filter">
                <label>거리</label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={filters.maxDistance}
                  onChange={(e) => handleFilterChange('maxDistance', parseInt(e.target.value))}
                  className="filter-slider"
                />
                <p>내 주변 {filters.maxDistance}00m 이하</p>
              </div>

              <div className="star-filter">
                <label>별점</label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={filters.minStar}
                  onChange={(e) => handleFilterChange('minStar', parseInt(e.target.value))}
                  className="filter-slider"
                />
                <p>★{filters.minStar}개 이상</p>
              </div>

              <button 
                className="submit-btn btn-primary"
                onClick={handleFilterSubmit}
              >
                다시 찾기
              </button>
            </aside>

            {/* 결과 영역 */}
            <section className="result-contents">
              {/* 정렬 옵션 */}
              <ul className="order-by-ul">
                {orderOptions.map((option) => (
                  <li
                    key={option.value}
                    className={selectedOrder === option.value ? 'selected' : ''}
                    onClick={() => handleOrderClick(option.value)}
                  >
                    {option.name}
                  </li>
                ))}
              </ul>

              {/* 결과 목록 */}
              {loading ? (
                <div className="loading">
                  <div className="spinner" />
                </div>
              ) : (
                <ul className="results">
                  {places.map((place) => (
                    <li key={place.no}>
                      <Link to={`/detail?no=${place.no}`}>
                        <img
                          className="place-img"
                          src={`/api/resources/upload/imgs/${place.no}_1.jpg`}
                          alt={place.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'http://placehold.it/180x240';
                          }}
                        />
                        <div>
                          <p>
                            <span className="place-name">{place.title}</span>
                            {place.distance && (
                              <span className="distance">{place.distance}m</span>
                            )}
                          </p>
                          <p>{place.address} {place.detailAddress}</p>
                          <p className="star">★ {place.star}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {/* 페이지네이션 */}
              <div className="paging-div">
                {/* 페이지네이션 로직은 백엔드 응답에 따라 구현 */}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* 카카오 맵 모달 */}
      {showMap && (
        <KakaoMap
          onLocationSelect={handleLocationSet}
          onClose={() => setShowMap(false)}
        />
      )}
    </div>
  );
};

export default AroundMe;