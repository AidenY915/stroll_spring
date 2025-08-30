import axios from 'axios';
import { User, Place, Reply, SearchParams, ApiResponse } from '../types';

// API 베이스 URL 설정 (백엔드 서버 주소에 맞게 수정 필요)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 세션 쿠키를 포함하여 요청
});

// 사용자 관련 API
export const userAPI = {
  // 로그인
  login: async (id: string, password: string): Promise<ApiResponse<User>> => {
    const response = await api.post('/login', { id, password });
    return response.data;
  },

  // 로그아웃
  logout: async (): Promise<void> => {
    await api.post('/logout');
  },

  // 회원가입
  register: async (userData: {
    id: string;
    password: string;
    nickname: string;
    email: string;
  }): Promise<ApiResponse<User>> => {
    const response = await api.post('/registerOK', userData);
    return response.data;
  },

  // 중복 체크
  checkDuplicate: async (type: 'id' | 'nickname', value: string): Promise<boolean> => {
    const response = await api.post(`/duplicateCheck?${type}=${value}`);
    return response.data === 'true';
  },

  // 회원탈퇴
  withdraw: async (password: string): Promise<void> => {
    await api.post('/withdraw', { password });
  },
};

// 장소 관련 API
export const placeAPI = {
  // 장소 목록 조회
  getPlaces: async (params: SearchParams): Promise<{ places: Place[]; pagination: any }> => {
    const response = await api.get('/aroundme', { params });
    return response.data;
  },

  // 장소 상세 조회
  getPlaceDetail: async (no: number): Promise<{ place: Place; imgs: string[]; isWishedPlace: boolean }> => {
    const response = await api.get(`/detail?no=${no}`);
    return response.data;
  },

  // 새 장소 등록
  insertPlace: async (formData: FormData): Promise<void> => {
    await api.post('/insertPlace', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // 장소 삭제
  deletePlace: async (no: number): Promise<void> => {
    await api.get(`/deletePlace?no=${no}`);
  },
};

// 리뷰 관련 API
export const replyAPI = {
  // 리뷰 목록 조회
  getReplies: async (placeNo: number): Promise<Reply[]> => {
    const response = await api.get(`/replies?placeNo=${placeNo}`);
    return response.data;
  },

  // 리뷰 등록
  insertReply: async (replyData: {
    content: string;
    star: number;
    placeNo: number;
  }): Promise<void> => {
    await api.post('/insertReply', replyData);
  },

  // 리뷰 삭제
  deleteReply: async (no: number, placeNo: number): Promise<void> => {
    await api.get(`/deleteReply?no=${no}&placeNo=${placeNo}`);
  },
};

// 위시리스트 관련 API
export const wishAPI = {
  // 위시리스트에 추가
  addToWishList: async (placeNo: number): Promise<void> => {
    await api.get(`/addToWishList?no=${placeNo}`);
  },

  // 위시리스트에서 삭제
  deleteFromWishList: async (placeNo: number): Promise<void> => {
    await api.get(`/deleteFromWishList?no=${placeNo}`);
  },
};

// 마이페이지 관련 API
export const myPageAPI = {
  // 내 정보 조회
  getMyData: async (listType: 'wishList' | 'myPlaces' | 'reviews'): Promise<{
    places?: Place[];
    reviews?: Reply[];
  }> => {
    const response = await api.get(`/mypage?list=${listType}`);
    return response.data;
  },
};

export default api;