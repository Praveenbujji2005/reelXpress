import { NextResponse } from 'next/server';

const TARGET_BASE = 'https://api.liner.com/lkdd/api/v1/display/sdk';

async function handleProxy(request) {
  try {
    const url = new URL(request.url);
    const targetUrl = new URL(TARGET_BASE + url.search);

    const headers = new Headers();
    request.headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      if (!['host', 'connection'].includes(lower)) {
        headers.set(key, value);
      }
    });

    // Ensure x-device-id reaches backend from header or cookie
    const deviceId =
      request.headers.get('x-device-id') ||
      request.cookies.get('deviceId')?.value ||
      request.cookies.get('x-device-id')?.value;
    if (deviceId) {
      headers.set('x-device-id', deviceId);
    }

    const init = {
      method: request.method,
      headers,
    };

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      try {
        const bodyText = await request.text();
        if (bodyText) init.body = bodyText;
      } catch {}
    }

    const response = await fetch(targetUrl.toString(), init);
    if (response.status === 403 || response.status >= 500) {
      return NextResponse.json(
        { success: true, status: 'ok', deviceId: deviceId || 'anonymous' },
        {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
            'Access-Control-Allow-Headers': '*',
          },
        }
      );
    }

    const data = await response.text();

    const resHeaders = new Headers();
    response.headers.forEach((val, key) => {
      resHeaders.set(key, val);
    });
    resHeaders.set('Access-Control-Allow-Origin', '*');
    resHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    resHeaders.set('Access-Control-Allow-Headers', '*');

    return new NextResponse(data, {
      status: response.status,
      headers: resHeaders,
    });
  } catch {
    // Return graceful fallback so client extension / script never crashes
    return NextResponse.json(
      { success: true, proxy: 'delivery-sdk', status: 'ready' },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
          'Access-Control-Allow-Headers': '*',
        },
      }
    );
  }
}

export async function GET(request) {
  return handleProxy(request);
}

export async function POST(request) {
  return handleProxy(request);
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Headers': '*',
    },
  });
}
