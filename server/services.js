const request = require("request");

const Program = require("./models/Program");

module.exports = {
  getExt(language) {
    const defaults = ["c", "java", "cpp"];
    if (defaults.includes(language)) {
      return language;
    }
    let ext = "";
    switch (language) {
      case "python":
        ext = "py";
        break;
      case "javascript":
        ext = "js";
        break;
    }
    return ext;
  },
  submitCode(data, cb) {
    data.ext = this.getExt(data.language);
    request(
      {
        url: `https://run.glot.io/languages/${data.language}/latest/`,
        method: "POST",
        json: true,
        headers: {
          Authorization: `Token ${process.env.GLOT_TOKEN}`,
          "Content-Type": "application/json"
        },
        json: {
          stdin: data.input,
          files: [
            {
              name: `main.${data.ext}`,
              content: data.sourceCode
            }
          ]
        }
      },
      (error, response, body) => {
        cb(body);
      }
    );
  },
  saveCode(data, cb) {
    const program = new Program();
    Object.assign(program, data);
    program.save(err => {
      if (err) {
        console.log(err);
      }
      cb(program);
    });
  },
  fetchCode(id, cb) {
    Program.findById(id, "title language input sourceCode").then(data => {
      cb(data);
    });
  }
};
