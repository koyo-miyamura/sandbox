import { Link } from "react-router"

function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page of our application.</p>
      <Link to="/">Go back to Home Page</Link>
    </div>
  )
}

export default About
