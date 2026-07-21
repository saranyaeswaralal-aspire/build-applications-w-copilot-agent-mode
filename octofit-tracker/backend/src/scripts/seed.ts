import { connectDatabase, disconnectDatabase } from '../config/database';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();
    console.log('Seed the octofit_db database with test data');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      { name: 'Maya Chen', email: 'maya@example.com', role: 'admin', fitnessLevel: 'advanced' },
      { name: 'Jordan Lee', email: 'jordan@example.com', role: 'coach', fitnessLevel: 'intermediate' },
      { name: 'Alicia Gomez', email: 'alicia@example.com', role: 'member', fitnessLevel: 'beginner' },
    ]);

    await Team.create({
      name: 'North Stars',
      sport: 'CrossFit',
      members: [users[0]._id, users[1]._id, users[2]._id],
      captain: users[0]._id,
    });

    await Activity.insertMany([
      { user: users[0]._id, type: 'Run', durationMinutes: 35, calories: 420, date: new Date('2026-07-20') },
      { user: users[1]._id, type: 'Cycling', durationMinutes: 50, calories: 510, date: new Date('2026-07-21') },
      { user: users[2]._id, type: 'Yoga', durationMinutes: 30, calories: 180, date: new Date('2026-07-21') },
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, points: 980, rank: 1 },
      { user: users[1]._id, points: 840, rank: 2 },
      { user: users[2]._id, points: 760, rank: 3 },
    ]);

    await Workout.insertMany([
      { title: 'HIIT Burn', description: 'Short high-intensity intervals for explosive endurance.', difficulty: 'hard', durationMinutes: 25, targetMuscleGroup: 'Full Body' },
      { title: 'Core Strength', description: 'Steady core routine with planks and dead bugs.', difficulty: 'moderate', durationMinutes: 20, targetMuscleGroup: 'Core' },
      { title: 'Recovery Flow', description: 'Gentle mobility and stretching routine.', difficulty: 'easy', durationMinutes: 15, targetMuscleGroup: 'Mobility' },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await disconnectDatabase();
  }
}

seedDatabase();
