const delay = (ms) => new Promise(resolve => window.setTimeout(() => resolve(true), ms));

export default delay;
