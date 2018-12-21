const log = (json) => {
  console.log(JSON.stringify(json, undefined, 2));
};

module.exports = {
  log,
};
