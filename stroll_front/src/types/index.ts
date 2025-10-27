// 사용자 타입 정의
export interface User {
  id: string;
  nickname: string;
  email: string;
}

// 장소 타입 정의
export interface Place {
  no: number;
  title: string;
  address: string;
  detailAddress: string;
  content: string;
  category: 'pension' | 'cafe' | 'grooming' | 'hospital' | 'playground' | 'kindergarden' | 'etc';
  star: number;
  userId: string;
  distance?: number;
}

// 리뷰 타입 정의
export interface Reply {
  no: number;
  content: string;
  star: number;
  writtenDate: string;
  userId: string;
  userNickname: string;
  placeNo: number;
  placeTitle?: string;
}

// 위시리스트 타입 정의
export interface Wish {
  userId: string;
  placeNo: number;
}

// 이미지 타입 정의
export interface Image {
  no: number;
  placeNo: number;
  path: string;
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// 검색 파라미터 타입
export interface SearchParams {
  keywords?: string;
  address?: string;
  category?: string;
  order?: 'distance' | 'star';
  maxDistance?: number;
  minStar?: number;
  x?: number;
  y?: number;
  page?: number;
}

// 페이지네이션 타입
export interface Pagination {
  currentPage: number;
  firstPage: number;
  lastPage: number;
  totalPages: number;
}