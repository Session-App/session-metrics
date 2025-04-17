import { api } from "boot/axios";

export function login(credentials) {
    return new Promise((resolve, reject) => {
      return api
        .post("api/login", credentials)
        .then(({ data }) => {
          if (data !== undefined) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('refreshToken', data.refresh_token)
            resolve(data.token);
          }
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

export function getUsersActivity(payload) {
    return new Promise((resolve, reject) => {
        api
        .get("metrics/users?from=" + payload.from + "&to=" + payload.to)
        .then(({ data }) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export function getSpotsActivity(payload) {
    return new Promise((resolve, reject) => {
        api
        .get("metrics/spots?from=" + payload.from + "&to=" + payload.to)
        .then(({ data }) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export function getSessionsActivity(payload) {
    return new Promise((resolve, reject) => {
        api
        .get("metrics/sessions?from=" + payload.from + "&to=" + payload.to)
        .then(({ data }) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}