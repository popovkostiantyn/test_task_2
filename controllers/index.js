class Main {
  static index(req, res) {
    req.logger.info('Display start page');
    return res.render('index');
  }
}

module.exports = { Main };
