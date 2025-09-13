"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@monorepo/design-system/src/components/atoms/Button/Button';
import { ApiClient, ShopDTO, GetShopsParams } from '@monorepo/api-client';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, logout, loading, isAuthenticated } = useAuth();
  const [shops, setShops] = useState<ShopDTO[]>([]);
  const [shopsLoading, setShopsLoading] = useState(true);
  const [shopsError, setShopsError] = useState<string | null>(null);
  const router = useRouter();

  const apiClient = ApiClient.create({
    baseURL: '/api/proxy',
    onUnauthorized: () => {
      console.log('Unauthorized (from Dashboard). Redirecting to login...');
      router.push('/login');
    }
  });

  useEffect(() => {
    if (!isAuthenticated) {
      setShopsLoading(false);
      return;
    }

    const fetchShops = async () => {
      try {
        setShopsLoading(true);
        setShopsError(null);
        const params: GetShopsParams = { PageNumber: 1, PageSize: 5 };
        const fetchedShops = await apiClient.shop.getShops(params);
        console.log('Fetched shops:', fetchedShops); // برای دیباگ
        setShops(fetchedShops);
      } catch (err: any) {
        setShopsError('Failed to fetch shops. Check API base URL, authentication, and CORS.');
        console.error(err);
        if (err.response?.status === 401) {
          router.push('/login');
        }
      } finally {
        setShopsLoading(false);
      }
    };

    fetchShops();
  }, [isAuthenticated, router]);

  if (loading) {
    return <p style={{ color: 'black' }}>Loading user data...</p>;
  }

  if (!isAuthenticated) {
    return <p style={{ color: 'red' }}>Please login to view the dashboard.</p>;
  }

  return (
    <div style={{ padding: '2rem', background: 'white', color: 'black' }}>
      <h1>Welcome to the Dashboard, {user?.name || 'Admin'}!</h1>
      <p>You are now logged in.</p>
      <Button variant="danger" onClick={logout}>Logout</Button>

      <h2 style={{ marginTop: '2rem' }}>Shop List:</h2>
      {shopsLoading && <p>Loading shops...</p>}
      {shopsError && <p style={{ color: 'red' }}>Error: {shopsError}</p>}
      {!shopsLoading && !shopsError && (
        <>
          {shops.length > 0 ? (
            <ul>
              {shops.map((shop) => (
                <li key={shop.id} style={{ color: 'black' }}>
                  {shop.shopTitle || 'Untitled Shop'} (Owner: {shop.creator?.name || 'N/A'})
                </li>
              ))}
            </ul>
          ) : (
            <p>No shops found or API returned an empty list.</p>
          )}
        </>
      )}
    </div>
  );
}
