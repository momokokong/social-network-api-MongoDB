const { Schema, model } = require('mongoose');

// Schema to create User model
// username: String, Unique, Required, Trimmed
// email: String, Unique, Required, match email regex
// thoughts: Array of _id values referencing the Thought model
// friends: Array of _id values self-referencing the User model
const userSchema = new Schema(
  {
    username: { 
      type: String,
      required: true, 
      unique: true, 
      trim: true 
    }, 
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ 
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// User instance returns a virtual value friendCount = number of firends the user has
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })

// initialize user model
const User = model('user', userSchema);

module.exports = User;
