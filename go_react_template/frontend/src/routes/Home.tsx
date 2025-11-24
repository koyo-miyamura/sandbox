import { useState } from 'react'
import { Link } from 'react-router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="hero bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Home</h1>

          <p className="py-6">
            ここはホームページです
          </p>

          <p className="py-6">
            <Link to="/about" className="btn btn-primary">About ページに移動する</Link>
          </p>

          <button className="btn" onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
