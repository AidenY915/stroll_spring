# 산책갈까 - React TypeScript 프론트엔드

반려동물과 함께할 수 있는 장소를 찾고 공유하는 웹 애플리케이션의 React TypeScript 버전입니다.

## 기능

- **메인 페이지**: 배너 슬라이더와 카테고리별 장소 탐색
- **내 주변**: 현재 위치 기반 장소 검색 및 필터링
- **장소 상세**: 장소 정보, 이미지 갤러리, 리뷰 시스템
- **마이페이지**: 찜한 장소, 등록한 장소, 작성한 리뷰 관리
- **장소 등록**: 새로운 장소 등록 (로그인 필요)
- **회원가입/로그인**: 사용자 인증 시스템

## 기술 스택

- **Frontend**: React 18, TypeScript
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **UI Components**: 
  - Splide (이미지 슬라이더)
  - 카스텀 컴포넌트
- **External APIs**:
  - 카카오 맵 API
  - 다음 주소 검색 API

## 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Navigation.tsx   # 네비게이션 바
│   ├── KakaoMap.tsx     # 카카오 맵 컴포넌트
│   └── DaumPostcode.tsx # 다음 주소 검색
├── pages/              # 페이지 컴포넌트
│   ├── Main.tsx        # 메인 페이지
│   ├── AroundMe.tsx    # 내 주변 페이지
│   ├── Detail.tsx      # 장소 상세 페이지
│   ├── Register.tsx    # 회원가입 페이지
│   ├── MyPage.tsx      # 마이페이지
│   ├── NewPlace.tsx    # 새 장소 등록
│   └── MoreInfo.tsx    # 더보기 페이지
├── services/           # API 서비스
│   └── api.ts          # HTTP 클라이언트 및 API 함수들
├── types/              # TypeScript 타입 정의
│   └── index.ts        # 공통 타입 정의
├── styles/             # 전역 스타일
│   └── global.css      # 전역 CSS
└── utils/              # 유틸리티 함수들
```

## 설치 및 실행

1. 의존성 설치:
```bash
npm install
```

2. 개발 서버 실행:
```bash
npm start
```

3. 프로덕션 빌드:
```bash
npm run build
```

## 환경 설정

`.env` 파일을 생성하고 다음 변수들을 설정하세요:

```
REACT_APP_API_URL=http://localhost:8080
REACT_APP_KAKAO_MAP_KEY=your_kakao_map_api_key
```

## 백엔드 연동

이 프론트엔드는 Spring Boot 백엔드와 연동됩니다. 백엔드 서버가 `http://localhost:8080`에서 실행되어야 합니다.

### API 엔드포인트

- `POST /login` - 로그인
- `POST /logout` - 로그아웃  
- `POST /registerOK` - 회원가입
- `GET /aroundme` - 장소 목록 조회
- `GET /detail` - 장소 상세 조회
- `POST /insertPlace` - 장소 등록
- `POST /insertReply` - 리뷰 등록
- `GET /mypage` - 마이페이지 데이터

## 주요 변경사항 (JSP → React)

1. **컴포넌트 기반 아키텍처**: JSP include 방식에서 React 컴포넌트로 변경
2. **클라이언트 사이드 라우팅**: 서버 사이드 라우팅에서 React Router로 변경
3. **상태 관리**: jQuery DOM 조작에서 React state로 변경
4. **타입 안정성**: JavaScript에서 TypeScript로 변경
5. **모던 CSS**: 기존 CSS를 모던 CSS와 반응형 디자인으로 개선
6. **API 통신**: 기존 form 제출 방식에서 Axios를 이용한 AJAX 통신으로 변경

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)  
- Safari (최신)
- Edge (최신)

## 라이선스

이 프로젝트는 개인 프로젝트입니다.