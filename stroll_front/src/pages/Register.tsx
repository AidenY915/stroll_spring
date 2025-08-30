import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';
import './Register.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    password2: '',
    nickname: '',
    email: '',
  });
  const [validations, setValidations] = useState({
    id: { isValid: false, message: '' },
    nickname: { isValid: false, message: '' },
    password: { isValid: false, message: '' },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const checkIdDuplicate = async () => {
    if (!formData.id) {
      setValidations(prev => ({
        ...prev,
        id: { isValid: false, message: '아이디를 입력해주세요.' }
      }));
      return;
    }

    try {
      const isAvailable = await userAPI.checkDuplicate('id', formData.id);
      setValidations(prev => ({
        ...prev,
        id: {
          isValid: isAvailable,
          message: isAvailable ? '사용 가능한 아이디입니다.' : '이미 사용 중인 아이디입니다.'
        }
      }));
    } catch (error) {
      console.error('아이디 중복 체크 실패:', error);
    }
  };

  const checkNicknameDuplicate = async () => {
    if (!formData.nickname) {
      setValidations(prev => ({
        ...prev,
        nickname: { isValid: false, message: '닉네임을 입력해주세요.' }
      }));
      return;
    }

    try {
      const isAvailable = await userAPI.checkDuplicate('nickname', formData.nickname);
      setValidations(prev => ({
        ...prev,
        nickname: {
          isValid: isAvailable,
          message: isAvailable ? '사용 가능한 닉네임입니다.' : '이미 사용 중인 닉네임입니다.'
        }
      }));
    } catch (error) {
      console.error('닉네임 중복 체크 실패:', error);
    }
  };

  const checkPasswordMatch = () => {
    if (!formData.password) {
      setValidations(prev => ({
        ...prev,
        password: { isValid: false, message: '비밀번호를 입력하세요.' }
      }));
      return;
    }

    const isMatch = formData.password === formData.password2;
    setValidations(prev => ({
      ...prev,
      password: {
        isValid: isMatch,
        message: isMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!validations.id.isValid) {
      alert('사용 가능한 아이디를 입력하세요.');
      return;
    }
    if (!validations.nickname.isValid) {
      alert('사용 가능한 닉네임을 입력하세요.');
      return;
    }
    if (!validations.password.isValid) {
      alert('비밀번호를 확인하세요.');
      return;
    }

    try {
      await userAPI.register({
        id: formData.id,
        password: formData.password,
        nickname: formData.nickname,
        email: formData.email,
      });
      alert('회원가입이 완료되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="register-page">
      <header>
        <div className="container">
          <h1>회원가입</h1>
        </div>
      </header>

      <div className="container">
        <form onSubmit={handleSubmit} className="register-form">
          <table>
            <tbody>
              <tr>
                <td>아이디</td>
                <td>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    onBlur={checkIdDuplicate}
                    required
                  />
                </td>
                <td>
                  <span 
                    className={`validation-message ${validations.id.isValid ? 'valid' : 'invalid'}`}
                  >
                    {validations.id.message}
                  </span>
                </td>
              </tr>
              <tr>
                <td>비밀번호</td>
                <td>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </td>
                <td>
                  <span 
                    className={`validation-message ${validations.password.isValid ? 'valid' : 'invalid'}`}
                  >
                    {validations.password.message}
                  </span>
                </td>
              </tr>
              <tr>
                <td>비밀번호 확인</td>
                <td>
                  <input
                    type="password"
                    name="password2"
                    value={formData.password2}
                    onChange={handleInputChange}
                    onBlur={checkPasswordMatch}
                    required
                  />
                </td>
                <td></td>
              </tr>
              <tr>
                <td>닉네임</td>
                <td>
                  <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleInputChange}
                    onBlur={checkNicknameDuplicate}
                    required
                  />
                </td>
                <td>
                  <span 
                    className={`validation-message ${validations.nickname.isValid ? 'valid' : 'invalid'}`}
                  >
                    {validations.nickname.message}
                  </span>
                </td>
              </tr>
              <tr>
                <td>이메일</td>
                <td>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="btn-primary register-btn">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;