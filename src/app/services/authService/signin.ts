import { SigninParams, SigninResponse } from "../../../interfaces/Signin";
import { httpClient } from "../../utils/httpClient";

export async function signin(body: SigninParams) {
  const { data } = await httpClient.post<SigninResponse>("/auth/signin", body);

  return data;
}
