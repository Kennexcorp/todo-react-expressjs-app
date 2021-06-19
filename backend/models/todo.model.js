const { mongoose } = require("mongoose");

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        completed: Boolean,
      },
      {
        timestamps: true,
      }
    );

    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });

    const Todo = mongoose.model('Todo', schema)

    return Todo;
}