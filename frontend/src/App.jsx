import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AgentWidget from './components/AgentWidget'
import Home from './pages/Home'
import News from './pages/News'
import Life from './pages/Life'
import Article from './pages/Article'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/life" element={<Life />} />
          <Route path="/article" element={<Article />} />
        </Routes>
      </main>
      <Footer />
      <AgentWidget />
    </div>
  )
}

export default App
