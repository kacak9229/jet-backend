module.exports = {
  port: process.env.PORT || 7000,
  database:
    process.env.DATABASE ||
    "mongodb://root:abc123@ds135217.mlab.com:35217/jetv1"
};
