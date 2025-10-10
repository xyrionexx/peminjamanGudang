'use client';

import type React from 'react';

// ==========================
// 📦 REACT HOOKS & LIB DASAR
// ==========================
import { useEffect, useState } from 'react';

// ==========================
// 🌐 NEXT.JS (Routing, Auth, Komponen Built-in)
// ==========================
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';

// ==========================
// 🧰 UI COMPONENTS (shadcn/ui + Custom)
// ==========================
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loading_circle } from '@/components/Loading';
import notification from '@/components/notification';

// ==========================
// 🔌 API & TIPE DATA
// ==========================
import api from '@/config/axiosConfig';
import { AxiosResponse } from 'axios';

interface formData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
}

export default function AuthPage() {
  // ==========================
  // ✅ HOOKS NAVIGASI & SESSION
  // ==========================
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();

  // ==========================
  // 🧭 STATE UNTUK ALUR LOGIN / REGISTER
  // ==========================

  // Menyimpan URL sebelumnya (misal, untuk redirect setelah login)
  const [previousURL, setPreviousURL] = useState<string>('');

  // Menentukan mode tampilan form (true = Login, false = Register)
  const [isLogin, setIsLogin] = useState<boolean>(true);

  // Flag untuk menandakan proses sedang mengirim data ke server (loading state)
  const [sedangMengirimKeServer, setSedangMengirimKeServer] = useState<boolean>(false);

  // ==========================
  // 📝 STATE UNTUK DATA FORM
  // ==========================
  const [formData, setFormData] = useState<formData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
  });

  // ==========================
  // 🧭 EFFECTS: CEK SESSION & CALLBACK URL
  // ==========================

  // Cek apakah user sudah login → kalau iya langsung redirect ke previousURL / home
  useEffect(() => {
    if (status === 'authenticated') {
      router.push(previousURL || '/');
    }
  }, [status, previousURL, router]);

  // Ambil callbackURL dari query params saat pertama kali komponen mount
  useEffect(() => {
    setPreviousURL(searchParams.get('callbackUrl') ?? '');
  }, [searchParams]);

  // ==========================
  // 🌐 EFFECT: REGISTER DATA KE SERVER
  // ==========================
  useEffect(() => {
    if (sedangMengirimKeServer) {
      api
        .post('/register/', formData)
        .then((res: AxiosResponse) => {
          if (res.status !== 200) {
            throw new Error(res.statusText);
          }

          setIsLogin(true);

          return notification({
            pesan: 'yay, akun kamu berhasil dibuat',
            deskripsi: 'silahkan login',
            ok: true,
          });
        })
        .catch((Error) => {
          console.error(Error);
          notification({
            pesan: 'waduh ada yang salah nih',
            deskripsi: String(Error),
            ok: false,
          });
        })
        .finally(() => setSedangMengirimKeServer(false));
    }
  }, [sedangMengirimKeServer, formData]);

  // ==========================
  // 🧪 VALIDASI INPUT
  // ==========================

  // Cek format email (harus sesuai regex dan domain gmail)
  const cekFormatEmail = (): boolean => {
    const email = formData.email;

    // format hanya boleh huruf, angka, @, ., _
    const cekFormat = /^[a-zA-Z0-9@._]+$/.test(email);
    if (!cekFormat) return false;

    // domain harus gmail.com
    const cekDomain = email.split('@')[1];
    if (cekDomain !== 'gmail.com') return false;

    return true;
  };

  // Cek apakah semua input dalam form sudah terisi
  const ApakahSemuaInputTerisi = (): boolean => {
    if (!isLogin) {
      // cek untuk mode register
      return Object.values(formData).every(
        (data: (typeof formData)[keyof typeof formData]) => data !== ''
      );
    } else {
      // cek untuk mode login
      return (['username', 'email', 'password'] as (keyof typeof formData)[]).every(
        (key) => formData[key] !== ''
      );
    }
  };

  // Validasi semua input form sebelum submit
  const cekSemuaInput = (): boolean => {
    if (!ApakahSemuaInputTerisi()) {
      notification({
        pesan: 'Aduh itu ada input yang kosong',
        deskripsi: 'isi brok',
        ok: false,
      });
      return false;
    }

    if (!cekFormatEmail()) {
      notification({
        pesan: 'aduh itu emailnya isi yang bener',
        ok: false,
      });
      return false;
    }

    if (!isLogin) {
      const apakahPasswordSama = formData.password === formData.confirmPassword;

      if (!apakahPasswordSama) {
        notification({
          pesan: 'aduh itu password nya ngga sama',
          deskripsi: 'samain dulu sanan',
          ok: false,
        });
        return false;
      }
    }

    return true;
  };

  // ==========================
  // 📝 HANDLER FORM
  // ==========================

  // Submit form login/register
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cekSemuaInput()) return;

    if (!isLogin) {
      // Mode Register
      setSedangMengirimKeServer(true);
    } else {
      // Mode Login
      await signIn('credentials', {
        redirect: false,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
        callbackUrl: previousURL || '/',
      });
    }
  };

  // Update state form saat user ketik input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // ⏳ LOADING STATE
  // ==========================
  if (status === 'loading') {
    return <Loading_circle />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200">
        {/* Toggle Buttons */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-4 text-center font-semibold transition-colors ${
              isLogin
                ? 'text-[#41218b] border-b-2 border-[#41218b] bg-gray-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-4 text-center font-semibold transition-colors ${
              !isLogin
                ? 'text-[#41218b] border-b-2 border-[#41218b] bg-gray-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-600 text-sm">
              {isLogin
                ? 'Enter your credentials to sign in'
                : 'Fill in your details to get started'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className={!isLogin ? 'grid md:grid-cols-2 gap-4' : 'space-y-4'}>
              {/* Left Column: Username & Email */}
              <div className="space-y-4">
                {/* Username Field - Show for both login and register */}
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Right Column: Password & Confirm Password */}
              <div className="space-y-4">
                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Confirm Password field - Only show for register */}
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Forgot Password Link & Remember me checkbox - Only show for login */}
            {isLogin && (
              <div className="flex justify-between">
                <div className="flex gap-2 flex-row-reverse">
                  <label htmlFor="remember me" className="text-sm">
                    Remember Me
                  </label>
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => {
                      setFormData((prev) => {
                        return {
                          ...prev,
                          rememberMe: e.target.checked,
                        };
                      });
                    }}
                  />
                </div>

                <Link href="/forgot-password" className="text-sm text-[#41218b] hover:underline">
                  Forgot password?
                </Link>
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-[#41218b] hover:bg-[#331a6e]">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
        </div>

        {/* Back to Home Link */}
        <div className="flex justify-center border-t border-gray-200 py-4">
          <Link href="/" className="text-[#41218b] text-center font-semibold">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
