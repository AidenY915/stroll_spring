import React, { useEffect, useRef } from 'react';
import './KakaoMap.css';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  onLocationSelect: (address: string, x: number, y: number) => void;
  onClose: () => void;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ onLocationSelect, onClose }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const infowindowRef = useRef<any>(null);

  useEffect(() => {
    if (!window.kakao || !mapRef.current) return;

    const { kakao } = window;

    // 지도 초기화
    const options = {
      center: new kakao.maps.LatLng(37.494719665527384, 127.0300768938762),
      level: 3,
    };

    const map = new kakao.maps.Map(mapRef.current, options);
    mapInstanceRef.current = map;

    // 마커와 인포윈도우 초기화
    const marker = new kakao.maps.Marker();
    const infowindow = new kakao.maps.InfoWindow({ zindex: 1 });
    markerRef.current = marker;
    infowindowRef.current = infowindow;

    // 주소-좌표 변환 객체
    const geocoder = new kakao.maps.services.Geocoder();

    // 지도 클릭 이벤트
    kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
      const latlng = mouseEvent.latLng;
      const x = latlng.getLng();
      const y = latlng.getLat();

      // 마커 위치 설정
      marker.setPosition(latlng);
      marker.setMap(map);

      // 좌표로 주소 검색
      geocoder.coord2Address(x, y, (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const detailAddr = result[0].road_address
            ? result[0].road_address.address_name
            : result[0].address.address_name;

          const content = `
            <div class="map-info">
              <span class="title">선택된 위치</span>
              <div>${detailAddr}</div>
              <button onclick="selectLocation('${detailAddr}', ${x}, ${y})">이 위치 선택</button>
            </div>
          `;

          infowindow.setContent(content);
          infowindow.open(map, marker);

          // 구 정보 추출
          const guMatch = detailAddr.match(/(\S+구)/);
          if (guMatch) {
            const guAddress = guMatch[1];
            // 전역 함수로 위치 선택 처리
            (window as any).selectLocation = (addr: string, lng: number, lat: number) => {
              onLocationSelect(guAddress, lng, lat);
            };
          }
        }
      });
    });

    // 현재 위치로 주소 검색
    geocoder.coord2RegionCode(
      options.center.getLng(),
      options.center.getLat(),
      (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          for (let i = 0; i < result.length; i++) {
            if (result[i].region_type === 'H') {
              // 초기 위치 표시
              break;
            }
          }
        }
      }
    );

    return () => {
      // 정리 작업
      delete (window as any).selectLocation;
    };
  }, [onLocationSelect]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="map-modal-backdrop" onClick={handleBackdropClick}>
      <div className="map-container">
        <div className="map-header">
          <h3>위치 선택</h3>
          <button onClick={onClose} className="close-btn">
            ×
          </button>
        </div>
        <div ref={mapRef} className="map" />
        <div className="map-footer">
          <p>지도를 클릭하여 위치를 선택하세요</p>
        </div>
      </div>
    </div>
  );
};

export default KakaoMap;