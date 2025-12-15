
import { NationalPark, UserParkHistory, Badge } from './types';

// ASCII Art Templates
const ARTS = {
  mountain: `
      /\\
     /**\\
    /****\\   /\\
   /      \\ /**\\
  /  /\\    /    \\
 /  /  \\  /      \\
/  /    \\/ /\\     \\
  /      \\/  \\
`,
  canyon: `
   |\\      /|
   | \\    / |
   |  \\  /  |
   |   \\/   |
   |   ||   |
   |   ||   |
  _|___||___|_
`,
  desert: `
     \\|/
   -- * --
     /|\\
      .
     / \\
    /   \\
   /  |  \\  |\\
  /   |   \\ | \\
 /    |    \\|  \\
`,
  forest: `
       ^
      ^^^
     ^^^^^
    ^^^^^^^
      | |
   ^  | |  ^
  ^^^ | | ^^^
 ^^^^^| |^^^^^
`,
  water: `
    _    _
   / \\  / \\
   \\  \\/  /
  __\\    /__
  \\   /\\   /
   \\_/  \\_/
  ~~~~~~~~~~
`,
  volcano: `
      (  )
     (    )
    (      )
   /        \\
  /          \\
 /  /\\    /\\  \\
/  /  \\  /  \\  \\
`,
  cave: `
  /---------\\
 |   ^   ^   |
 |   |   |   |
 | |   |   | |
 | v   v   v |
 |___________|
`,
  arch: `
    .---.
   /     \\
  |  / \\  |
  | |   | |
  | |   | |
 _| |_ _| |_
`,
  geyser: `
     ( )
    (   )
   (     )
    (   )
     | |
    /   \\
   /_____\\
`
};

const getAsciiArt = (id: string): string => {
  // Specific overrides
  if (id === 'yellowstone') return ARTS.geyser;
  if (id === 'arches') return ARTS.arch;
  
  // Categories
  const groups: Record<string, string[]> = {
    mountain: ['acadia', 'denali', 'glacier', 'grand-teton', 'great-basin', 'great-smoky-mountains', 'guadalupe-mountains', 'kings-canyon', 'mount-rainier', 'north-cascades', 'olympic', 'rocky-mountain', 'shenandoah', 'wrangell-st-elias', 'yosemite', 'gates-of-the-arctic', 'lake-clark'],
    canyon: ['black-canyon', 'bryce-canyon', 'canyonlands', 'capitol-reef', 'grand-canyon', 'zion', 'badlands', 'theodore-roosevelt', 'mesa-verde'],
    desert: ['big-bend', 'death-valley', 'great-sand-dunes', 'joshua-tree', 'petrified-forest', 'saguaro', 'white-sands'],
    water: ['american-samoa', 'biscayne', 'channel-islands', 'crater-lake', 'dry-tortugas', 'everglades', 'glacier-bay', 'isle-royale', 'kenai-fjords', 'virgin-islands', 'voyageurs'],
    forest: ['congaree', 'cuyahoga-valley', 'gateway-arch', 'hot-springs', 'indiana-dunes', 'katmai', 'kobuk-valley', 'new-river-gorge', 'redwood', 'sequoia'],
    volcano: ['haleakala', 'hawaii-volcanoes', 'lassen-volcanic'],
    cave: ['carlsbad-caverns', 'mammoth-cave', 'wind-cave', 'pinnacles']
  };

  for (const [type, ids] of Object.entries(groups)) {
    if (ids.includes(id)) {
      return (ARTS as any)[type];
    }
  }

  return ARTS.mountain; // Default
};

