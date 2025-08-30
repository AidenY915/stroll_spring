import React from 'react';

interface DetailProps {
  user?: { id: string; nickname: string } | null;
}

const Detail: React.FC<DetailProps> = ({ user }) => {
  return (
    <div style={{ marginTop: '72px', padding: '50px 0' }}>
      <div className="container">
        <h1>장소 상세 페이지</h1>
        <p>장소 상세 정보가 여기에 표시됩니다.</p>
        {user && <p>로그인된 사용자: {user.nickname}</p>}
      </div>
    </div>
  );
};

export default Detail;