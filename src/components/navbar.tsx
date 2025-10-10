'use client';

import { useRouter } from 'next/navigation';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import ProfileMenu from './ProfileMenu';
import { useSession } from 'next-auth/react';
import { UserIdentity } from './UserProfile';

export default function Navbar() {
  const router: AppRouterInstance = useRouter();
  const { data: user, status } = useSession();

  return (
    <header className="w-full bg-[#faf9ee] px-6 py-5 shadow-sm border-b border-[#eeeeee]/30 top-0 z-50 fixed">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-3xl font-bold text-[#d2c2af] tracking-tight">G-Ware</div>

        {status === 'authenticated' && user ? (
          <>
            <header
              className="
          flex items-center justify-between
          rounded-lg border bg-card/50 p-4
        "
              aria-label="User header"
            >
              {/* Kiri: Avatar + username/nickname */}
              <UserIdentity
                username="johndoe"
                nickname="John D."
                imageUrl="/avatar-placeholder.png"
                size="md"
                className="max-w-[60%]"
              />
              {/* Kanan: ProfileMenu */}
              <ProfileMenu />
            </header>
          </>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/signin')}
                onMouseEnter={() => router.prefetch('/signin')}
                className="bg-[#a2af9b] text-white px-8 py-3 rounded-xl font-semibold text-sm tracking-wide shadow-md hover:shadow-lg hover:bg-[#8fa085] transform hover:-translate-y-0.5 transition-all duration-200 ease-out"
              >
                Login
              </button>
              <button
                onClick={() => router.push('/signin')}
                onMouseEnter={() => router.prefetch('/signin')}
                className="bg-[#a2af9b] text-white px-8 py-3 rounded-xl font-semibold text-sm tracking-wide shadow-md hover:shadow-lg hover:bg-[#8fa085] transform hover:-translate-y-0.5 transition-all duration-200 ease-out"
              >
                SignIn
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
