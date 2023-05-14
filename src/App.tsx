import './App.css'
import { useStore } from 'effector-react';
import { Authorization } from './pages/authorization/organoids/Authorization';
import { Chat } from './pages/chat/organoids/Chat';
import { $authorization } from './common/function/stores';

function App() {
  const authorization = useStore($authorization);
  return (
    <div className="App">
      <div className="App__Actual">
        <Authorization />
        {authorization && <Chat />}
      </div>
    </div>
  )
}

export default App
