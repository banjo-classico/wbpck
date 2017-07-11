import { find } from 'lodash/fp';

const validTokens = [
  {"Token": "1"},
  {"Token": "3"}
]

const isValidToken = (token) => {
  if (find(({Token}) => Token === token, validTokens)) return true
  else return false
}
export default isValidToken;
