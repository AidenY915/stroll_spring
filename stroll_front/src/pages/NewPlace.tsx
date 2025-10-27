import React from 'react';

interface NewPlaceProps {
  user?: { id: string; nickname: string } | null;
}

const NewPlace: React.FC<NewPlaceProps> = ({ user }) => {
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
          <h1>새 장소 등록</h1>
        </div>
      </header>
      <div className="container">
        <p>새 장소 등록 폼이 여기에 표시됩니다.</p>
      </div>
    </div>
  );
};

export default NewPlace;