const passport = require("passport");
const { errorMessages } = require("../services//errors/custom-error.js");
const UserDTO = require("../dto/user.dto.js");
//const userRepository = require("../repositories/user.repository.js");

exports.register = (req, res, next) => {
  passport.authenticate("register", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      const errorMessage =
        errorMessages.userErrors[info.errorCode] || "Error desconocido.";
      return res.status(400).json({ error: errorMessage });
    }
    res.redirect("/login");
  })(req, res, next);
};

exports.login = (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      const errorMessage =
        errorMessages.userErrors[info.errorCode] || "Error desconocido.";
      return res.status(400).json({ error: errorMessage });
    }
    res.redirect("/products");
  })(req, res, next);
};

exports.githubCallback = (req, res, next) => {
  passport.authenticate("github", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      const errorMessage =
        errorMessages.userErrors[info.errorCode] || "Error desconocido.";
      return res.status(400).json({ error: errorMessage });
    }
    res.redirect("/products");
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};

exports.getCurrentUser = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "No autorizado" });
  }
  const userDTO = new UserDTO(req.user);
  res.json(userDTO);
};
