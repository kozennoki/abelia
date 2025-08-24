"use client";

import { useState, useEffect } from "react";
import {
  getCookieConsent,
  setCookieConsent,
  type CookieConsentState,
} from "@/lib/cookies";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const savedConsent = getCookieConsent();
    if (!savedConsent) {
      setIsVisible(true);
    } else {
      // 同意済みの場合、Google Analyticsを初期化
      if (savedConsent.analytics) {
        window.dispatchEvent(new CustomEvent("cookie-consent-granted"));
      }
    }
  }, []);

  const saveConsent = (consentData: CookieConsentState) => {
    setCookieConsent(consentData);
    setIsVisible(false);
  };

  const handleAccept = () => {
    saveConsent({ analytics: true, necessary: true });
  };

  const handleReject = () => {
    saveConsent({ analytics: false, necessary: true });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-border shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">
              Cookieの使用について
            </h3>
            <p className="text-sm text-muted-foreground">
              当サイトでは個人を特定しない統計データとしてCookieを取得しています。より良いサービスの提供のためCookieの取得と利用に同意をお願いいたします。
            </p>
          </div>

          <div className="flex flex-row gap-2 justify-center">
            <button
              onClick={handleAccept}
              className="bg-primary hover:bg-accent text-white border border-primary py-3 px-9 rounded-md duration-300"
            >
              同意する
            </button>
            <button
              onClick={handleReject}
              className="bg-background hover:bg-muted-background text-primary border border-primary py-3 px-6 rounded-md duration-300"
            >
              拒否
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
