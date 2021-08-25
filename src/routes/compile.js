export default (compiler) => {
  return (req, res) => {
    let body = req.body;
    let code = body.code || body.src;
    let data = body.data;
    let config = body.config || {};
    if (!code || !data) {
      res.sendStatus(400);
    } else {
      compiler.compile(code, data, config, (err, val) => {
        if (err && err.length) {
          res.status(500).json({
            error: err
          });
        } else {
          res.status(200).json({
            data: val
          });
        }
      });
    }
  };
};
