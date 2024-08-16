const VerifyToken = (req, res) => {
  try {
      var accessToken = "TOKENVISBOT";
      var token = req.query["hub.verify_token"];
      var challenge = req.query["hub.challenge"];

      if (challenge != null && token != null && token === accessToken) {
          res.send(challenge);
      } else {
          res.status(400).send();
      }
  } catch (e) {
      res.status(400).send();
  }
};

module.exports = { VerifyToken };
