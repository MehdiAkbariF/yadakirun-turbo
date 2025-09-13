// apps/admin-panel/src/app/(auth)/login/page.tsx
"use client";

import React, { useState } from 'react';
import { Button } from '@monorepo/design-system/src/components/atoms/Button/Button';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login, verifyCode, error, loading, isAuthenticated } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'sendCode' | 'verifyCode'>('sendCode');
const [message, setMessage] = useState<string | null | undefined>(undefined);
  const router = useRouter();

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);


  const handleSendCode = async () => {
    setMessage(null);
    const result = await login(phoneNumber);
    if (result.success) {
      setMessage(result.message);
      setStep('verifyCode');
      if (result.code) {
        console.log("DEBUG: Verification Code from API:", result.code);
      }
    } else {
      setMessage(result.message);
    }
  };

  const handleVerifyCode = async () => {
    setMessage(null);
    const result = await verifyCode(phoneNumber, code);
    if (result.success) {
      setMessage("Login successful! Redirecting...");
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'white' }}>
      <h1 style={{ color: 'black' }}>Login to Admin Panel</h1>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {message && <p style={{ color: 'blue' }}>{message}</p>}

      {step === 'sendCode' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid gray', width: '100%' }}
          />
          <Button variant="primary" onClick={handleSendCode} disabled={loading}>
            {loading ? 'Sending...' : 'Send Verification Code'}
          </Button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
          <input
            type="text"
            placeholder="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid gray', width: '100%' }}
          />
          <Button variant="primary" onClick={handleVerifyCode} disabled={loading}>
            {loading ? 'Verifying...' : 'Verify Code'}
          </Button>
        </div>
      )}
    </div>
  );
}