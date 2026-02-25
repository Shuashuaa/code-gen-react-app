import { useUsers } from "@/features/user";

export const UserList = () => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <div>📡 Loading users...</div>;
  if (error) return <div>❌ Error: {error.message}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Directory</h2>
      <table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={{ padding: "8px" }}>ID</th>
            <th style={{ padding: "8px" }}>Name</th>
            <th style={{ padding: "8px" }}>Email</th>
            <th style={{ padding: "8px" }}>Website</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td style={{ padding: "8px", textAlign: "center" }}>{user.id}</td>
              <td style={{ padding: "8px" }}>{user.name}</td>
              <td style={{ padding: "8px" }}>{user.email}</td>
              <td style={{ padding: "8px" }}>{user.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};