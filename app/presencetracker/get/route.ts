import { NextRequest, NextResponse } from 'next/server';
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '@/lib/presencetracker-links';

export function GET(request: NextRequest) {
  const ua = request.headers.get('user-agent') ?? '';
  const isIOS = /iPad|iPhone|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);

  if (isIOS) {
    return NextResponse.redirect(APP_STORE_URL);
  }

  if (isAndroid && GOOGLE_PLAY_URL) {
    return NextResponse.redirect(GOOGLE_PLAY_URL);
  }

  return NextResponse.redirect(new URL('/en/presencetracker_details', request.url));
}
