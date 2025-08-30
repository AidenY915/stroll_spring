import React, { useEffect, useRef } from 'react';
import './DaumPostcode.css';

declare global {
  interface Window {
    daum: any;
  }
}

interface DaumPostcodeProps {
  onComplete: (data: any) => void;
  onClose: () => void;
}

const DaumPostcode: React.FC<DaumPostcodeProps> = ({ onComplete, onClose }) => {
  const postcodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.daum || !postcodeRef.current) return;

    new window.daum.Postcode({
      oncomplete: (data: any) => {
        // 도로명 주소 처리
        let roadAddr = data.roadAddress;
        let extraRoadAddr = '';

        // 법정동명이 있을 경우 추가
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraRoadAddr !== '') {
          extraRoadAddr = ' (' + extraRoadAddr + ')';
        }

        const addressData = {
          zonecode: data.zonecode,
          roadAddress: roadAddr,
          jibunAddress: data.jibunAddress,
          extraAddress: extraRoadAddr,
          autoRoadAddress: data.autoRoadAddress,
          autoJibunAddress: data.autoJibunAddress,
        };

        onComplete(addressData);
      },
      width: '100%',
      height: '100%',
    }).embed(postcodeRef.current);
  }, [onComplete]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="postcode-modal-backdrop" onClick={handleBackdropClick}>
      <div className="postcode-container">
        <div className="postcode-header">
          <h3>주소 검색</h3>
          <button onClick={onClose} className="close-btn">
            ×
          </button>
        </div>
        <div ref={postcodeRef} className="postcode-content" />
      </div>
    </div>
  );
};

export default DaumPostcode;