export function apiUrl(path) {
  const baseUrl = process.env.REACT_APP_STICKER_API_BASE || "";

  return `${baseUrl}${path}`;
}
