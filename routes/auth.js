const router = require("express").Router();
const { createUser, login } = require("../controllers/users");

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

router.post("/signup", (req, res, next) => {
  console.log("Signup route hit");
  console.log("Request body:", req.body);
  createUser(req, res).catch(next);
});

router.post("/signin", (req, res, next) => {
  console.log("Signin route hit");
  login(req, res).catch(next);
});

module.exports = router;
