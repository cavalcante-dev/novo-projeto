const enviarErro = (res, msg, code) => {
  const error = Error(msg);
  error.status = code;
  return res.status(error.status).send({
    error: error.message,
  });
};

module.exports = {
    enviarErro
}