import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { placeAPI } from '../services/api';
import DaumPostcode from '../components/DaumPostcode';
import './NewPlace.css';

interface NewPlaceProps {
  user?: { id: string; nickname: string } | null;
}

const NewPlace: React.FC<NewPlaceProps> = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: 'pension',
    address: '',
    detailAddress: '',
    content: '',
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [showPostcode, setShowPostcode] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedImages(files);

    // 미리보기 URL 생성
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleAddressComplete = (data: any) => {
    setFormData(prev => ({
      ...prev,
      address: data.roadAddress || data.jibunAddress,
    }));
    setShowPostcode(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('detailAddress', formData.detailAddress);
    formDataToSend.append('content', formData.content);

    selectedImages.forEach((image, index) => {
      formDataToSend.append('imgs', image);
    });

    try {
      await placeAPI.insertPlace(formDataToSend);
      alert('장소가 성공적으로 등록되었습니다.');
      navigate('/aroundme');
    } catch (error) {
      console.error('장소 등록 실패:', error);
      alert('장소 등록에 실패했습니다.');
    }
  };

  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div className="newplace-page">
      <header>
        <div className="container">
          <h1>새 장소 등록</h1>
        </div>
      </header>

      <div className="container">
        <form onSubmit={handleSubmit} className="newplace-form">
          <section className="about">
            <div className="image-upload">
              <input
                type="file"
                multiple
                accept="image/jpg,image/jpeg,image/png"
                onChange={handleImageChange}
                className="file-input"
              />
              
              <div className="img-slider">
                {previewUrls.length > 0 ? (
                  <>
                    <img 
                      className="displayed-img" 
                      src={previewUrls[0]} 
                      alt="미리보기"
                    />
                    {previewUrls.length > 1 && (
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
                        {previewUrls.map((url, index) => (
                          <SplideSlide key={index}>
                            <img 
                              src={url} 
                              alt={`미리보기 ${index + 1}`}
                              onClick={() => {
                                const displayImg = document.querySelector('.displayed-img') as HTMLImageElement;
                                if (displayImg) displayImg.src = url;
                              }}
                            />
                          </SplideSlide>
                        ))}
                      </Splide>
                    )}
                  </>
                ) : (
                  <div className="no-image-placeholder">
                    <p>이미지를 선택해주세요</p>
                  </div>
                )}
              </div>
            </div>

            <article className="place-info">
              <div className="form-group">
                <label>장소 이름:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>카테고리:</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="pension">펜션</option>
                  <option value="cafe">카페</option>
                  <option value="grooming">미용</option>
                  <option value="hospital">동물병원</option>
                  <option value="playground">놀이터</option>
                  <option value="kindergarden">반려견 유치원</option>
                  <option value="etc">기타</option>
                </select>
              </div>

              <div className="form-group">
                <label>주소:</label>
                <div className="address-input">
                  <button
                    type="button"
                    onClick={() => setShowPostcode(true)}
                    className="btn-secondary"
                  >
                    주소 찾기
                  </button>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="주소를 검색해주세요"
                    required
                    readOnly
                  />
                  <input
                    type="text"
                    name="detailAddress"
                    value={formData.detailAddress}
                    onChange={handleInputChange}
                    placeholder="상세주소"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>설명:</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="장소에 대한 설명을 입력해주세요"
                  rows={5}
                />
              </div>
            </article>
          </section>

          <button type="submit" className="submit-btn btn-primary">
            등록
          </button>
        </form>
      </div>

      {showPostcode && (
        <DaumPostcode
          onComplete={handleAddressComplete}
          onClose={() => setShowPostcode(false)}
        />
      )}
    </div>
  );
};

export default NewPlace;