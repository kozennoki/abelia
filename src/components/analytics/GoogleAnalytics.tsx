'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { getCookieConsent } from '@/lib/cookies';

interface GoogleAnalyticsProps {
  gaId: string;
}

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // 初期チェック
    const consent = getCookieConsent();
    if (consent?.analytics) {
      setShouldLoad(true);
    }

    // 同意イベントリスナー
    const handleConsentGranted = () => {
      const consent = getCookieConsent();
      if (consent?.analytics) {
        setShouldLoad(true);
      }
    };

    window.addEventListener('cookie-consent-granted', handleConsentGranted);

    return () => {
      window.removeEventListener('cookie-consent-granted', handleConsentGranted);
    };
  }, []);

  if (!gaId || !shouldLoad) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            'anonymize_ip': true,
            'cookie_flags': 'secure;samesite=strict'
          });
        `}
      </Script>
    </>
  );
}