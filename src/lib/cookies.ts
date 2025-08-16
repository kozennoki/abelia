/**
 * クッキー同意管理のユーティリティ関数
 */

export interface CookieConsentState {
  analytics: boolean;
  necessary: boolean;
}

export interface CookieConsentData extends CookieConsentState {
  expiry: string;
}

const COOKIE_CONSENT_KEY = 'cookie-consent';
const COOKIE_EXPIRY_DAYS = 365;

/**
 * クッキー同意状態を取得
 */
export function getCookieConsent(): CookieConsentState | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!saved) return null;
    
    const parsed: CookieConsentData = JSON.parse(saved);
    
    // 有効期限をチェック
    if (parsed.expiry) {
      const expiry = new Date(parsed.expiry);
      if (expiry < new Date()) {
        localStorage.removeItem(COOKIE_CONSENT_KEY);
        return null;
      }
    }
    
    return {
      analytics: parsed.analytics || false,
      necessary: parsed.necessary !== false,
    };
  } catch {
    return null;
  }
}

/**
 * クッキー同意状態を保存
 */
export function setCookieConsent(consent: CookieConsentState): void {
  if (typeof window === 'undefined') return;
  
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);
  
  const consentWithExpiry: CookieConsentData = {
    ...consent,
    expiry: expiryDate.toISOString(),
  };

  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentWithExpiry));
  
  // Google Analyticsの初期化イベントを発火
  if (consent.analytics) {
    window.dispatchEvent(new CustomEvent('cookie-consent-granted'));
  }
}

/**
 * クッキー同意状態をリセット
 */
export function resetCookieConsent(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(COOKIE_CONSENT_KEY);
}

/**
 * アナリティクスクッキーの同意状態をチェック
 */
export function hasAnalyticsConsent(): boolean {
  const consent = getCookieConsent();
  return consent?.analytics === true;
}

/**
 * 必要なクッキーの同意状態をチェック
 */
export function hasNecessaryConsent(): boolean {
  const consent = getCookieConsent();
  return consent?.necessary !== false;
}