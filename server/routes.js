const path = require("path");
const _pick = require("lodash/pick");

const services = require("./services");

module.exports = app => {
  app.get("/", (req, res) => {
    res.render("index", {
      program: {}
    });
  });

  app.get("/programs/:id", (req, res) => {
    const { id } = req.params;
    services.fetchCode(id, body => {
      if (!body) {
        res.redirect("/");
      }
      res.render("index", {
        program: body
      });
    });
  });

  app.post("/submit", (req, res) => {
    const data = _pick(req.body, ["language", "input", "sourceCode"]);
    services.submitCode(data, body => {
      res.send(body);
    });
  });

  app.post("/save", (req, res) => {
    const data = _pick(req.body, ["title", "language", "input", "sourceCode"]);
    services.saveCode(data, body => {
      res.send(body);
    });
  });
};
