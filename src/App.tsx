import './App.css'
import { Route, Routes } from 'react-router-dom'
import { $accessToken } from './common/function/accessToken';
import { useStore } from 'effector-react';
import { Authorization } from './pages/authorization/organoids/Authorization';
import { Chat } from './pages/chat/organoids/Chat';

function App() {
  const accessToken = useStore($accessToken);

  return (
    <div className="App">
      <div className="App__Actual">
        <Routes>
          {accessToken ?
            <>
              <Route path="/" element={<Chat />} />
            </> :
            <>
              <Route path="/" element={<Authorization />} />
            </>}
        </Routes>
      </div>
    </div>
  )
}

export default App
