import { createEffect, createSignal } from "solid-js";

export const [token1, setToken1] = createSignal("");
export const [app_id, setAppId] = createSignal("");
export const [server_url, setServerUrl] = createSignal("");
createEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const token1_in_url = urlParams.get("token1");
  const app_id_in_url = urlParams.get("app_id");
  const endpoint_in_url = urlParams.get("endpoint");

  if (app_id_in_url) localStorage.setItem("app_id", app_id_in_url);
  if (endpoint_in_url) localStorage.setItem("server_url", endpoint_in_url);
  if (token1_in_url) {
    sessionStorage.setItem("token1", token1_in_url);
    // remove token1 from url
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  const token1 = sessionStorage.getItem("token1");
  const app_id_from_storage = localStorage.getItem("app_id");
  const server_url_from_storage = localStorage.getItem("server_url");

  setToken1(token1);
  setAppId(app_id_from_storage);
  setServerUrl(server_url_from_storage);
});
