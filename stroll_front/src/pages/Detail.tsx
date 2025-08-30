import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { placeAPI, replyAPI, wishAPI } from '../services/api';
import { Place, Reply } from '../types';
import './Detail.css';

interface DetailProps {
  user?: { id: string; nickname: string } | null;
}

const Detail: React.FC<DetailProps> = ({ user }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const placeNo = parseInt(searchParams.get('no') || '0');

  const [place, setPlace] = useState<Place | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [isWished, setIsWished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newReply, setNewReply] = useState({ content: '', star: 3 });

  useEffect(() => {
    if (placeNo) {
      fetchPlaceDetail();
      fetchReplies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeNo]);

  const fetchPlaceDetail = async () => {
    try {
      const response = await placeAPI.getPlaceDetail(placeNo);
      setPlace(response.place);
      setImages(response.imgs);
      setIsWished(response.isWishedPlace);
    } catch (error) {
      console.error('장소 상세 정보 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReplies = async () => {
    try {
      const repliesData = await replyAPI.getReplies(placeNo);
      setReplies(repliesData);
    } catch (error) {
      console.error('리뷰 조회 실패:', error);
    }
  };

  const handleWishToggle = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      if (isWished) {
        await wishAPI.deleteFromWishList(placeNo);
      } else {
        await wishAPI.addToWishList(placeNo);
      }
      setIsWished(!isWished);
    } catch (error) {
      console.error('위시리스트 업데이트 실패:', error);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      await replyAPI.insertReply({
        content: newReply.content,
        star: newReply.star,
        placeNo,
      });
      setNewReply({ content: '', star: 3 });
      fetchReplies(); // 리뷰 목록 새로고침
    } catch (error) {
      console.error('리뷰 등록 실패:', error);
      alert('리뷰 등록에 실패했습니다.');
    }
  };

  const handleReplyDelete = async (replyNo: number) => {
    if (!window.confirm('리뷰를 삭제하시겠습니까?')) return;

    try {
      await replyAPI.deleteReply(replyNo, placeNo);
      fetchReplies(); // 리뷰 목록 새로고침
    } catch (error) {
      console.error('리뷰 삭제 실패:', error);
      alert('리뷰 삭제에 실패했습니다.');
    }
  };

  const handlePlaceDelete = async () => {
    if (!window.confirm('장소를 삭제하시겠습니까?')) return;

    try {
      await placeAPI.deletePlace(placeNo);
      navigate('/aroundme');
    } catch (error) {
      console.error('장소 삭제 실패:', error);
      alert('장소 삭제에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
      </div>
    );
  }

  if (!place) {
    return <div>장소를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="detail-page">
      <div className="container">
        <section className="about">
          <div className="img-slider">
            <img 
              className="displayed-img" 
              src={images[0] || 'http://placehold.it/490x350'} 
              alt={place.title}
            />
            {images.length > 1 && (
              <Splide
                options={{
                  type: 'loop',
                  perPage: 4,
                  perMove: 1,
                  pagination: false,
                  width: '490px',
                  gap: '10px',
                }}
              >
                {images.map((img, index) => (
                  <SplideSlide key={index}>
                    <img 
                      src={img} 
                      alt={`장소 이미지 ${index + 1}`}
                      onClick={() => {
                        const displayImg = document.querySelector('.displayed-img') as HTMLImageElement;
                        if (displayImg) displayImg.src = img;
                      }}
                    />
                  </SplideSlide>
                ))}
              </Splide>
            )}
          </div>

          <article>
            <h2>
              {place.title}
              {user && (
                <button className="wish-btn" onClick={handleWishToggle}>
                  <img
                    src={isWished ? "/images/wished.png" : "/images/beforeWish.png"}
                    alt={isWished ? "찜 해제" : "찜하기"}
                  />
                </button>
              )}
            </h2>
            <p className="star-rating">★ {place.star}</p>
            <p className="address">
              <span>{place.address} {place.detailAddress}</span>
            </p>
            <p className="content">{place.content}</p>
            {user?.id === place.userId && (
              <button 
                className="delete-place-btn btn-primary"
                onClick={handlePlaceDelete}
              >
                장소 삭제
              </button>
            )}
          </article>
        </section>

        <section className="review-section">
          {user && (
            <form className="comment-writing-form" onSubmit={handleReplySubmit}>
              <select
                value={newReply.star}
                onChange={(e) => setNewReply({ ...newReply, star: parseInt(e.target.value) })}
              >
                <option value={1}>★</option>
                <option value={2}>★★</option>
                <option value={3}>★★★</option>
                <option value={4}>★★★★</option>
                <option value={5}>★★★★★</option>
              </select>
              <textarea
                value={newReply.content}
                onChange={(e) => setNewReply({ ...newReply, content: e.target.value })}
                placeholder="리뷰를 작성해주세요"
                required
              />
              <button type="submit" className="reply-btn btn-primary">
                등록
              </button>
            </form>
          )}

          <ul className="reviews">
            {replies.map((reply) => (
              <li key={reply.no} className="review">
                <p className="writer">{reply.userNickname}</p>
                <p className="score">
                  {'★'.repeat(reply.star)}
                </p>
                <p className="content">{reply.content}</p>
                <p className="created-date">{reply.writtenDate}</p>
                {reply.userId === user?.id && (
                  <button
                    className="reply-btn btn-secondary"
                    onClick={() => handleReplyDelete(reply.no)}
                  >
                    삭제
                  </button>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Detail;