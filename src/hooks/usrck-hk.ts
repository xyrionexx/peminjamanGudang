// ============================================================================
// IMPORTS
// ============================================================================

// React hooks untuk state management dan lifecycle
import { useState, useEffect, useRef } from 'react';

// Axios untuk HTTP requests dan type definitions
import axios, { AxiosResponse } from 'axios';

// Konfigurasi axios instance dengan base URL dan interceptors
import api from '@/config/axiosConfig';

// Next-auth hooks untuk session management
import { useSession } from 'next-auth/react';

// ============================================================================
// CUSTOM HOOK: useUsrck
// ============================================================================

/**
 * Custom hook untuk validasi user dan automatic token refresh
 *
 * @param token - Access token JWT untuk autentikasi
 * @returns Object berisi:
 *   - isLoading: Status loading saat melakukan validasi
 *   - isValidUser: Boolean apakah user valid dan terautentikasi
 *   - statusError: HTTP status code jika terjadi error (null jika sukses)
 *
 * Fitur:
 * - Validasi user berdasarkan access token
 * - Automatic token refresh saat mendapat 401 error
 * - Mencegah multiple refresh attempts secara bersamaan
 * - Optimisasi dengan mencegah re-check token yang sama
 */
export const useUsrck = (token: string) => {
  // ============================================================================
  // SESSION & STATE MANAGEMENT
  // ============================================================================

  // Get session data dan update function dari next-auth
  const { data: session, update } = useSession();

  // State untuk loading indicator
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // State untuk status validitas user
  const [isValidUser, setIsValidUser] = useState<boolean>(false);

  // State untuk menyimpan HTTP error status code
  const [statusError, setStatusError] = useState<number | null>(null);

  // ============================================================================
  // REFS - Untuk mencegah race conditions dan re-renders
  // ============================================================================

  // Ref untuk mencegah multiple refresh token attempts secara bersamaan
  const isRefreshingRef = useRef(false);

  // Ref untuk menyimpan token terakhir yang di-check (optimisasi)
  const lastTokenRef = useRef<string>('');

  // ============================================================================
  // EFFECT 1: USER VALIDATION
  // ============================================================================

  /**
   * Effect untuk validasi user dengan memanggil endpoint /user/
   * Berjalan setiap kali token berubah
   */
  useEffect(() => {
    // Flag untuk cleanup - mencegah state update setelah unmount
    let isMounted = true;

    // Optimisasi: Skip check jika token sama dengan sebelumnya
    if (lastTokenRef.current === token) {
      return;
    }

    /**
     * Async function untuk check validitas user
     */
    const checkUser = async () => {
      // Early return jika token kosong
      if (!token) {
        if (isMounted) {
          setIsValidUser(false);
          setIsLoading(false);
          setStatusError(null);
        }
        return;
      }

      // Set loading state dan simpan token ke ref
      setIsLoading(true);
      lastTokenRef.current = token;

      try {
        // Call API untuk validasi user dengan Bearer token
        const res: AxiosResponse<{ isAuthenticated: boolean }> = await api.get('/user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update state jika component masih mounted
        if (isMounted) {
          // User valid jika status 200 DAN isAuthenticated = true
          setIsValidUser(res.status === 200 && res.data.isAuthenticated === true);
          setStatusError(null);
        }
      } catch (error) {
        if (isMounted) {
          // Validasi apakah error dari Axios
          if (!axios.isAxiosError(error)) {
            setIsValidUser(false);
            return;
          }

          // Set user invalid dan simpan error status
          setIsValidUser(false);
          setStatusError(error.response?.status || null);
        }
      } finally {
        // Stop loading state
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Jalankan validasi
    checkUser();

    // Cleanup function - set flag saat unmount
    return () => {
      isMounted = false;
    };
  }, [token]); // Dependency: re-run saat token berubah

  // ============================================================================
  // EFFECT 2: AUTOMATIC TOKEN REFRESH
  // ============================================================================

  /**
   * Effect untuk automatic refresh token saat mendapat 401 Unauthorized
   * Menggunakan refresh token dari session untuk mendapat access token baru
   */
  useEffect(() => {
    // Flag untuk cleanup
    let isMounted = true;

    /**
     * Async function untuk refresh access & refresh tokens
     */
    const refreshTokens = async () => {
      // Guard clauses - skip refresh jika kondisi tidak terpenuhi
      if (statusError !== 401) return; // Hanya refresh pada 401 error
      if (isRefreshingRef.current) return; // Cegah multiple refresh bersamaan
      if (!session?.user.refreshToken) return; // Pastikan refresh token tersedia

      // Set flag untuk mencegah concurrent refresh attempts
      isRefreshingRef.current = true;

      try {
        // Call API untuk refresh tokens
        const res = await api.post('/token/refresh/', {
          refresh: session.user.refreshToken,
        });

        // Validasi response dan update session dengan tokens baru
        if (isMounted && res.status === 200 && 'access' in res.data && 'refresh' in res.data) {
          // Update session next-auth dengan tokens baru
          await update({
            accessToken: res.data.access,
            refreshToken: res.data.refresh,
          });

          // Reset error status - akan trigger re-check user di effect pertama
          setStatusError(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Token refresh failed:', error);
          // Biarkan error tetap 401 agar component bisa redirect ke login
        }
      } finally {
        // Reset refresh flag
        if (isMounted) {
          isRefreshingRef.current = false;
        }
      }
    };

    // Jalankan refresh logic
    refreshTokens();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [statusError, session?.user.refreshToken, update]); // Dependencies untuk refresh logic

  // ============================================================================
  // RETURN VALUES
  // ============================================================================

  return { isLoading, isValidUser, statusError };
};
