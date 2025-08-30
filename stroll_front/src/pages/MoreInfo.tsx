import React, { useState } from 'react';
import './MoreInfo.css';

const MoreInfo: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('notice');

  const menuItems = [
    { id: 'notice', name: '공지사항' },
    { id: 'faq', name: '자주 묻는 질문' },
    { id: 'qna', name: '문의 사항' },
  ];

  const noticeData = [
    {
      id: 1,
      title: '산책갈까 서비스 오픈 안내',
      content: '반려동물과 함께 할 수 있는 장소를 찾아보세요! 산책갈까 서비스가 정식 오픈했습니다.',
      date: '2024-01-15',
    },
    {
      id: 2,
      title: '새로운 카테고리 추가 안내',
      content: '반려견 유치원 카테고리가 새롭게 추가되었습니다.',
      date: '2024-01-10',
    },
  ];

  const faqData = [
    {
      id: 1,
      question: '장소 등록은 어떻게 하나요?',
      answer: '로그인 후 "내 주변" 페이지에서 "새 장소 등록" 버튼을 클릭하여 등록할 수 있습니다.',
    },
    {
      id: 2,
      question: '위치 설정은 어떻게 하나요?',
      answer: '"내 주변" 페이지에서 "내 위치 설정" 버튼을 클릭하고 지도에서 원하는 위치를 선택하세요.',
    },
    {
      id: 3,
      question: '찜한 장소는 어디서 확인하나요?',
      answer: '마이페이지의 "내가 찜한 장소" 메뉴에서 확인할 수 있습니다.',
    },
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case 'notice':
        return (
          <div className="notice-content">
            {noticeData.map((notice) => (
              <div key={notice.id} className="notice-item">
                <h4>{notice.title}</h4>
                <p className="notice-date">{notice.date}</p>
                <p className="notice-content">{notice.content}</p>
              </div>
            ))}
          </div>
        );
      case 'faq':
        return (
          <div className="faq-content">
            {faqData.map((faq) => (
              <div key={faq.id} className="faq-item">
                <h4 className="faq-question">Q. {faq.question}</h4>
                <p className="faq-answer">A. {faq.answer}</p>
              </div>
            ))}
          </div>
        );
      case 'qna':
        return (
          <div className="qna-content">
            <h4>문의하기</h4>
            <form className="qna-form">
              <div className="form-group">
                <label>제목</label>
                <input type="text" placeholder="문의 제목을 입력하세요" />
              </div>
              <div className="form-group">
                <label>내용</label>
                <textarea 
                  rows={8} 
                  placeholder="문의 내용을 입력하세요"
                />
              </div>
              <div className="form-group">
                <label>이메일</label>
                <input type="email" placeholder="답변받을 이메일을 입력하세요" />
              </div>
              <button type="submit" className="btn-primary">
                문의하기
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="moreinfo-page">
      <header>
        <div className="container">
          <h1>
            {menuItems.find(item => item.id === selectedMenu)?.name || '더보기'}
          </h1>
        </div>
      </header>

      <div className="container">
        <aside className="side-lnb">
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={selectedMenu === item.id ? 'selected' : ''}
                onClick={() => setSelectedMenu(item.id)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </aside>

        <section className="content">
          {renderContent()}
        </section>
      </div>
    </div>
  );
};

export default MoreInfo;