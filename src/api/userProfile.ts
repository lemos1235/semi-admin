import http from "@utils/http";

export async function getProfile() {
  await http.get("/userProfile/profile");
}
