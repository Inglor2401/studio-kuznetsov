// ============================================================
// URL helper — prefixes paths with import.meta.env.BASE_URL
// для корректной работы под GitHub Pages /studio-kuznetsov
// ============================================================

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/**
 * Prepends base path to a root-relative URL.
 * - Absolute URLs (http/https) — passed through
 * - Anchor (#), mailto:, tel: — passed through
 * - Root-relative `/foo` → `${BASE}/foo`
 * - Empty string → BASE (root of site)
 */
export function url(path: string | undefined | null): string {
  if (!path) return BASE || '/';
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith('#') || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path;
  }
  // Root link "/" → возвращаем BASE без trailing slash (соответствует trailingSlash: 'never').
  // На GitHub Pages работает в обе стороны, но dev-сервер строго трактует слеш и отдаёт 404.
  if (path === '/') return BASE || '/';
  if (!path.startsWith('/')) path = '/' + path;
  return BASE + path;
}
