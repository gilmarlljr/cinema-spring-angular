// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};
export const wsUrl = "//localhost:5000"

export const wsHost = {
  auth: wsUrl + "/oauth/token",
  user: wsUrl + "/api/user",
  movie: wsUrl + "/api/movie",
  session: wsUrl + "/api/session",
  room: wsUrl + "/api/room"

}
