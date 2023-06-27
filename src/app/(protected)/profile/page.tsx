"use client";

import { useSession } from "next-auth/react";

function Profile() {
  const user = useSession();
  console.log(user);
  return <div>Profile</div>;
}

export default Profile;
