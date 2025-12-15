
import { UserParkHistory } from './types';

/**
 * USER_LOGS
 * 
 * Database of park visits.
 * 
 * Rating Key:
 * 3 - Worth a dedicated trip (Destination)
 * 2 - Worth a detour (Excellent)
 * 1 - A pleasant stop (Good)
 * 0 - A learning experience (Seen it, done it)
 */

export const USER_LOGS: UserParkHistory[] = [
  {
    parkId: 'acadia',
    rating: 2,
    visits: [{ date: '2025-10-13', notes: 'The wild caught lobsters were amazing! The bee hive trail is stunning (and scary).' }]
  },
  {
    parkId: 'arches',
    rating: 2,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'bryce-canyon',
    rating: 2,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'canyonlands',
    rating: 2,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'carlsbad-caverns',
    rating: 2,
    visits: [{ date: '2025-12-12', notes: 'It\'s not just a cavern like others. The Big Room is huge with a wide variety of formations, and the lighting is also interesting.' }]
  },
  {
    parkId: 'channel-islands',
    rating: 2,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'crater-lake',
    rating: 2,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'denali',
    rating: 2,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'glacier',
    rating: 2,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'grand-canyon',
    rating: 3,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'grand-teton',
    rating: 3,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'great-basin',
    rating: 1,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'guadalupe-mountains',
    rating: 1,
    visits: [{ date: '2025-12-12', notes: 'There really isn\'t much to do. I hiked Devil\'s Hall, and while the vertical rock layers were interesting, that was kind of the only highlight.' }]
  },
  {
    parkId: 'hawaii-volcanoes',
    rating: 2,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'joshua-tree',
    rating: 3,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'katmai',
    rating: 3,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'kenai-fjords',
    rating: 2,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'kings-canyon',
    rating: 1,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'lassen-volcanic',
    rating: 2,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'mammoth-cave',
    rating: 2,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'mesa-verde',
    rating: 3,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'mount-rainier',
    rating: 3,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'north-cascades',
    rating: 1,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'olympic',
    rating: 3,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'petrified-forest',
    rating: 2,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'pinnacles',
    rating: 2,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'redwood',
    rating: 2,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'rocky-mountain',
    rating: 2,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'saguaro',
    rating: 2,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'sequoia',
    rating: 2,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'shenandoah',
    rating: 1,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'white-sands',
    rating: 2,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'yellowstone',
    rating: 2,
    visits: [{ date: '2025-01-01', notes: '' }]
  },
  {
    parkId: 'yosemite',
    rating: 3,
    visits: [{ date: '2025-08-13', notes: 'En route to Sequoia.' }, { date: '2025-01-01', notes: '' }, { date: '2024-01-01', notes: '' }]
  },
  {
    parkId: 'zion',
    rating: 3,
    visits: [{ date: '2025-01-01', notes: '' }]
  }
];
