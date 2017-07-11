const getHeight = (children, isFetching, itemHeight, emptyHeight) => {
  if (isFetching) return "0px";
  if (children.length) return `${children.length * itemHeight}px`;
  return `${emptyHeight}px`;
};

export {
  getHeight,
};
