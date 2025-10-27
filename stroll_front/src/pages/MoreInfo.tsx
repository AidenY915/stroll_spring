import React from 'react';

const MoreInfo: React.FC = () => {
  return (
    <div style={{ marginTop: '72px', padding: '50px 0' }}>
      <header>
        <div className="container">
          <h1>더보기</h1>
        </div>
      </header>
      <div className="container">
        <p>공지사항, FAQ 등이 여기에 표시됩니다.</p>
      </div>
    </div>
  );
};

export default MoreInfo;