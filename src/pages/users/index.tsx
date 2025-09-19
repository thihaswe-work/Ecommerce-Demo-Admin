import { useApi } from "@/hooks/useApi";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

const UsersPage = () => {
  const {
    data: users,
    loading,
    removeItem: deleteUser,
  } = useApi<User>({
    endpoint: "/users",
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Avatar</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="text-center">
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                {u.avatar ? (
                  <img src={u.avatar} className="w-10 h-10 rounded" />
                ) : (
                  "N/A"
                )}
              </td>
              <td>{new Date(u.createdAt).toLocaleString()}</td>
              <td>
                <button
                  onClick={() => deleteUser(u.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
