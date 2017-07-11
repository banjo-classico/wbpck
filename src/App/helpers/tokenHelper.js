import { compose, isEqual, keys, sortBy } from "lodash/fp";

const V1_KEYS = ["token", "expiryTime"];
const V2_KEYS = ["token", "expiryTime", "email"];

const isVersion = versionNumberKeys => loginInfo => compose(
  isEqual(sortBy(e => e, versionNumberKeys)),
  sortBy(e => e),
  keys,
)(loginInfo);

const isV1 = isVersion(V1_KEYS);
const isV2 = isVersion(V2_KEYS);

export {
  isV1,
  isV2,
};
