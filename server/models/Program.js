var mongoose = require("mongoose");
const Schema = mongoose.Schema;
var programSchema = new Schema(
  {
    title: {
      type: String
    },
    sourceCode: {
      type: String
    },
    input: {
      type: String
    },
    language: {
      type: String,
      enum: ["python", "c", "cpp", "java", "javascript"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Program", programSchema);
