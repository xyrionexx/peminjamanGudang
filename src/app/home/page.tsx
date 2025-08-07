"use client";

import { useSession, signOut } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();
    
    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex items-center gap-2 text-gray-600">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                </div>
            </div>
        );
    }

    if (status === "unauthenticated") {
        router.push("/signin");
    }

    return (
        <>
            <h1>Home</h1>
            <p>Welcome {session?.user?.name}</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => signOut()}>Sign out</button>
        </>
    )
}