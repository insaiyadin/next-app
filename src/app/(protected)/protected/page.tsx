import { cookies } from "next/headers";

async function fetchUsers() {
  const cookie = cookies().get("api-token");
  const res = await fetch("http://localhost:8000/auth/users", {
    headers: {
      authorization: `bearer ${cookie?.value}`,
    },
  });

  if (!res.ok) {
    throw new Error((await res.json()).message);
  }
  return await res.json();
}

async function Protected() {
  const users = await fetchUsers();
  return (
    <div>
      <h1>Protected</h1>
      {(users ?? []).map((user: any) => (
        <p key={user.email}>{user.email}</p>
      ))}
    </div>
  );
}

export default Protected;
