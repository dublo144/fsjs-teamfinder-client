import { backendUrl } from "../config/settings";
import { deviceStorage } from "./deviceStorage";

const handleHttpErrors = (res) => {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
};

const makeOptions = async (method, body = null, token = true) => {
  const opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (token) {
    const token = await deviceStorage.read("jwtToken");
    opts.headers["Authentication"] = `Bearer ${token}`;
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
};

const fetchData = async (url, opts) => {
  const res = await fetch(`${backendUrl}${url}`, opts);
  return handleHttpErrors(res);
};

export const apiUtils = {
  fetchData: fetchData,
  handleHttpErrors: handleHttpErrors,
  makeOptions: makeOptions,
};
