import './App.css'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import InputBox from './components/InputBox'

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <ChatWindow />
        <InputBox />
      </div>
    </div>
  )
}

export default App
