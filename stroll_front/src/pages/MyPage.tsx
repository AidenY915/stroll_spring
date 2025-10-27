import React from 'react';

interface MyPageProps {
  user?: { id: string; nickname: string } | null;
  onUserChange: (user: any) => void;
}

const MyPage: React.FC<MyPageProps> = ({ user }) => {
  if (!user) {
    return (
      <div style={{ marginTop: '72px', padding: '50px 0' }}>
        <div className="container">
          <h1>로그인이 필요합니다</h1>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '72px', padding: '50px 0' }}>
      <header>
        <div className="container">
          <h1>마이페이지</h1>
        </div>
      </header>
      <div className="container">
        <p>안녕하세요, {user.nickname}님!</p>
        <p>마이페이지 내용이 여기에 표시됩니다.</p>
      </div>
    </div>
  );
};

export default MyPage;