import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';
import './Navigation.css';

interface NavigationProps {
  user?: { id: string; nickname: string } | null;
  onUserChange: (user: any) => void;
}

const Navigation: React.FC<NavigationProps> = ({ user, onUserChange }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchKeywords, setSearchKeywords] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginData, setLoginData] = useState({ id: '', password: '' });
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchKeywords.trim()) {
      navigate(`/aroundme?keywords=${encodeURIComponent(searchKeywords)}`);
      setIsSearchOpen(false);
      setSearchKeywords('');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await userAPI.login(loginData.id, loginData.password);
      if (response.success) {
        onUserChange(response.data);
        setIsLoginModalOpen(false);
        setLoginData({ id: '', password: '' });
      } else {
        alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
      }
    } catch (error) {
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  const handleLogout = async () => {
    try {
      await userAPI.logout();
      onUserChange(null);
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <>
      <nav id="gnb" className={isScrolled ? 'scrolled' : ''}>
        <ul>
          <li className="logo">
            <Link to="/">산책갈까</Link>
          </li>
          <li>
            <Link to="/aroundme">내 주변</Link>
          </li>
          {user && (
            <li>
              <Link to="/mypage">마이페이지</Link>
            </li>
          )}
          <li>
            <Link to="/moreinfo">더보기</Link>
          </li>
          <li>
            {user ? (
              <button onClick={handleLogout} className="nav-button">
                로그아웃
              </button>
            ) : (
              <button onClick={() => setIsLoginModalOpen(true)} className="nav-button">
                로그인
              </button>
            )}
          </li>
          <li className="search-container">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="search-button"
            >
              <img
                src={isScrolled ? "/images/search_icon_black.png" : "/images/search_icon.png"}
                alt="검색"
                id="searchIcon"
              />
            </button>
            {isSearchOpen && (
              <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                  type="text"
                  value={searchKeywords}
                  onChange={(e) => setSearchKeywords(e.target.value)}
                  placeholder="장소를 검색하세요"
                  autoFocus
                  onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                />
              </form>
            )}
          </li>
        </ul>
      </nav>

      {/* 로그인 모달 */}
      {isLoginModalOpen && (
        <>
          <div className="modal-backdrop" onClick={() => setIsLoginModalOpen(false)} />
          <div className="login-modal">
            <div className="logo-container">
              <img src="/images/Dog_Paw_Print_logo.png" alt="로고" className="logo-img" />
              <p>산책갈까</p>
            </div>
            <p>Log in</p>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                value={loginData.id}
                onChange={(e) => setLoginData({ ...loginData, id: e.target.value })}
                placeholder="아이디"
                required
              />
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                placeholder="비밀번호"
                required
              />
              <button type="submit">로그인</button>
              <Link to="/register" onClick={() => setIsLoginModalOpen(false)}>
                회원가입
              </Link>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;