import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getTranslations } from 'next-intl/server';
import { SITE_NAME } from '@/lib/seo';

export const runtime = 'nodejs';
export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type Props = { params: Promise<{ locale: string }> };

export default async function Image({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  const logoData = await readFile(join(process.cwd(), 'public/images/logo.png'));
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
          backgroundColor: '#07080f',
          backgroundImage:
            'radial-gradient(ellipse at 50% 10%, rgba(224,48,40,0.45) 0%, rgba(224,48,40,0) 50%), ' +
            'radial-gradient(ellipse at 15% 90%, rgba(34,168,85,0.35) 0%, rgba(34,168,85,0) 45%), ' +
            'radial-gradient(ellipse at 85% 90%, rgba(27,117,224,0.35) 0%, rgba(27,117,224,0) 45%)',
        }}
      >
        <img
          src={logoSrc}
          width={300}
          height={316}
          style={{ borderRadius: 40 }}
        />
        <div
          style={{
            display: 'flex',
            fontSize: 34,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.8)',
          }}
        >
          {t('tagline')}
        </div>
      </div>
    ),
    { ...size }
  );
}
