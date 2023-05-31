import http from "@utils/http";

export async function getProfile() {
  await http.get("/v3/userProfile/profile");
}
