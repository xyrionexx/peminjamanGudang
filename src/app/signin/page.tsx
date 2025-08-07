import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Signin() {
    const { status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (status === "authenticated") {
        router.push("/home");
    }

    return (
        <>
            <h1>Signin</h1>
            <button onClick={() => signIn("google")}>Sign in with Google</button>
        </>
    )
}