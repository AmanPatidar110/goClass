var admin = require("firebase-admin");
const FirebaseCred = require("../firebase_credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(FirebaseCred),
});

function LoginMiddleware(req, res, next) {
  let authHeader = "" + req.headers["authorization"];

  let token = authHeader.substring(7);

  if (!authHeader.startsWith("Bearer ")) {
    res.status(403).send("Authorization token not found");
    return;
  }

  admin
    .auth()
    .verifyIdToken(token)
    .then((user) => {
      res.locals.userDetails = {
        id: user.uid,
        email: user.email,
        name: user.name
      };

      console.log("verified");
      next();
    })
    .catch((err) => {
      console.log("Auth Error ", err);
      res.status(403).send("Authorization failed");
      return;
    });
}

module.exports = LoginMiddleware;