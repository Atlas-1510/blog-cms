import { b64utoutf8, KJUR } from "jsrsasign";

export default function unpackJWT(jwt) {
  return KJUR.jws.JWS.readSafeJSONString(b64utoutf8(jwt.split(".")[1]))
    .tokenPayload;
}
