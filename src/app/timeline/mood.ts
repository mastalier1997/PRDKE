import {User} from './user';
import {Timestamp} from './timestamp';
import {MoodDate} from './moodDate';

export interface Mood {
  id: string;
  emoji: string;
  text: string;
  stitchid: string;
  username: string;
  timestamp: Timestamp;
}
