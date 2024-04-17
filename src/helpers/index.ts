export const { VITE_APP_REACT_URL } = import.meta.env;

export function getCookie(cname: string) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return JSON.parse(c.substring(name.length, c.length));
    }
  }
  return "";
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setCookie(cname: string, cvalue: any) {
  document.cookie = cname + "=" + JSON.stringify(cvalue) + ";path=/";
}