// Complete list of 63 US National Parks
const RAW_PARKS: Omit<NationalPark, 'asciiArt'>[] = [
  {
    id: 'acadia',
    name: 'Acadia',
    state: 'ME',
    emoji: '🦞',
    coordinates: { lat: 44.3386, lng: -68.2733 },
    description: 'Protecting the rocky headlands along the Atlantic coastline, this park is a jewel of granite peaks and pine forests.',
    established: '1919-02-26',
    funFact: 'It is the first place in the U.S. to see the sunrise for half the year.'
  },
  {
    id: 'american-samoa',
    name: 'American Samoa',
    state: 'AS',
    emoji: '🥥',
    coordinates: { lat: -14.2583, lng: -170.6833 },
    description: 'A tropical paradise preserving the coral reefs, rainforests, and Samoan culture.',
    established: '1988-10-31',
    funFact: 'It is the only U.S. National Park located south of the equator.'
  },
  {
    id: 'arches',
    name: 'Arches',
    state: 'UT',
    emoji: '🌉',
    coordinates: { lat: 38.7331, lng: -109.5925 },
    description: 'A red-rock wonderland containing over 2,000 natural stone arches.',
    established: '1971-11-12',
    funFact: 'The famous "Delicate Arch" isn\'t just delicate; it\'s free-standing and 60 feet tall!'
  },
  {
    id: 'badlands',
    name: 'Badlands',
    state: 'SD',
    emoji: '🦴',
    coordinates: { lat: 43.8554, lng: -102.3397 },
    description: 'A striking geologic deposit containing one of the world’s richest fossil beds.',
    established: '1978-11-10',
    funFact: 'Sabertooth cats once roamed here!'
  },
  {
    id: 'big-bend',
    name: 'Big Bend',
    state: 'TX',
    emoji: '🦂',
    coordinates: { lat: 29.25, lng: -103.25 },
    description: 'Where the Rio Grande winds through deep canyons and desert mountains.',
    established: '1944-06-12',
    funFact: 'It has more species of birds, bats, and cacti than any other national park.'
  },
  {
    id: 'biscayne',
    name: 'Biscayne',
    state: 'FL',
    emoji: '🐠',
    coordinates: { lat: 25.65, lng: -80.08 },
    description: 'A watery wonderland of coral reefs and pirate history.',
    established: '1980-06-28',
    funFact: '95% of this park is underwater!'
  },
  {
    id: 'black-canyon',
    name: 'Black Canyon of the Gunnison',
    state: 'CO',
    emoji: '🦅',
    coordinates: { lat: 38.57, lng: -107.72 },
    description: 'Some of the steepest cliffs and oldest rock in North America.',
    established: '1999-10-21',
    funFact: 'Some parts of the gorge only receive 33 minutes of sunlight a day.'
  },
  {
    id: 'bryce-canyon',
    name: 'Bryce Canyon',
    state: 'UT',
    emoji: '🏰',
    coordinates: { lat: 37.593, lng: -112.1871 },
    description: 'Famous for its crimson-colored hoodoos, which are spire-shaped rock formations.',
    established: '1928-02-25',
    funFact: 'It has the largest collection of hoodoos (odd-shaped pillars of rock) in the world.'
  },
  {
    id: 'canyonlands',
    name: 'Canyonlands',
    state: 'UT',
    emoji: '🏜️',
    coordinates: { lat: 38.3269, lng: -109.8783 },
    description: 'A wilderness of countless canyons and fantastically formed buttes.',
    established: '1964-09-12',
    funFact: 'The outlaw Butch Cassidy used the intricate canyons here as a hideout.'
  },
  {
    id: 'capitol-reef',
    name: 'Capitol Reef',
    state: 'UT',
    emoji: '🥧',
    coordinates: { lat: 38.0896, lng: -111.1355 },
    description: 'Surrounds a long wrinkle in the earth known as the Waterpocket Fold.',
    established: '1971-12-18',
    funFact: 'Early settlers planted fruit orchards that you can still pick from today.'
  },
  {
    id: 'carlsbad-caverns',
    name: 'Carlsbad Caverns',
    state: 'NM',
    emoji: '🦇',
    coordinates: { lat: 32.1753, lng: -104.4423 },
    description: 'High ancient sea ledges, deep rocky canyons, and 119 known caves.',
    established: '1930-05-14',
    funFact: 'The "Big Room" cave chamber is larger than 6 football fields.'
  },
  {
    id: 'channel-islands',
    name: 'Channel Islands',
    state: 'CA',
    emoji: '🦊',
    coordinates: { lat: 34.0069, lng: -119.7785 },
    description: 'Five remarkable islands off the California coast.',
    established: '1980-03-05',
    funFact: 'Often called the "Galapagos of North America" due to unique species like the island fox.'
  },
  {
    id: 'congaree',
    name: 'Congaree',
    state: 'SC',
    emoji: '🛶',
    coordinates: { lat: 33.7919, lng: -80.7818 },
    description: 'The largest intact expanse of old growth bottomland hardwood forest remaining in the southeastern US.',
    established: '2003-11-10',
    funFact: 'The trees here are nicknamed "Champion Trees" because they are the tallest of their species.'
  },
  {
    id: 'crater-lake',
    name: 'Crater Lake',
    state: 'OR',
    emoji: '💧',
    coordinates: { lat: 42.9446, lng: -122.1090 },
    description: 'A sleeping volcano holding the deepest lake in the USA.',
    established: '1902-05-22',
    funFact: 'There are no rivers flowing into or out of the lake; it is filled entirely by rain and snow.'
  },
  {
    id: 'cuyahoga-valley',
    name: 'Cuyahoga Valley',
    state: 'OH',
    emoji: '🚂',
    coordinates: { lat: 41.2808, lng: -81.5678 },
    description: 'A refuge for native plants and wildlife along the Cuyahoga River.',
    established: '2000-10-11',
    funFact: 'The name "Cuyahoga" comes from a Mohawk word meaning "crooked river".'
  },
  {
    id: 'death-valley',
    name: 'Death Valley',
    state: 'CA',
    emoji: '🥵',
    coordinates: { lat: 36.5323, lng: -116.9325 },
    description: 'Hottest, driest, and lowest national park.',
    established: '1994-10-31',
    funFact: 'Rocks here move on their own across the desert floor, a phenomenon known as "sailing stones".'
  },
  {
    id: 'denali',
    name: 'Denali',
    state: 'AK',
    emoji: '🏔️',
    coordinates: { lat: 63.1148, lng: -151.1926 },
    description: 'Six million acres of wild land, bisected by one ribbon of road.',
    established: '1917-02-26',
    funFact: 'Wood frogs here freeze solid in winter and thaw out alive in spring!'
  },
  {
    id: 'dry-tortugas',
    name: 'Dry Tortugas',
    state: 'FL',
    emoji: '🐢',
    coordinates: { lat: 24.6285, lng: -82.8732 },
    description: 'Open water with seven small islands, accessible only by boat or seaplane.',
    established: '1992-10-26',
    funFact: 'Home to Fort Jefferson, the largest brick masonry structure in the Americas.'
  },
  {
    id: 'everglades',
    name: 'Everglades',
    state: 'FL',
    emoji: '🐊',
    coordinates: { lat: 25.2866, lng: -80.8987 },
    description: 'The largest subtropical wilderness in the United States.',
    established: '1934-05-30',
    funFact: 'It is the only place in the world where alligators and crocodiles coexist in the wild.'
  },
  {
    id: 'gates-of-the-arctic',
    name: 'Gates of the Arctic',
    state: 'AK',
    emoji: '❄️',
    coordinates: { lat: 67.9152, lng: -153.4637 },
    description: 'A vast landscape with no roads or trails, protecting the Brooks Range.',
    established: '1980-12-02',
    funFact: 'This is the northernmost national park, situated entirely above the Arctic Circle.'
  },
  {
    id: 'gateway-arch',
    name: 'Gateway Arch',
    state: 'MO',
    emoji: '🏗️',
    coordinates: { lat: 38.6247, lng: -90.1848 },
    description: 'A memorial to Thomas Jefferson\'s role in opening the West.',
    established: '2018-02-22',
    funFact: 'It is the smallest national park in the US, but has the tallest monument.'
  },
  {
    id: 'glacier',
    name: 'Glacier',
    state: 'MT',
    emoji: '🏔️',
    coordinates: { lat: 48.7596, lng: -113.7870 },
    description: 'A showcase of melting glaciers, alpine meadows, and carved valleys.',
    established: '1910-05-11',
    funFact: 'Mountain goats here are often seen licking the mineral-rich rocks.'
  },
  {
    id: 'glacier-bay',
    name: 'Glacier Bay',
    state: 'AK',
    emoji: '🐳',
    coordinates: { lat: 58.6658, lng: -136.9002 },
    description: 'Covering 3.3 million acres of rugged mountains and glaciers.',
    established: '1980-12-02',
    funFact: 'Humpback whales swim here to eat up to half a ton of food per day.'
  },
  {
    id: 'grand-canyon',
    name: 'Grand Canyon',
    state: 'AZ',
    emoji: '🧗',
    coordinates: { lat: 36.1069, lng: -112.1129 },
    description: 'A mile-deep gorge carved by the Colorado River.',
    established: '1919-02-26',
    funFact: 'The canyon is so vast it creates its own weather!'
  },
  {
    id: 'grand-teton',
    name: 'Grand Teton',
    state: 'WY',
    emoji: '🏔️',
    coordinates: { lat: 43.7904, lng: -110.6818 },
    description: 'Mountains of the imagination. Mountains that led to the creation of the park.',
    established: '1929-02-26',
    funFact: 'The peaks are some of the youngest mountains in the Rockies, "only" 10 million years old.'
  },
  {
    id: 'great-basin',
    name: 'Great Basin',
    state: 'NV',
    emoji: '🌌',
    coordinates: { lat: 38.9833, lng: -114.3 },
    description: 'From the 13,000-foot Wheeler Peak to the sage-covered foothills.',
    established: '1986-10-27',
    funFact: 'It contains the oldest known living trees on Earth, the Bristlecone Pines.'
  },
  {
    id: 'great-sand-dunes',
    name: 'Great Sand Dunes',
    state: 'CO',
    emoji: '🥪',
    coordinates: { lat: 37.7916, lng: -105.5943 },
    description: 'The tallest dunes in North America are the centerpiece in a diverse landscape.',
    established: '2004-09-13',
    funFact: 'The sand here sings! Avalanches create a low-frequency hum.'
  },
  {
    id: 'great-smoky-mountains',
    name: 'Great Smoky Mountains',
    state: 'TN',
    emoji: '🐻',
    coordinates: { lat: 35.6131, lng: -83.5532 },
    description: 'Ridge upon ridge of forest straddles the border between NC and TN.',
    established: '1934-06-15',
    funFact: 'It is the salamander capital of the world.'
  },
  {
    id: 'guadalupe-mountains',
    name: 'Guadalupe Mountains',
    state: 'TX',
    emoji: '🐚',
    coordinates: { lat: 31.9231, lng: -104.8606 },
    description: 'Protects the world\'s most extensive Permian fossil reef.',
    established: '1972-09-30',
    funFact: 'This mountain range is actually an ancient fossilized coral reef.'
  },
  {
    id: 'haleakala',
    name: 'Haleakalā',
    state: 'HI',
    emoji: '🌅',
    coordinates: { lat: 20.7204, lng: -156.1552 },
    description: 'Home to the dormant Haleakalā Volcano and endangered Hawaiian geese.',
    established: '1961-07-01',
    funFact: 'The crater is big enough to hold the entire island of Manhattan.'
  },
  {
    id: 'hawaii-volcanoes',
    name: 'Hawaii Volcanoes',
    state: 'HI',
    emoji: '🌋',
    coordinates: { lat: 19.4194, lng: -155.2885 },
    description: 'Protects some of the most unique geological, biological, and cultural landscapes.',
    established: '1916-08-01',
    funFact: 'You can walk through a 500-year-old lava tube here.'
  },
  {
    id: 'hot-springs',
    name: 'Hot Springs',
    state: 'AR',
    emoji: '🛁',
    coordinates: { lat: 34.5217, lng: -93.0423 },
    description: 'A place of healing and luxury, preserving the ancient thermal springs.',
    established: '1921-03-04',
    funFact: 'It was the first piece of land set aside by the federal government for preservation (1832).'
  },
  {
    id: 'indiana-dunes',
    name: 'Indiana Dunes',
    state: 'IN',
    emoji: '🏖️',
    coordinates: { lat: 41.6533, lng: -87.0524 },
    description: 'Diverse habitats of dunes, oak savannas, swamps, bogs, marshes, and forests.',
    established: '2019-02-15',
    funFact: 'The dunes are known to "sing" or hum when sand slides down the slopes.'
  },
  {
    id: 'isle-royale',
    name: 'Isle Royale',
    state: 'MI',
    emoji: '🐺',
    coordinates: { lat: 48.10, lng: -88.55 },
    description: 'A rugged, isolated island in Lake Superior, far from the sights and sounds of civilization.',
    established: '1940-04-03',
    funFact: 'It is famous for the longest-running predator-prey study of wolves and moose.'
  },
  {
    id: 'joshua-tree',
    name: 'Joshua Tree',
    state: 'CA',
    emoji: '🌵',
    coordinates: { lat: 33.8734, lng: -115.9010 },
    description: 'Two distinct desert ecosystems, the Mojave and the Colorado, come together.',
    established: '1994-10-31',
    funFact: 'Joshua Trees aren\'t actually trees; they are giant succulents related to Yuccas.'
  },
  {
    id: 'katmai',
    name: 'Katmai',
    state: 'AK',
    emoji: '🐟',
    coordinates: { lat: 58.50, lng: -155.00 },
    description: 'Known for its volcanoes and the brown bears that gather at Brooks Falls.',
    established: '1980-12-02',
    funFact: 'Home to the annual "Fat Bear Week" competition.'
  },
  {
    id: 'kenai-fjords',
    name: 'Kenai Fjords',
    state: 'AK',
    emoji: '🧊',
    coordinates: { lat: 59.9248, lng: -149.6501 },
    description: 'Where the ice age lingers, with glaciers, earthquakes, and ocean storms.',
    established: '1980-12-02',
    funFact: 'Over 50% of the park is covered in ice.'
  },
  {
    id: 'kings-canyon',
    name: 'Kings Canyon',
    state: 'CA',
    emoji: '🌲',
    coordinates: { lat: 36.8879, lng: -118.5551 },
    description: 'A land of giant skyscraping trees and deep valleys.',
    established: '1940-03-04',
    funFact: 'It is home to the General Grant Tree, proclaimed "The Nation\'s Christmas Tree".'
  },
  {
    id: 'kobuk-valley',
    name: 'Kobuk Valley',
    state: 'AK',
    emoji: '🦌',
    coordinates: { lat: 67.55, lng: -159.28 },
    description: 'Caribou migrate through the Great Kobuk Sand Dunes here.',
    established: '1980-12-02',
    funFact: 'It has sand dunes... in the Arctic!'
  },
  {
    id: 'lake-clark',
    name: 'Lake Clark',
    state: 'AK',
    emoji: '🎣',
    coordinates: { lat: 60.97, lng: -153.42 },
    description: 'Volcanoes, jagged mountains, glaciers, rivers, and waterfalls.',
    established: '1980-12-02',
    funFact: 'This is one of the least visited parks because no roads lead here.'
  },
  {
    id: 'lassen-volcanic',
    name: 'Lassen Volcanic',
    state: 'CA',
    emoji: '🌋',
    coordinates: { lat: 40.4977, lng: -121.4207 },
    description: 'All four types of volcanoes found in the world are found here.',
    established: '1916-08-09',
    funFact: 'Lassen Peak is the largest plug dome volcano in the world.'
  },
  {
    id: 'mammoth-cave',
    name: 'Mammoth Cave',
    state: 'KY',
    emoji: '🔦',
    coordinates: { lat: 37.1862, lng: -86.1005 },
    description: 'The world\'s longest known cave system.',
    established: '1941-07-01',
    funFact: 'Over 400 miles of passageways have been mapped, and no one knows how big it really is.'
  },
  {
    id: 'mesa-verde',
    name: 'Mesa Verde',
    state: 'CO',
    emoji: '🪜',
    coordinates: { lat: 37.1838, lng: -108.4887 },
    description: 'Protecting the archaeological heritage of the Ancestral Pueblo people.',
    established: '1906-06-29',
    funFact: 'The Cliff Palace has 150 rooms and 23 kivas (ceremonial rooms).'
  },
  {
    id: 'mount-rainier',
    name: 'Mount Rainier',
    state: 'WA',
    emoji: '🗻',
    coordinates: { lat: 46.8523, lng: -121.7603 },
    description: 'An active volcano ascending to 14,410 feet above sea level.',
    established: '1899-03-02',
    funFact: 'It is the most glaciated peak in the contiguous USA.'
  },
  {
    id: 'new-river-gorge',
    name: 'New River Gorge',
    state: 'WV',
    emoji: '🌉',
    coordinates: { lat: 37.9626, lng: -81.0850 },
    description: 'A rugged, whitewater river flowing northward through deep canyons.',
    established: '2020-12-27',
    funFact: 'Despite its name, the New River is one of the oldest rivers on the continent.'
  },
  {
    id: 'north-cascades',
    name: 'North Cascades',
    state: 'WA',
    emoji: '🏔️',
    coordinates: { lat: 48.7718, lng: -121.2985 },
    description: 'A rugged wilderness of jagged peaks, deep valleys, and cascading waterfalls.',
    established: '1968-10-02',
    funFact: 'It has more glaciers (over 300) than any other US park outside Alaska.'
  },
  {
    id: 'olympic',
    name: 'Olympic',
    state: 'WA',
    emoji: '🌲',
    coordinates: { lat: 47.8021, lng: -123.6044 },
    description: 'Three distinct ecosystems: subalpine forest, temperate rainforest, and rugged Pacific coast.',
    established: '1938-06-29',
    funFact: 'One of the quietest places in the US, the "One Square Inch of Silence", is located here.'
  },
  {
    id: 'petrified-forest',
    name: 'Petrified Forest',
    state: 'AZ',
    emoji: '🪵',
    coordinates: { lat: 34.9100, lng: -109.8067 },
    description: 'Home to one of the world\'s largest and most colorful concentrations of petrified wood.',
    established: '1962-12-09',
    funFact: 'The "wood" here is actually pure quartz crystal.'
  },
  {
    id: 'pinnacles',
    name: 'Pinnacles',
    state: 'CA',
    emoji: '🦅',
    coordinates: { lat: 36.4869, lng: -121.1669 },
    description: 'Towering rock spires that are the remains of an ancient volcano.',
    established: '2013-01-10',
    funFact: 'This park is a major release site for the endangered California Condor.'
  },
  {
    id: 'redwood',
    name: 'Redwood',
    state: 'CA',
    emoji: '🌲',
    coordinates: { lat: 41.2132, lng: -124.0046 },
    description: 'Home to the tallest trees on Earth.',
    established: '1968-10-02',
    funFact: 'Hyperion, the tallest known living tree (380 ft), is hidden somewhere in this park.'
  },
  {
    id: 'rocky-mountain',
    name: 'Rocky Mountain',
    state: 'CO',
    emoji: '🐏',
    coordinates: { lat: 40.3428, lng: -105.6836 },
    description: 'Spectacular mountain environments with alpine lakes and wildlife.',
    established: '1915-01-26',
    funFact: 'Trail Ridge Road is the highest continuous paved road in the United States.'
  },
  {
    id: 'saguaro',
    name: 'Saguaro',
    state: 'AZ',
    emoji: '🌵',
    coordinates: { lat: 32.2967, lng: -111.1666 },
    description: 'Home to the nation\'s largest cacti, the giant saguaro.',
    established: '1994-10-14',
    funFact: 'A Saguaro cactus can live for 200 years and weigh more than a car.'
  },
  {
    id: 'sequoia',
    name: 'Sequoia',
    state: 'CA',
    emoji: '🌲',
    coordinates: { lat: 36.4864, lng: -118.5658 },
    description: 'A land of giants, including the General Sherman Tree.',
    established: '1890-09-25',
    funFact: 'The General Sherman Tree is the largest tree on Earth by volume.'
  },
  {
    id: 'shenandoah',
    name: 'Shenandoah',
    state: 'VA',
    emoji: '🍂',
    coordinates: { lat: 38.2928, lng: -78.6796 },
    description: 'A land of cascading waterfalls, spectacular vistas, and quiet woods.',
    established: '1935-12-26',
    funFact: 'Skyline Drive runs the entire length of the park along the ridge of the mountains.'
  },
  {
    id: 'theodore-roosevelt',
    name: 'Theodore Roosevelt',
    state: 'ND',
    emoji: '🦬',
    coordinates: { lat: 46.9790, lng: -103.5387 },
    description: 'The badlands where President Roosevelt once ranched and hunted.',
    established: '1978-11-10',
    funFact: 'It is the only national park named after a single person.'
  },
  {
    id: 'virgin-islands',
    name: 'Virgin Islands',
    state: 'VI',
    emoji: '🏝️',
    coordinates: { lat: 18.3381, lng: -64.7930 },
    description: 'Tropical beaches, coral reefs, and historic ruins.',
    established: '1956-08-02',
    funFact: 'The underwater trails here have signs to guide snorkelers.'
  },
  {
    id: 'voyageurs',
    name: 'Voyageurs',
    state: 'MN',
    emoji: '🚤',
    coordinates: { lat: 48.4841, lng: -92.8271 },
    description: 'A water-based park where you must leave your car behind.',
    established: '1975-04-08',
    funFact: 'In winter, the frozen lakes turn into ice roads for cars and snowmobiles.'
  },
  {
    id: 'white-sands',
    name: 'White Sands',
    state: 'NM',
    emoji: '⬜',
    coordinates: { lat: 32.7872, lng: -106.3257 },
    description: 'Great wave-like dunes of gypsum sand.',
    established: '2019-12-20',
    funFact: 'The sand is gypsum, which is water-soluble and rarely found as sand.'
  },
  {
    id: 'wind-cave',
    name: 'Wind Cave',
    state: 'SD',
    emoji: '🌬️',
    coordinates: { lat: 43.57, lng: -103.48 },
    description: 'One of the world\'s longest and most complex caves.',
    established: '1903-01-09',
    funFact: 'It is the first cave to be designated a national park anywhere in the world.'
  },
  {
    id: 'wrangell-st-elias',
    name: 'Wrangell-St. Elias',
    state: 'AK',
    emoji: '⛏️',
    coordinates: { lat: 61.00, lng: -142.00 },
    description: 'The largest national park in the United States, rising from the ocean to 18,008 feet.',
    established: '1980-12-02',
    funFact: 'It is larger than the country of Switzerland!'
  },
  {
    id: 'yellowstone',
    name: 'Yellowstone',
    state: 'WY',
    emoji: '⛲',
    coordinates: { lat: 44.4280, lng: -110.5885 },
    description: 'The world\'s first national park, known for geysers and wildlife.',
    established: '1872-03-01',
    funFact: 'Old Faithful isn\'t the biggest geyser, but it is the most punctual.'
  },
  {
    id: 'yosemite',
    name: 'Yosemite',
    state: 'CA',
    emoji: '🧗',
    coordinates: { lat: 37.8651, lng: -119.5383 },
    description: 'Famous for its waterfalls, giant sequoias, and granite cliffs.',
    established: '1890-10-01',
    funFact: 'Yosemite Falls is one of the tallest waterfalls in North America (2,425 ft).'
  },
  {
    id: 'zion',
    name: 'Zion',
    state: 'UT',
    emoji: '🏜️',
    coordinates: { lat: 37.2982, lng: -113.0263 },
    description: 'Massive sandstone cliffs of cream, pink, and red.',
    established: '1919-11-19',
    funFact: 'The Olympic Torch passed through Zion on its way to Salt Lake City in 2002.'
  }
];

