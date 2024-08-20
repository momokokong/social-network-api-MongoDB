const { Schema, model, Types } = require('mongoose');


// Schema to create Reaction model.  This is used as a sub-document within Thought.  _id disabled because a custom reactionId is available.
// reactionId: Mongoose ObjectId. default is a new ObjectId.
// reactionBody: String, Required, max length 280
// username: String, Required
// createdAt: Date, default is current timestamp, formatted as toISOString()
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String, 
      required: true
    },
    createdAt: { 
      type: Date, 
      default: Date.now, 
      get: (time) => new Date(time).toISOString() 
    },
  },
  {
    _id: false,
  },
);

// Schema to create Thought model
// username: String, Required
// thoughtText: String, Required, length between 1 - 280
// createdAt: Date, default is current timestamp, formatted as toISOString()
// reactions: Array of reactions
const thoughtSchema = new Schema(
  {
    username: { 
      type: String, 
      required: true
    }, 
    thoughtText: { 
      type: String, 
      required: true, 
      minLength: 1, 
      maxLength: 280  
    },
    createdAt: { 
      type: Date, 
      default: Date.now, 
      get: (time) => new Date(time).toISOString() 
    },
    reactions: [ reactionSchema ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false, 
  }
);

// THought instance returns a virtual value reactionCount = number of reactions the thought has
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

// Initialize thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
