import http from "@utils/http";

export interface LoginReponse {
  username: string;
  password: string;
}

export async function login(data: any): Promise<R<LoginReponse>>  {
  return await http.postForm("/v3/login", data);
}