export const PARKS: NationalPark[] = RAW_PARKS.map(park => ({
  ...park,
  asciiArt: getAsciiArt(park.id)
}));

// Badge Logic - Updated for nested history structure
export const BADGES: Badge[] = [
  // 1. QUANTITY
  {
    id: 'ranger-rookie',
    name: 'Ranger Rookie',
    description: 'Visit your first National Park.',
    icon: 'compass',
    color: 'bg-green-100 text-green-800', // Fixed standard color
    condition: (history) => history.some(h => h.visits.length > 0)
  },
  {
    id: 'seasoned-explorer',
    name: 'Seasoned Explorer',
    description: 'Visit 5 or more unique National Parks.',
    icon: 'map',
    color: 'bg-stone-200 text-stone-800', // Fixed standard color
    condition: (history) => history.filter(h => h.visits.length > 0).length >= 5
  },
  {
    id: 'junior-ranger',
    name: 'Junior Ranger',
    description: 'Collect stamps from 10 unique parks.',
    icon: 'medal',
    color: 'bg-yellow-200 text-yellow-800',
    condition: (history) => history.filter(h => h.visits.length > 0).length >= 10
  },
  {
    id: 'grand-tour',
    name: 'Grand Tour',
    description: 'Visit 20 unique parks.',
    icon: 'anchor',
    color: 'bg-blue-200 text-blue-800',
    condition: (history) => history.filter(h => h.visits.length > 0).length >= 20
  },
  {
    id: 'halfway-there',
    name: 'Halfway There',
    description: 'Visit 31 parks (approx. 50% of all parks).',
    icon: 'star',
    color: 'bg-purple-200 text-purple-800',
    condition: (history) => history.filter(h => h.visits.length > 0).length >= 31
  },

  // 2. GEOGRAPHIC / FEATURES
  {
    id: 'canyon-conqueror',
    name: 'Canyon Conqueror',
    description: 'Visit Grand Canyon, Zion, or Bryce.',
    icon: 'mountain',
    color: 'bg-orange-600 text-white', // Fixed standard color, high contrast
    condition: (history) => history.some(h => h.visits.length > 0 && ['grand-canyon', 'zion', 'bryce-canyon', 'canyonlands'].includes(h.parkId)),
    relevantParkIds: ['grand-canyon', 'zion', 'bryce-canyon', 'canyonlands']
  },
  {
    id: 'coastal-wandering',
    name: 'Coastal Wanderer',
    description: 'Visit a park on the coast (e.g. Acadia, Olympic).',
    icon: 'waves',
    color: 'bg-blue-100 text-blue-800',
    condition: (history) => history.some(h => h.visits.length > 0 && ['acadia', 'olympic', 'everglades', 'biscayne', 'channel-islands'].includes(h.parkId)),
    relevantParkIds: ['acadia', 'olympic', 'everglades', 'biscayne', 'channel-islands']
  },
  {
    id: 'high-altitude',
    name: 'High Altitude',
    description: 'Visit a high elevation park (e.g. Rocky Mountain).',
    icon: 'cloud',
    color: 'bg-stone-200 text-stone-800',
    condition: (history) => history.some(h => h.visits.length > 0 && ['rocky-mountain', 'glacier', 'denali', 'mount-rainier', 'grand-teton'].includes(h.parkId)),
    relevantParkIds: ['rocky-mountain', 'glacier', 'denali', 'mount-rainier', 'grand-teton']
  },
  {
    id: 'island-hopper',
    name: 'Island Hopper',
    description: 'Visit a park outside the contiguous US.',
    icon: 'sun',
    color: 'bg-orange-100 text-orange-800',
    condition: (history) => history.some(h => h.visits.length > 0 && ['denali', 'hawaii-volcanoes', 'haleakala', 'virgin-islands', 'american-samoa', 'gates-of-the-arctic'].includes(h.parkId)),
    relevantParkIds: ['denali', 'hawaii-volcanoes', 'haleakala', 'virgin-islands', 'american-samoa', 'gates-of-the-arctic']
  },
  
  // 3. THEMATIC
  {
    id: 'tree-hugger',
    name: 'Tree Hugger',
    description: 'Visit a park famous for its trees (Redwood, Sequoia).',
    icon: 'leaf',
    color: 'bg-green-100 text-green-800',
    condition: (history) => history.some(h => h.visits.length > 0 && ['redwood', 'sequoia', 'kings-canyon', 'congaree', 'olympic'].includes(h.parkId)),
    relevantParkIds: ['redwood', 'sequoia', 'kings-canyon', 'congaree', 'olympic']
  },
  {
    id: 'lava-chaser',
    name: 'Lava Chaser',
    description: 'Visit a volcanic park (Hawaii, Lassen, Crater Lake).',
    icon: 'fire',
    color: 'bg-red-100 text-red-800',
    condition: (history) => history.some(h => h.visits.length > 0 && ['hawaii-volcanoes', 'haleakala', 'lassen-volcanic', 'crater-lake', 'mount-rainier'].includes(h.parkId)),
    relevantParkIds: ['hawaii-volcanoes', 'haleakala', 'lassen-volcanic', 'crater-lake', 'mount-rainier']
  },
  {
    id: 'ice-age',
    name: 'Ice Age',
    description: 'Visit a park with glaciers (Glacier, Kenai Fjords).',
    icon: 'snowflake',
    color: 'bg-cyan-100 text-cyan-800',
    condition: (history) => history.some(h => h.visits.length > 0 && ['glacier', 'glacier-bay', 'kenai-fjords', 'north-cascades', 'wrangell-st-elias'].includes(h.parkId)),
    relevantParkIds: ['glacier', 'glacier-bay', 'kenai-fjords', 'north-cascades', 'wrangell-st-elias']
  },
  {
    id: 'heat-wave',
    name: 'Heat Wave',
    description: 'Brave the heat in a desert park.',
    icon: 'cactus',
    color: 'bg-yellow-200 text-orange-800',
    condition: (history) => history.some(h => h.visits.length > 0 && ['death-valley', 'joshua-tree', 'saguaro', 'big-bend', 'white-sands'].includes(h.parkId)),
    relevantParkIds: ['death-valley', 'joshua-tree', 'saguaro', 'big-bend', 'white-sands']
  },
  {
    id: 'spelunker',
    name: 'Spelunker',
    description: 'Go underground in a cave park.',
    icon: 'flashlight',
    color: 'bg-gray-800 text-white',
    condition: (history) => history.some(h => h.visits.length > 0 && ['mammoth-cave', 'carlsbad-caverns', 'wind-cave', 'pinnacles'].includes(h.parkId)),
    relevantParkIds: ['mammoth-cave', 'carlsbad-caverns', 'wind-cave', 'pinnacles']
  },
  {
    id: 'wildlife-watcher',
    name: 'Wildlife Watcher',
    description: 'Visit a park known for wildlife (Katmai, Everglades).',
    icon: 'camera',
    color: 'bg-emerald-100 text-emerald-800',
    condition: (history) => history.some(h => h.visits.length > 0 && ['katmai', 'everglades', 'yellowstone', 'theodore-roosevelt', 'isle-royale'].includes(h.parkId)),
    relevantParkIds: ['katmai', 'everglades', 'yellowstone', 'theodore-roosevelt', 'isle-royale']
  },
  {
    id: 'history-buff',
    name: 'History Buff',
    description: 'Visit Yellowstone (the 1st park) or Mesa Verde.',
    icon: 'scroll',
    color: 'bg-amber-100 text-amber-900',
    condition: (history) => history.some(h => h.visits.length > 0 && ['yellowstone', 'mesa-verde', 'hot-springs'].includes(h.parkId)),
    relevantParkIds: ['yellowstone', 'mesa-verde', 'hot-springs']
  },
  {
    id: 'super-fan',
    name: 'Super Fan',
    description: 'Visit the same park 3 or more times.',
    icon: 'heart', 
    color: 'bg-pink-100 text-pink-800',
    condition: (history) => history.some(h => h.visits.length >= 3)
  },
  {
    id: 'fresh-air',
    name: 'New Recruit',
    description: 'Visit one of the newest parks (Post-2019).',
    icon: 'pineCone',
    color: 'bg-lime-100 text-lime-800',
    condition: (history) => history.some(h => h.visits.length > 0 && ['new-river-gorge', 'white-sands', 'indiana-dunes'].includes(h.parkId)),
    relevantParkIds: ['new-river-gorge', 'white-sands', 'indiana-dunes']
  },

  // 4. ELITE / HARD CHALLENGES
  {
    id: 'national-treasure',
    name: 'National Treasure',
    description: 'Visit all 63 US National Parks.',
    icon: 'crown',
    color: 'bg-yellow-300 text-yellow-900 border-yellow-500',
    condition: (history) => history.filter(h => h.visits.length > 0).length >= 63
  },
  {
    id: 'elite-explorer',
    name: 'Elite Explorer',
    description: 'Visit 50 unique National Parks.',
    icon: 'trophy',
    color: 'bg-indigo-100 text-indigo-900',
    condition: (history) => history.filter(h => h.visits.length > 0).length >= 50
  },
  {
    id: 'the-last-frontier',
    name: 'The Last Frontier',
    description: 'Visit all 8 National Parks in Alaska.',
    icon: 'snowflake',
    color: 'bg-sky-200 text-sky-900',
    condition: (history) => {
        const alaska = ['denali', 'gates-of-the-arctic', 'glacier-bay', 'katmai', 'kenai-fjords', 'kobuk-valley', 'lake-clark', 'wrangell-st-elias'];
        return alaska.every(id => history.some(h => h.parkId === id && h.visits.length > 0));
    },
    relevantParkIds: ['denali', 'gates-of-the-arctic', 'glacier-bay', 'katmai', 'kenai-fjords', 'kobuk-valley', 'lake-clark', 'wrangell-st-elias']
  },
  {
    id: 'golden-state-warrior',
    name: 'Golden State Warrior',
    description: 'Visit all 9 National Parks in California.',
    icon: 'star',
    color: 'bg-orange-200 text-orange-900',
    condition: (history) => {
        const ca = ['channel-islands', 'death-valley', 'joshua-tree', 'kings-canyon', 'lassen-volcanic', 'pinnacles', 'redwood', 'sequoia', 'yosemite'];
        return ca.every(id => history.some(h => h.parkId === id && h.visits.length > 0));
    },
    relevantParkIds: ['channel-islands', 'death-valley', 'joshua-tree', 'kings-canyon', 'lassen-volcanic', 'pinnacles', 'redwood', 'sequoia', 'yosemite']
  },
  {
    id: 'red-rock-royalty',
    name: 'Red Rock Royalty',
    description: 'Visit the "Mighty 5" parks in Utah.',
    icon: 'sun',
    color: 'bg-red-200 text-red-900',
    condition: (history) => {
        const utah = ['arches', 'bryce-canyon', 'canyonlands', 'capitol-reef', 'zion'];
        return utah.every(id => history.some(h => h.parkId === id && h.visits.length > 0));
    },
    relevantParkIds: ['arches', 'bryce-canyon', 'canyonlands', 'capitol-reef', 'zion']
  },
  {
    id: 'remote-ranger',
    name: 'Remote Ranger',
    description: 'Visit 3 hard-to-reach parks (Samoa, Dry Tortugas, Isle Royale, Kobuk).',
    icon: 'plane',
    color: 'bg-slate-200 text-slate-900',
    condition: (history) => {
        const remote = ['american-samoa', 'dry-tortugas', 'isle-royale', 'kobuk-valley', 'gates-of-the-arctic'];
        const visited = remote.filter(id => history.some(h => h.parkId === id && h.visits.length > 0));
        return visited.length >= 3;
    },
    relevantParkIds: ['american-samoa', 'dry-tortugas', 'isle-royale', 'kobuk-valley', 'gates-of-the-arctic']
  },
  {
    id: 'true-grit',
    name: 'True Grit',
    description: 'Visit the hottest (Death Valley) and coldest (Gates of Arctic) parks.',
    icon: 'skull',
    color: 'bg-stone-300 text-stone-900',
    condition: (history) => {
         return history.some(h => h.parkId === 'death-valley' && h.visits.length > 0) &&
                history.some(h => h.parkId === 'gates-of-the-arctic' && h.visits.length > 0);
    },
    relevantParkIds: ['death-valley', 'gates-of-the-arctic']
  },
  {
    id: 'hydro-homie',
    name: 'Hydro Homie',
    description: 'Visit 5 major water-based parks.',
    icon: 'anchor',
    color: 'bg-cyan-200 text-cyan-900',
    condition: (history) => {
        const water = ['biscayne', 'dry-tortugas', 'channel-islands', 'isle-royale', 'voyageurs', 'virgin-islands'];
        const visited = water.filter(id => history.some(h => h.parkId === id && h.visits.length > 0));
        return visited.length >= 5;
    },
    relevantParkIds: ['biscayne', 'dry-tortugas', 'channel-islands', 'isle-royale', 'voyageurs', 'virgin-islands']
  },
  {
    id: 'peak-performer',
    name: 'Peak Performer',
    description: 'Visit Denali, Rainier, and Rocky Mountain.',
    icon: 'mountain',
    color: 'bg-zinc-200 text-zinc-800',
    condition: (history) => {
         return history.some(h => h.parkId === 'denali' && h.visits.length > 0) &&
                history.some(h => h.parkId === 'mount-rainier' && h.visits.length > 0) &&
                history.some(h => h.parkId === 'rocky-mountain' && h.visits.length > 0);
    },
    relevantParkIds: ['denali', 'mount-rainier', 'rocky-mountain']
  },
  {
    id: 'subterranean-master',
    name: 'Cave Master',
    description: 'Visit Mammoth Cave, Carlsbad Caverns, and Wind Cave.',
    icon: 'diamond',
    color: 'bg-purple-300 text-purple-900',
    condition: (history) => {
         return history.some(h => h.parkId === 'mammoth-cave' && h.visits.length > 0) &&
                history.some(h => h.parkId === 'carlsbad-caverns' && h.visits.length > 0) &&
                history.some(h => h.parkId === 'wind-cave' && h.visits.length > 0);
    },
    relevantParkIds: ['mammoth-cave', 'carlsbad-caverns', 'wind-cave']
  },
  {
    id: 'atlantic-avenue',
    name: 'Atlantic Avenue',
    description: 'Visit Acadia, Shenandoah, Congaree, and Everglades.',
    icon: 'map',
    color: 'bg-emerald-200 text-emerald-900',
    condition: (history) => {
        const east = ['acadia', 'shenandoah', 'congaree', 'everglades'];
        return east.every(id => history.some(h => h.parkId === id && h.visits.length > 0));
    },
    relevantParkIds: ['acadia', 'shenandoah', 'congaree', 'everglades']
  },
  {
    id: 'ring-of-fire',
    name: 'Ring of Fire',
    description: 'Visit Hawaii Volcanoes, Haleakalā, Lassen, and Crater Lake.',
    icon: 'fire',
    color: 'bg-rose-200 text-rose-900',
    condition: (history) => {
        const vol = ['hawaii-volcanoes', 'haleakala', 'lassen-volcanic', 'crater-lake'];
        return vol.every(id => history.some(h => h.parkId === id && h.visits.length > 0));
    },
    relevantParkIds: ['hawaii-volcanoes', 'haleakala', 'lassen-volcanic', 'crater-lake']
  }
];
