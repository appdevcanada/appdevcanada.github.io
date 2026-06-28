import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'fr', 'es', 'pt', 'zh'];
const defaultLocale = 'en';

function detectLocale(request: NextRequest): string {
  const acceptLang = request.headers.get('accept-language') ?? '';
  for (const tag of acceptLang.split(',')) {
    const lang = tag.split(';')[0].trim().toLowerCase().slice(0, 2);
    if (locales.includes(lang)) return lang;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
