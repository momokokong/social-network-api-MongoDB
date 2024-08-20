const connection = require('../config/connection');
const { User, Thought } = require('../models');
connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  
  const seedData = async () => {
    try {
      // wipe out existing data 
      await User.deleteMany({});
      await Thought.deleteMany({});
  
      // Seed users.
      let users = await User.create([
        { username: 'user1', email: 'user1@example.com' },
        { username: 'user2', email: 'user2@example.com' },
        { username: 'user3', email: 'user3@example.com' },
        { username: 'koko', email: 'koko@koko.com' },
      ]);
  
      // Create thoughts with various length of reactions
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
        { username: users[3].username, thoughtText: 'I miss you, Biru <3.  Hope you still sleep warm.', reactions: [{reactionBody: 'You are the black cat of my life.', username: users[3].username}, {reactionBody: 'Biru attack', username: users[2].username}]  },
        { username: users[3].username, thoughtText: 'Biru the cat was feisty.'}
      ]);
      
      // Associate User with Thoughts
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

