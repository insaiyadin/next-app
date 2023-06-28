import { redirect } from "next/navigation";

async function Register() {
  async function signin(formData: FormData) {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(email, password);

    const res = await fetch("http://localhost:8000/auth/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      console.log(res);
      throw new Error("Errorrder");
    }

    redirect("/api/auth/signin");
  }
  return (
    <div>
      <h1>Sign up</h1>
      <form className="text-black" action={signin}>
        <div className="m-1">
          <input placeholder="email" type="email" name="email" />
        </div>
        <div className="m-1">
          <input placeholder="password" type="password" name="password" />
        </div>
        <button className="text-white">Submit</button>
      </form>
    </div>
  );
}

export default Register;
