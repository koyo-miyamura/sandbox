import { Link } from "react-router"

function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p>ここは About ページです</p>
      <p className="mt-4">
        <Link to="/" className="link">ホームページへ戻る</Link>
      </p>
    </div>
  )
}

export default About
