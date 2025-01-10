'use client'
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function () {
        const router = useRouter();

    return <div className="flex flex-col justify-center items-center h-screen bg-blue-300">
        <label htmlFor="">Email</label>
        <input type="text" placeholder="username" />
        <label htmlFor="">Password</label>
        <input type="text" placeholder="password" />
        <button onClick={async () => {
            await signIn("google");
            router.push('/');
        }}>Signin with Google</button>
        <button onClick={async () => {
            await signIn("github");
            router.push('/');
        }}>Signin with Github</button>
        <button onClick={async () => {
            await signIn("credentials", {
                username: "",
                password: "",
                redirect: false,
            });
            router.push('/');
        }}>Signin with Email</button>
        <button onClick={() => {
            signOut();
        }}>Logout</button>
    </div>
}
