export function apiUrl(path) {
  const isLocalDev =
    typeof window !== "undefined" &&
    window.location.hostname === "localhost" &&
    window.location.port === "3000";

  const baseUrl =
    process.env.REACT_APP_STICKER_API_BASE ||
    (isLocalDev ? "http://localhost:8081" : "");

  return `${baseUrl}${path}`;
}
