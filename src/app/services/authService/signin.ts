import { SigninpData, SigninResponse } from "../../../interfaces/Signin";
import { httpClient } from "../../utils/httpClient";
import { sleep } from "../../utils/sleep";

export async function signin(body: SigninpData) {
  await sleep(1500);
  const { data } = await httpClient.post<SigninResponse>("/auth/signin", body);

  return data;
}
