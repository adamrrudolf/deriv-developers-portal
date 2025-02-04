import { createEffect, createSignal } from "solid-js";

import { app_id, server_url, token1 } from "./storageSignals";
import { send } from "./stateSignal";

export const [oauthUrl, setOauthUrl] = createSignal("");

createEffect(() => {
  const is_production = window.location.hostname === "api.deriv.com";
  const production_app_id = 31063;
  if (is_production) {
    localStorage.setItem("app_id", production_app_id);
    localStorage.setItem("server_url", "https://green.binaryws.com");
  }
  const loginUrl = () => {
    if (is_production) {
      return `https://oauth.deriv.com/oauth2/authorize?app_id=${production_app_id}&l=EN&brand=deriv`;
    }
    if (server_url()) {
      return `https://${server_url()}/oauth2/authorize?app_id=${app_id()}&l=EN&brand=deriv`;
    }
    return `https://oauth.deriv.com/oauth2/authorize?app_id=${app_id()}&l=EN&brand=deriv`;
  };
  setOauthUrl(loginUrl());
  if (token1()) {
    send("LOGIN");
  }
});
