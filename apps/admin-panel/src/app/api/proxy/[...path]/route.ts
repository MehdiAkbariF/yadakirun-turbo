// file: apps/admin-panel/src/app/api/proxy/[...path]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_BASE_URL");
}

async function handler(req: NextRequest) {
  try {
    const path = req.nextUrl.pathname.replace('/api/proxy', '');
    const destinationUrl = `${API_BASE_URL}${path}${req.nextUrl.search}`;
    
    const headersToApi = new Headers(req.headers);
    headersToApi.delete('host');

    const apiResponse = await fetch(destinationUrl, {
      method: req.method,
      headers: headersToApi,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : null,
      // @ts-ignore
      duplex: 'half',
      redirect: 'manual',
    });

    const responseHeaders = new Headers();
    apiResponse.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'set-cookie') {
        responseHeaders.set(key, value);
      }
    });
    
    const response = new NextResponse(apiResponse.body, {
      status: apiResponse.status,
      statusText: apiResponse.statusText,
      headers: responseHeaders,
    });

    const setCookieHeaders = (apiResponse.headers as any).getSetCookie?.() || [];

    if (setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookieStr: string) => {
        if (!cookieStr) return;
        const parsedCookie = parse(cookieStr);
        const [cookieName, cookieValue] = Object.entries(parsedCookie)[0];
        
        if (cookieName && cookieValue) {
          response.cookies.set({
            name: cookieName,
            value: cookieValue,
            path: '/',
            httpOnly: 'HttpOnly' in parsedCookie,
            secure: 'Secure' in parsedCookie,
            sameSite: (parsedCookie.SameSite?.toLowerCase() as 'lax' | 'strict' | 'none') || 'lax',
            expires: parsedCookie.Expires ? new Date(parsedCookie.Expires) : undefined,
          });
        }
      });
    }

    return response;

  } catch (error) {
    console.error('API Proxy Error:', error);
    return new NextResponse(JSON.stringify({ error: 'Proxy error' }), { status: 502 });
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;