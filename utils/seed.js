const connection = require('../config/connection');
const { User, Thought } = require('../models');
connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  
  const seedData = async () => {
    try {
      // Clear existing data (optional)
      await User.deleteMany({});
      await Thought.deleteMany({});
  
      // Create 3 users
      let users = await User.create([
        { username: 'user1', email: 'user1@example.com' },
        { username: 'user2', email: 'user2@example.com' },
        { username: 'user3', email: 'user3@example.com' },
      ]);
  
      // Create 10 thoughts, linking to the users
      const thoughts = await Thought.create([
        { username: users[0].username, thoughtText: 'Thought 1', reactions: [{reactionBody: 'Reaction 1', username: users[1].username}, {reactionBody: 'Reaction 2', username: users[2].username}] },
        { username: users[1].username, thoughtText: 'Thought 2', reactions: [{reactionBody: 'Reaction 1', username: users[1].username}, {reactionBody: 'Reaction 2', username: users[2].username}]  },
        { username: users[2].username, thoughtText: 'Thought 3', reactions: [{reactionBody: 'Reaction 1', username: users[1].username}, {reactionBody: 'Reaction 2', username: users[2].username}]  },
        { username: users[0].username, thoughtText: 'Thought 4', reactions: [{reactionBody: 'Reaction 1', username: users[0].username}]  },
        { username: users[1].username, thoughtText: 'Thought 5', reactions: [{reactionBody: 'Reaction 1', username: users[1].username}]  },
        { username: users[2].username, thoughtText: 'Thought 6', reactions: [{reactionBody: 'Reaction 1', username: users[2].username}]  },
        { username: users[0].username, thoughtText: 'Thought 7', reactions: [{reactionBody: 'Reaction 1', username: users[1].username}, {reactionBody: 'Reaction 2', username: users[2].username}]  },
        { username: users[1].username, thoughtText: 'Thought 8', reactions: [{reactionBody: 'Reaction 1', username: users[1].username}, {reactionBody: 'Reaction 0', username: users[0].username}]  },
        { username: users[2].username, thoughtText: 'Thought 9', reactions: [{reactionBody: 'Reaction 0', username: users[0].username}, {reactionBody: 'Reaction 2', username: users[2].username}]  },
        { username: users[0].username, thoughtText: 'Thought 10'},
      ]);
      thoughts.forEach(async (thought) => {
        await User.findOneAndUpdate({username: thought.username}, { $addToSet: { thoughts: thought._id }});
      });
      
      users = await User.find();
  
      console.table(users);
      console.table(thoughts);
      console.log('Seed data created successfully!');
    } catch (err) {
      console.error('Error seeding data:', err);
    }
  };
  await seedData();
  process.exit(0);
});

