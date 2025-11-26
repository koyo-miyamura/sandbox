import { Link } from "react-router"
import { useGetApiUsers } from "../users/users"

function About() {
  const { data, isLoading, error } = useGetApiUsers();

  return (
    <div>
      <h1>About Page</h1>
      <p>ここは About ページです</p>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Users List</h2>

        {isLoading && <p>Loading...</p>}

        {error && <p className="text-red-500 text-xl"><span>Error: {error.error}</span></p>}

        {data?.status === 200 && (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead className="bg-gray-100">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {data.data.users.map((user) => (
                  <tr key={user.id} className="hover">
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="mt-4">
        <Link to="/" className="link">ホームページへ戻る</Link>
      </p>
    </div>
  )
}

export default About
