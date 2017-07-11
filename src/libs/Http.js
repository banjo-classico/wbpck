import superagent from "superagent";
import nocache from "superagent-no-cache";
import promisePlugin from "superagent-promise-plugin";
import Alert from "./Alert";
import { API_PREFIX } from "../config";

const defaultHeaders = { Accept: "application/json" };
const decorateRequest = (req, parser, config, alertMethod) => req
  .use(promisePlugin)
  .use(nocache)
  .set({
    ...defaultHeaders,
    ...config.headers,
    Authorization: config.token ? `Bearer ${config.token}` : undefined,
  })
  .query(config.query)
  .send(config.data)
  .catch(err => {
    alertMethod(parser(err));
    return new Promise((res, rej) => rej(err));
  });
const decorateImageRequest = (req, parser, config, alertMethod) => req
  .use(promisePlugin)
  .use(nocache)
  .set({
    ...defaultHeaders,
    ...config.headers,
    Authorization: config.token ? `Bearer ${config.token}` : undefined,
  })
  .attach("avatar", config.file)
  .catch(err => {
    alertMethod(parser(err));
    return new Promise((res, rej) => rej(err));
  });


const get = (parser, alertMethod, prefix) =>
  (url, config = {}) =>
  decorateRequest(superagent.get(`${prefix}${url}`), parser, config, alertMethod);

const post = (parser, alertMethod, prefix) => (url, config = {}) =>
  decorateRequest(superagent.post(`${prefix}${url}`), parser, config, alertMethod);

const postImage = (parser, alertMethod, prefix) => (url, config = {}) =>
  decorateImageRequest(superagent.post(`${prefix}${url}`), parser, config, alertMethod);

const destroy = (parser, alertMethod, prefix) => (url, config = {}) =>
  decorateRequest(superagent.delete(`${prefix}${url}`), parser, config, alertMethod);

const HttpLib = (parser, alertMethod, prefix = API_PREFIX) => ({
  get: get(parser, alertMethod, prefix),
  post: post(parser, alertMethod, prefix),
  postImage: postImage(parser, alertMethod, prefix),
  delete: destroy(parser, alertMethod, prefix),
});

const GenericParserHttp = new HttpLib(
  () => "An Unexpected Error Occurred.<br/>Please Try Again.",
  Alert.error,
  API_PREFIX,
);
export default HttpLib;
export {
  GenericParserHttp,
};
