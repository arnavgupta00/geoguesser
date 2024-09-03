"use client";

import { addUser } from "@/services/userActions";
import { useState } from "react";
import Navbar from "../components/navbar";
import { useRouter } from "next/navigation";
export default function Page() {
  const [formdata, setFormData] = useState({
    username: "",
    email: "",
    password: "afgaagaga",
    displayName: "",
  });
  const router = useRouter();
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-start p-0"
      style={{
        backgroundColor: "#1E1E1E",
      }}
    >
      <Navbar />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const user = await addUser(
            formdata.username,
            formdata.email,
            formdata.password,
            formdata.displayName
          );
          localStorage.setItem("user", JSON.stringify(user));
          router.push("/");
          
        }}
        className="w-full min-h-screen flex flex-col items-center justify-center gap-3 "
      >
        <input
          type="text"
          placeholder="Username"
          className="w-2/3 p-3 rounded-xl outline-none text-black"
          value={formdata.username}
          onChange={(e) =>
            setFormData({ ...formdata, username: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          className="w-2/3 p-3 rounded-xl outline-none text-black"
          value={formdata.email}
          onChange={(e) => setFormData({ ...formdata, email: e.target.value })}
        />

        <input
          type="text"
          placeholder="Display Name"
          className="w-2/3 p-3 rounded-xl outline-none text-black"
          value={formdata.displayName}
          onChange={(e) =>
            setFormData({ ...formdata, displayName: e.target.value })
          }
        />
        <p>It should be funny not vulguar **</p>
        <button
          type="submit"
          className="w-1/2 p-3 rounded-xl"
          style={{
            backgroundColor: "#6C63FF",
          }}
        >
          Submit
        </button>
      </form>
    </main>
  );
}
