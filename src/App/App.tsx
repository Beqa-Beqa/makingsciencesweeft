import './App.css';
import { useState } from "react"
import { Navbar } from "../Components"
import { HistoryPage, Main } from "../Containers"

function App() {
  const [activePage, setActivePage] = useState<'homepage' | 'history'>('homepage');

  return (
    <>
      <header>
        <Navbar
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </header>
      <main>
        {
          activePage === 'homepage' ? <Main />
          : <HistoryPage />
        }
      </main>
    </>
  )
}

export default App
