import http from "@utils/http";

export async function login(data: any): Promise<R<string>> {
  return await http.postForm("/v3/login", data);
}
