from django.core.management.base import BaseCommand
from django.conf import settings

from django.db import connection

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'


    def handle(self, *args, **options):
        # Ensure the connection is established
        with connection.cursor():
            db = connection.connection['octofit_db']
        users = db['users']
        teams = db['teams']
        activities = db['activities']
        leaderboard = db['leaderboard']
        workouts = db['workouts']

        # Clear existing data
        users.delete_many({})
        teams.delete_many({})
        activities.delete_many({})
        leaderboard.delete_many({})
        workouts.delete_many({})

        # Teams
        marvel = {'_id': 1, 'name': 'Team Marvel'}
        dc = {'_id': 2, 'name': 'Team DC'}
        teams.insert_many([marvel, dc])

        # Users
        user_data = [
            {'_id': 1, 'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team_id': 1},
            {'_id': 2, 'name': 'Captain America', 'email': 'cap@marvel.com', 'team_id': 1},
            {'_id': 3, 'name': 'Batman', 'email': 'batman@dc.com', 'team_id': 2},
            {'_id': 4, 'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'team_id': 2},
        ]
        users.insert_many(user_data)
        # Unique index on email
        users.create_index('email', unique=True)

        # Activities
        activity_data = [
            {'_id': 1, 'user_id': 1, 'type': 'run', 'distance': 5, 'duration': 30},
            {'_id': 2, 'user_id': 2, 'type': 'cycle', 'distance': 20, 'duration': 60},
            {'_id': 3, 'user_id': 3, 'type': 'swim', 'distance': 2, 'duration': 40},
            {'_id': 4, 'user_id': 4, 'type': 'run', 'distance': 10, 'duration': 50},
        ]
        activities.insert_many(activity_data)

        # Workouts
        workout_data = [
            {'_id': 1, 'user_id': 1, 'workout': 'Pushups', 'reps': 50},
            {'_id': 2, 'user_id': 2, 'workout': 'Situps', 'reps': 60},
            {'_id': 3, 'user_id': 3, 'workout': 'Pullups', 'reps': 20},
            {'_id': 4, 'user_id': 4, 'workout': 'Squats', 'reps': 80},
        ]
        workouts.insert_many(workout_data)

        # Leaderboard
        leaderboard_data = [
            {'_id': 1, 'user_id': 1, 'points': 100},
            {'_id': 2, 'user_id': 2, 'points': 90},
            {'_id': 3, 'user_id': 3, 'points': 110},
            {'_id': 4, 'user_id': 4, 'points': 95},
        ]
        leaderboard.insert_many(leaderboard_data)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
