const PLACEHOLDER_IMAGE = '/images/logo/AlshrouqSchoolLogo.png';

export function resolveMediaUrl(
  path: string | null | undefined,
  apiBaseUrl: string
): string {
  if (!path?.trim()) {
    return PLACEHOLDER_IMAGE;
  }
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const base = apiBaseUrl.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function placeholderImageUrl(): string {
  return PLACEHOLDER_IMAGE;
}
