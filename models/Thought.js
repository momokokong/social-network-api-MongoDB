const { Schema, model, Types } = require('mongoose');

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

thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

// Initialize our thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
