import { SigninpData, SigninResponse } from "../../../interfaces/Signin";
import { httpClient } from "../../utils/httpClient";

export async function signin(body: SigninpData) {
  const { data } = await httpClient.post<SigninResponse>("/auth/signin", body);

  return data;
}
