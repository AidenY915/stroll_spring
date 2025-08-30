import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Main from './pages/Main'
import AroundMe from './pages/AroundMe'
import Detail from './pages/Detail'
import Register from './pages/Register'
import MyPage from './pages/MyPage'
import NewPlace from './pages/NewPlace'
import MoreInfo from './pages/MoreInfo'
import './styles/global.css'
import './App.css'

interface User {
  id: string;
  nickname: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // 세션에서 사용자 정보 확인 (실제로는 API 호출로 확인)
    const checkSession = async () => {
      try {
        // 세션 체크 API 호출
        // const response = await api.get('/session');
        // if (response.data.user) {
        //   setUser(response.data.user);
        // }
      } catch (error) {
        console.log('세션 없음');
      }
    };

    checkSession();
  }, []);

  const handleUserChange = (newUser: User | null) => {
    setUser(newUser);
  };

  return (
    <Router>
      <div className="App">
        <Navigation user={user} onUserChange={handleUserChange} />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/main" element={<Main />} />
            <Route path="/aroundme" element={<AroundMe user={user} />} />
            <Route path="/detail" element={<Detail user={user} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mypage" element={<MyPage user={user} onUserChange={handleUserChange} />} />
            <Route path="/newplace" element={<NewPlace user={user} />} />
            <Route path="/moreinfo" element={<MoreInfo />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
