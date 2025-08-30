import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { myPageAPI, userAPI } from '../services/api';
import { Place, Reply } from '../types';
import './MyPage.css';

interface MyPageProps {
  user?: { id: string; nickname: string } | null;
  onUserChange: (user: any) => void;
}

const MyPage: React.FC<MyPageProps> = ({ user, onUserChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentList = searchParams.get('list') || 'wishList';

  const [places, setPlaces] = useState<Place[]>([]);
  const [reviews, setReviews] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawPassword, setWithdrawPassword] = useState('');

  const menuItems = [
    { id: 'wishList', name: '내가 찜한 장소', path: 'wishList' },
    { id: 'myPlaces', name: '내 장소', path: 'myPlaces' },
    { id: 'reviews', name: '내 리뷰', path: 'reviews' },
  ];

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchMyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentList, user, navigate]);

  const fetchMyData = async () => {
    setLoading(true);
    try {
      const response = await myPageAPI.getMyData(currentList as 'wishList' | 'myPlaces' | 'reviews');
      if (response.places) {
        setPlaces(response.places);
        setReviews([]);
      } else if (response.reviews) {
        setReviews(response.reviews);
        setPlaces([]);
      }
    } catch (error) {
      console.error('데이터 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (listType: string) => {
    if (listType === 'withdraw') {
      setShowWithdraw(true);
      return;
    }
    setSearchParams({ list: listType });
    setShowWithdraw(false);
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!window.confirm('정말로 회원탈퇴를 하시겠습니까?')) return;

    try {
      await userAPI.withdraw(withdrawPassword);
      alert('회원탈퇴가 완료되었습니다.');
      onUserChange(null);
      navigate('/');
    } catch (error) {
      console.error('회원탈퇴 실패:', error);
      alert('회원탈퇴에 실패했습니다. 비밀번호를 확인해주세요.');
    }
  };

  const getPageTitle = () => {
    switch (currentList) {
      case 'myPlaces': return '내 장소';
      case 'reviews': return '내 리뷰';
      default: return '내가 찜한 장소';
    }
  };

  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div className="mypage">
      <header>
        <div className="container">
          <h1>마이페이지</h1>
        </div>
      </header>

      <div className="container">
        <aside className="side-lnb">
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={currentList === item.path ? 'selected-li' : ''}
              >
                <button onClick={() => handleMenuClick(item.path)}>
                  {item.name}
                </button>
              </li>
            ))}
            <li className={showWithdraw ? 'selected-li' : ''}>
              <button onClick={() => handleMenuClick('withdraw')}>
                회원탈퇴
              </button>
            </li>
          </ul>
        </aside>

        <section className="content">
          {showWithdraw ? (
            <>
              <h3>회원탈퇴</h3>
              <hr />
              <form onSubmit={handleWithdraw} className="withdraw-form">
                <p>회원탈퇴를 하시려면 비밀번호를 입력하십시오.</p>
                <table>
                  <tbody>
                    <tr>
                      <td>비밀번호</td>
                      <td>
                        <input
                          type="password"
                          value={withdrawPassword}
                          onChange={(e) => setWithdrawPassword(e.target.value)}
                          required
                        />
                      </td>
                      <td>
                        <button type="submit" className="withdraw-btn">
                          회원탈퇴
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </>
          ) : (
            <>
              <h3>{getPageTitle()}</h3>
              <hr />
              
              {loading ? (
                <div className="loading">
                  <div className="spinner" />
                </div>
              ) : currentList === 'reviews' ? (
                <table className="reviews-table">
                  <thead>
                    <tr>
                      <th>장소 이름</th>
                      <th>내용</th>
                      <th>별점</th>
                      <th>작성일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((review) => (
                      <tr key={review.no}>
                        <td>
                          <Link to={`/detail?no=${review.placeNo}`}>
                            {review.placeTitle}
                          </Link>
                        </td>
                        <td>{review.content}</td>
                        <td>★{review.star}</td>
                        <td>{new Date(review.writtenDate).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyPage;