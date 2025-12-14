
import { NationalPark, UserVisit, Badge } from './types';

// Helper to get local badge images
const getParkImage = (name: string, id: string) => {
  // Map of available local badges
  const availableBadges = ['yellowstone', 'yosemite', 'zion'];
  
  if (availableBadges.includes(id)) {
    return `badges/${id}.png`;
  }
  
  // Default fallback to Yellowstone badge for parks that don't have an asset yet
  // This ensures the vintage aesthetic is maintained without external dependencies
  return 'badges/yellowstone.png';
};

// Complete list of 63 US National Parks
export const PARKS: NationalPark[] = [
  {
    id: 'acadia',
    name: 'Acadia',
    state: 'ME',
    coordinates: { lat: 44.3386, lng: -68.2733 },
    description: 'Protecting the rocky headlands along the Atlantic coastline, this park is a jewel of granite peaks and pine forests.',
    imageUrl: getParkImage('Acadia National Park', 'acadia'),
    established: '1919-02-26',
    funFact: 'It is the first place in the U.S. to see the sunrise for half the year.'
  },
  {
    id: 'american-samoa',
    name: 'American Samoa',
    state: 'AS',
    coordinates: { lat: -14.2583, lng: -170.6833 },
    description: 'A tropical paradise preserving the coral reefs, rainforests, and Samoan culture.',
    imageUrl: getParkImage('National Park of American Samoa', 'american-samoa'),
    established: '1988-10-31',
    funFact: 'It is the only U.S. National Park located south of the equator.'
  },
  {
    id: 'arches',
    name: 'Arches',
    state: 'UT',
    coordinates: { lat: 38.7331, lng: -109.5925 },
    description: 'A red-rock wonderland containing over 2,000 natural stone arches.',
    imageUrl: getParkImage('Arches National Park', 'arches'),
    established: '1971-11-12',
    funFact: 'The famous "Delicate Arch" isn\'t just delicate; it\'s free-standing and 60 feet tall!'
  },
  {
    id: 'badlands',
    name: 'Badlands',
    state: 'SD',
    coordinates: { lat: 43.8554, lng: -102.3397 },
    description: 'A striking geologic deposit containing one of the world’s richest fossil beds.',
    imageUrl: getParkImage('Badlands National Park', 'badlands'),
    established: '1978-11-10',
    funFact: 'Sabertooth cats once roamed here!'
  },
  {
    id: 'big-bend',
    name: 'Big Bend',
    state: 'TX',
    coordinates: { lat: 29.25, lng: -103.25 },
    description: 'Where the Rio Grande winds through deep canyons and desert mountains.',
    imageUrl: getParkImage('Big Bend National Park', 'big-bend'),
    established: '1944-06-12',
    funFact: 'It has more species of birds, bats, and cacti than any other national park.'
  },
  {
    id: 'biscayne',
    name: 'Biscayne',
    state: 'FL',
    coordinates: { lat: 25.65, lng: -80.08 },
    description: 'A watery wonderland of coral reefs and pirate history.',
    imageUrl: getParkImage('Biscayne National Park', 'biscayne'),
    established: '1980-06-28',
    funFact: '95% of this park is underwater!'
  },
  {
    id: 'black-canyon',
    name: 'Black Canyon of the Gunnison',
    state: 'CO',
    coordinates: { lat: 38.57, lng: -107.72 },
    description: 'Some of the steepest cliffs and oldest rock in North America.',
    imageUrl: getParkImage('Black Canyon of the Gunnison', 'black-canyon'),
    established: '1999-10-21',
    funFact: 'Some parts of the gorge only receive 33 minutes of sunlight a day.'
  },
  {
    id: 'bryce-canyon',
    name: 'Bryce Canyon',
    state: 'UT',
    coordinates: { lat: 37.593, lng: -112.1871 },
    description: 'Famous for its crimson-colored hoodoos, which are spire-shaped rock formations.',
    imageUrl: getParkImage('Bryce Canyon National Park', 'bryce-canyon'),
    established: '1928-02-25',
    funFact: 'It has the largest collection of hoodoos (odd-shaped pillars of rock) in the world.'
  },
  {
    id: 'canyonlands',
    name: 'Canyonlands',
    state: 'UT',
    coordinates: { lat: 38.3269, lng: -109.8783 },
    description: 'A wilderness of countless canyons and fantastically formed buttes.',
    imageUrl: getParkImage('Canyonlands National Park', 'canyonlands'),
    established: '1964-09-12',
    funFact: 'The outlaw Butch Cassidy used the intricate canyons here as a hideout.'
  },
  {
    id: 'capitol-reef',
    name: 'Capitol Reef',
    state: 'UT',
    coordinates: { lat: 38.0896, lng: -111.1355 },
    description: 'Surrounds a long wrinkle in the earth known as the Waterpocket Fold.',
    imageUrl: getParkImage('Capitol Reef National Park', 'capitol-reef'),
    established: '1971-12-18',
    funFact: 'Early settlers planted fruit orchards that you can still pick from today.'
  },
  {
    id: 'carlsbad-caverns',
    name: 'Carlsbad Caverns',
    state: 'NM',
    coordinates: { lat: 32.1753, lng: -104.4423 },
    description: 'High ancient sea ledges, deep rocky canyons, and 119 known caves.',
    imageUrl: getParkImage('Carlsbad Caverns National Park', 'carlsbad-caverns'),
    established: '1930-05-14',
    funFact: 'The "Big Room" cave chamber is larger than 6 football fields.'
  },
  {
    id: 'channel-islands',
    name: 'Channel Islands',
    state: 'CA',
    coordinates: { lat: 34.0069, lng: -119.7785 },
    description: 'Five remarkable islands off the California coast.',
    imageUrl: getParkImage('Channel Islands National Park', 'channel-islands'),
    established: '1980-03-05',
    funFact: 'Often called the "Galapagos of North America" due to unique species like the island fox.'
  },
  {
    id: 'congaree',
    name: 'Congaree',
    state: 'SC',
    coordinates: { lat: 33.7919, lng: -80.7818 },
    description: 'The largest intact expanse of old growth bottomland hardwood forest remaining in the southeastern US.',
    imageUrl: getParkImage('Congaree National Park', 'congaree'),
    established: '2003-11-10',
    funFact: 'The trees here are nicknamed "Champion Trees" because they are the tallest of their species.'
  },
  {
    id: 'crater-lake',
    name: 'Crater Lake',
    state: 'OR',
    coordinates: { lat: 42.9446, lng: -122.1090 },
    description: 'A sleeping volcano holding the deepest lake in the USA.',
    imageUrl: getParkImage('Crater Lake National Park', 'crater-lake'),
    established: '1902-05-22',
    funFact: 'There are no rivers flowing into or out of the lake; it is filled entirely by rain and snow.'
  },
  {
    id: 'cuyahoga-valley',
    name: 'Cuyahoga Valley',
    state: 'OH',
    coordinates: { lat: 41.2808, lng: -81.5678 },
    description: 'A refuge for native plants and wildlife along the Cuyahoga River.',
    imageUrl: getParkImage('Cuyahoga Valley National Park', 'cuyahoga-valley'),
    established: '2000-10-11',
    funFact: 'The name "Cuyahoga" comes from a Mohawk word meaning "crooked river".'
  },
  {
    id: 'death-valley',
    name: 'Death Valley',
    state: 'CA',
    coordinates: { lat: 36.5323, lng: -116.9325 },
    description: 'Hottest, driest, and lowest national park.',
    imageUrl: getParkImage('Death Valley National Park', 'death-valley'),
    established: '1994-10-31',
    funFact: 'Rocks here move on their own across the desert floor, a phenomenon known as "sailing stones".'
  },
  {
    id: 'denali',
    name: 'Denali',
    state: 'AK',
    coordinates: { lat: 63.1148, lng: -151.1926 },
    description: 'Six million acres of wild land, bisected by one ribbon of road.',
    imageUrl: getParkImage('Denali National Park', 'denali'),
    established: '1917-02-26',
    funFact: 'Wood frogs here freeze solid in winter and thaw out alive in spring!'
  },
  {
    id: 'dry-tortugas',
    name: 'Dry Tortugas',
    state: 'FL',
    coordinates: { lat: 24.6285, lng: -82.8732 },
    description: 'Open water with seven small islands, accessible only by boat or seaplane.',
    imageUrl: getParkImage('Dry Tortugas National Park', 'dry-tortugas'),
    established: '1992-10-26',
    funFact: 'Home to Fort Jefferson, the largest brick masonry structure in the Americas.'
  },
  {
    id: 'everglades',
    name: 'Everglades',
    state: 'FL',
    coordinates: { lat: 25.2866, lng: -80.8987 },
    description: 'The largest subtropical wilderness in the United States.',
    imageUrl: getParkImage('Everglades National Park', 'everglades'),
    established: '1934-05-30',
    funFact: 'It is the only place in the world where alligators and crocodiles coexist in the wild.'
  },
  {
    id: 'gates-of-the-arctic',
    name: 'Gates of the Arctic',
    state: 'AK',
    coordinates: { lat: 67.9152, lng: -153.4637 },
    description: 'A vast landscape with no roads or trails, protecting the Brooks Range.',
    imageUrl: getParkImage('Gates of the Arctic National Park', 'gates-of-the-arctic'),
    established: '1980-12-02',
    funFact: 'This is the northernmost national park, situated entirely above the Arctic Circle.'
  },
  {
    id: 'gateway-arch',
    name: 'Gateway Arch',
    state: 'MO',
    coordinates: { lat: 38.6247, lng: -90.1848 },
    description: 'A memorial to Thomas Jefferson\'s role in opening the West.',
    imageUrl: getParkImage('Gateway Arch National Park', 'gateway-arch'),
    established: '2018-02-22',
    funFact: 'It is the smallest national park in the US, but has the tallest monument.'
  },
  {
    id: 'glacier',
    name: 'Glacier',
    state: 'MT',
    coordinates: { lat: 48.7596, lng: -113.7870 },
    description: 'A showcase of melting glaciers, alpine meadows, and carved valleys.',
    imageUrl: getParkImage('Glacier National Park', 'glacier'),
    established: '1910-05-11',
    funFact: 'Mountain goats here are often seen licking the mineral-rich rocks.'
  },
  {
    id: 'glacier-bay',
    name: 'Glacier Bay',
    state: 'AK',
    coordinates: { lat: 58.6658, lng: -136.9002 },
    description: 'Covering 3.3 million acres of rugged mountains and glaciers.',
    imageUrl: getParkImage('Glacier Bay National Park', 'glacier-bay'),
    established: '1980-12-02',
    funFact: 'Humpback whales swim here to eat up to half a ton of food per day.'
  },
  {
    id: 'grand-canyon',
    name: 'Grand Canyon',
    state: 'AZ',
    coordinates: { lat: 36.1069, lng: -112.1129 },
    description: 'A mile-deep gorge carved by the Colorado River.',
    imageUrl: getParkImage('Grand Canyon National Park', 'grand-canyon'),
    established: '1919-02-26',
    funFact: 'The canyon is so vast it creates its own weather!'
  },
  {
    id: 'grand-teton',
    name: 'Grand Teton',
    state: 'WY',
    coordinates: { lat: 43.7904, lng: -110.6818 },
    description: 'Mountains of the imagination. Mountains that led to the creation of the park.',
    imageUrl: getParkImage('Grand Teton National Park', 'grand-teton'),
    established: '1929-02-26',
    funFact: 'The peaks are some of the youngest mountains in the Rockies, "only" 10 million years old.'
  },
  {
    id: 'great-basin',
    name: 'Great Basin',
    state: 'NV',
    coordinates: { lat: 38.9833, lng: -114.3 },
    description: 'From the 13,000-foot Wheeler Peak to the sage-covered foothills.',
    imageUrl: getParkImage('Great Basin National Park', 'great-basin'),
    established: '1986-10-27',
    funFact: 'It contains the oldest known living trees on Earth, the Bristlecone Pines.'
  },
  {
    id: 'great-sand-dunes',
    name: 'Great Sand Dunes',
    state: 'CO',
    coordinates: { lat: 37.7916, lng: -105.5943 },
    description: 'The tallest dunes in North America are the centerpiece in a diverse landscape.',
    imageUrl: getParkImage('Great Sand Dunes National Park', 'great-sand-dunes'),
    established: '2004-09-13',
    funFact: 'The sand here sings! Avalanches create a low-frequency hum.'
  },
  {
    id: 'great-smoky-mountains',
    name: 'Great Smoky Mountains',
    state: 'TN',
    coordinates: { lat: 35.6131, lng: -83.5532 },
    description: 'Ridge upon ridge of forest straddles the border between NC and TN.',
    imageUrl: getParkImage('Great Smoky Mountains National Park', 'great-smoky-mountains'),
    established: '1934-06-15',
    funFact: 'It is the salamander capital of the world.'
  },
  {
    id: 'guadalupe-mountains',
    name: 'Guadalupe Mountains',
    state: 'TX',
    coordinates: { lat: 31.9231, lng: -104.8606 },
    description: 'Protects the world\'s most extensive Permian fossil reef.',
    imageUrl: getParkImage('Guadalupe Mountains National Park', 'guadalupe-mountains'),
    established: '1972-09-30',
    funFact: 'This mountain range is actually an ancient fossilized coral reef.'
  },
  {
    id: 'haleakala',
    name: 'Haleakalā',
    state: 'HI',
    coordinates: { lat: 20.7204, lng: -156.1552 },
    description: 'Home to the dormant Haleakalā Volcano and endangered Hawaiian geese.',
    imageUrl: getParkImage('Haleakala National Park', 'haleakala'),
    established: '1961-07-01',
    funFact: 'The crater is big enough to hold the entire island of Manhattan.'
  },
  {
    id: 'hawaii-volcanoes',
    name: 'Hawaii Volcanoes',
    state: 'HI',
    coordinates: { lat: 19.4194, lng: -155.2885 },
    description: 'Protects some of the most unique geological, biological, and cultural landscapes.',
    imageUrl: getParkImage('Hawaii Volcanoes National Park', 'hawaii-volcanoes'),
    established: '1916-08-01',
    funFact: 'You can walk through a 500-year-old lava tube here.'
  },
  {
    id: 'hot-springs',
    name: 'Hot Springs',
    state: 'AR',
    coordinates: { lat: 34.5217, lng: -93.0423 },
    description: 'A place of healing and luxury, preserving the ancient thermal springs.',
    imageUrl: getParkImage('Hot Springs National Park', 'hot-springs'),
    established: '1921-03-04',
    funFact: 'It was the first piece of land set aside by the federal government for preservation (1832).'
  },
  {
    id: 'indiana-dunes',
    name: 'Indiana Dunes',
    state: 'IN',
    coordinates: { lat: 41.6533, lng: -87.0524 },
    description: 'Diverse habitats of dunes, oak savannas, swamps, bogs, marshes, and forests.',
    imageUrl: getParkImage('Indiana Dunes National Park', 'indiana-dunes'),
    established: '2019-02-15',
    funFact: 'The dunes are known to "sing" or hum when sand slides down the slopes.'
  },
  {
    id: 'isle-royale',
    name: 'Isle Royale',
    state: 'MI',
    coordinates: { lat: 48.10, lng: -88.55 },
    description: 'A rugged, isolated island in Lake Superior, far from the sights and sounds of civilization.',
    imageUrl: getParkImage('Isle Royale National Park', 'isle-royale'),
    established: '1940-04-03',
    funFact: 'It is famous for the longest-running predator-prey study of wolves and moose.'
  },
  {
    id: 'joshua-tree',
    name: 'Joshua Tree',
    state: 'CA',
    coordinates: { lat: 33.8734, lng: -115.9010 },
    description: 'Two distinct desert ecosystems, the Mojave and the Colorado, come together.',
    imageUrl: getParkImage('Joshua Tree National Park', 'joshua-tree'),
    established: '1994-10-31',
    funFact: 'Joshua Trees aren\'t actually trees; they are giant succulents related to Yuccas.'
  },
  {
    id: 'katmai',
    name: 'Katmai',
    state: 'AK',
    coordinates: { lat: 58.50, lng: -155.00 },
    description: 'Known for its volcanoes and the brown bears that gather at Brooks Falls.',
    imageUrl: getParkImage('Katmai National Park', 'katmai'),
    established: '1980-12-02',
    funFact: 'Home to the annual "Fat Bear Week" competition.'
  },
  {
    id: 'kenai-fjords',
    name: 'Kenai Fjords',
    state: 'AK',
    coordinates: { lat: 59.9248, lng: -149.6501 },
    description: 'Where the ice age lingers, with glaciers, earthquakes, and ocean storms.',
    imageUrl: getParkImage('Kenai Fjords National Park', 'kenai-fjords'),
    established: '1980-12-02',
    funFact: 'Over 50% of the park is covered in ice.'
  },
  {
    id: 'kings-canyon',
    name: 'Kings Canyon',
    state: 'CA',
    coordinates: { lat: 36.8879, lng: -118.5551 },
    description: 'A land of giant skyscraping trees and deep valleys.',
    imageUrl: getParkImage('Kings Canyon National Park', 'kings-canyon'),
    established: '1940-03-04',
    funFact: 'It is home to the General Grant Tree, proclaimed "The Nation\'s Christmas Tree".'
  },
  {
    id: 'kobuk-valley',
    name: 'Kobuk Valley',
    state: 'AK',
    coordinates: { lat: 67.55, lng: -159.28 },
    description: 'Caribou migrate through the Great Kobuk Sand Dunes here.',
    imageUrl: getParkImage('Kobuk Valley National Park', 'kobuk-valley'),
    established: '1980-12-02',
    funFact: 'It has sand dunes... in the Arctic!'
  },
  {
    id: 'lake-clark',
    name: 'Lake Clark',
    state: 'AK',
    coordinates: { lat: 60.97, lng: -153.42 },
    description: 'Volcanoes, jagged mountains, glaciers, rivers, and waterfalls.',
    imageUrl: getParkImage('Lake Clark National Park', 'lake-clark'),
    established: '1980-12-02',
    funFact: 'This is one of the least visited parks because no roads lead here.'
  },
  {
    id: 'lassen-volcanic',
    name: 'Lassen Volcanic',
    state: 'CA',
    coordinates: { lat: 40.4977, lng: -121.4207 },
    description: 'All four types of volcanoes found in the world are found here.',
    imageUrl: getParkImage('Lassen Volcanic National Park', 'lassen-volcanic'),
    established: '1916-08-09',
    funFact: 'Lassen Peak is the largest plug dome volcano in the world.'
  },
  {
    id: 'mammoth-cave',
    name: 'Mammoth Cave',
    state: 'KY',
    coordinates: { lat: 37.1862, lng: -86.1005 },
    description: 'The world\'s longest known cave system.',
    imageUrl: getParkImage('Mammoth Cave National Park', 'mammoth-cave'),
    established: '1941-07-01',
    funFact: 'Over 400 miles of passageways have been mapped, and no one knows how big it really is.'
  },
  {
    id: 'mesa-verde',
    name: 'Mesa Verde',
    state: 'CO',
    coordinates: { lat: 37.1838, lng: -108.4887 },
    description: 'Protecting the archaeological heritage of the Ancestral Pueblo people.',
    imageUrl: getParkImage('Mesa Verde National Park', 'mesa-verde'),
    established: '1906-06-29',
    funFact: 'The Cliff Palace has 150 rooms and 23 kivas (ceremonial rooms).'
  },
  {
    id: 'mount-rainier',
    name: 'Mount Rainier',
    state: 'WA',
    coordinates: { lat: 46.8523, lng: -121.7603 },
    description: 'An active volcano ascending to 14,410 feet above sea level.',
    imageUrl: getParkImage('Mount Rainier National Park', 'mount-rainier'),
    established: '1899-03-02',
    funFact: 'It is the most glaciated peak in the contiguous USA.'
  },
  {
    id: 'new-river-gorge',
    name: 'New River Gorge',
    state: 'WV',
    coordinates: { lat: 37.9626, lng: -81.0850 },
    description: 'A rugged, whitewater river flowing northward through deep canyons.',
    imageUrl: getParkImage('New River Gorge National Park', 'new-river-gorge'),
    established: '2020-12-27',
    funFact: 'Despite its name, the New River is one of the oldest rivers on the continent.'
  },
  {
    id: 'north-cascades',
    name: 'North Cascades',
    state: 'WA',
    coordinates: { lat: 48.7718, lng: -121.2985 },
    description: 'A rugged wilderness of jagged peaks, deep valleys, and cascading waterfalls.',
    imageUrl: getParkImage('North Cascades National Park', 'north-cascades'),
    established: '1968-10-02',
    funFact: 'It has more glaciers (over 300) than any other US park outside Alaska.'
  },
  {
    id: 'olympic',
    name: 'Olympic',
    state: 'WA',
    coordinates: { lat: 47.8021, lng: -123.6044 },
    description: 'Three distinct ecosystems: subalpine forest, temperate rainforest, and rugged Pacific coast.',
    imageUrl: getParkImage('Olympic National Park', 'olympic'),
    established: '1938-06-29',
    funFact: 'One of the quietest places in the US, the "One Square Inch of Silence", is located here.'
  },
  {
    id: 'petrified-forest',
    name: 'Petrified Forest',
    state: 'AZ',
    coordinates: { lat: 34.9100, lng: -109.8067 },
    description: 'Home to one of the world\'s largest and most colorful concentrations of petrified wood.',
    imageUrl: getParkImage('Petrified Forest National Park', 'petrified-forest'),
    established: '1962-12-09',
    funFact: 'The "wood" here is actually pure quartz crystal.'
  },
  {
    id: 'pinnacles',
    name: 'Pinnacles',
    state: 'CA',
    coordinates: { lat: 36.4869, lng: -121.1669 },
    description: 'Towering rock spires that are the remains of an ancient volcano.',
    imageUrl: getParkImage('Pinnacles National Park', 'pinnacles'),
    established: '2013-01-10',
    funFact: 'This park is a major release site for the endangered California Condor.'
  },
  {
    id: 'redwood',
    name: 'Redwood',
    state: 'CA',
    coordinates: { lat: 41.2132, lng: -124.0046 },
    description: 'Home to the tallest trees on Earth.',
    imageUrl: getParkImage('Redwood National Park', 'redwood'),
    established: '1968-10-02',
    funFact: 'Hyperion, the tallest known living tree (380 ft), is hidden somewhere in this park.'
  },
  {
    id: 'rocky-mountain',
    name: 'Rocky Mountain',
    state: 'CO',
    coordinates: { lat: 40.3428, lng: -105.6836 },
    description: 'Spectacular mountain environments with alpine lakes and wildlife.',
    imageUrl: getParkImage('Rocky Mountain National Park', 'rocky-mountain'),
    established: '1915-01-26',
    funFact: 'Trail Ridge Road is the highest continuous paved road in the United States.'
  },
  {
    id: 'saguaro',
    name: 'Saguaro',
    state: 'AZ',
    coordinates: { lat: 32.2967, lng: -111.1666 },
    description: 'Home to the nation\'s largest cacti, the giant saguaro.',
    imageUrl: getParkImage('Saguaro National Park', 'saguaro'),
    established: '1994-10-14',
    funFact: 'A Saguaro cactus can live for 200 years and weigh more than a car.'
  },
  {
    id: 'sequoia',
    name: 'Sequoia',
    state: 'CA',
    coordinates: { lat: 36.4864, lng: -118.5658 },
    description: 'A land of giants, including the General Sherman Tree.',
    imageUrl: getParkImage('Sequoia National Park', 'sequoia'),
    established: '1890-09-25',
    funFact: 'The General Sherman Tree is the largest tree on Earth by volume.'
  },
  {
    id: 'shenandoah',
    name: 'Shenandoah',
    state: 'VA',
    coordinates: { lat: 38.2928, lng: -78.6796 },
    description: 'A land of cascading waterfalls, spectacular vistas, and quiet woods.',
    imageUrl: getParkImage('Shenandoah National Park', 'shenandoah'),
    established: '1935-12-26',
    funFact: 'Skyline Drive runs the entire length of the park along the ridge of the mountains.'
  },
  {
    id: 'theodore-roosevelt',
    name: 'Theodore Roosevelt',
    state: 'ND',
    coordinates: { lat: 46.9790, lng: -103.5387 },
    description: 'The badlands where President Roosevelt once ranched and hunted.',
    imageUrl: getParkImage('Theodore Roosevelt National Park', 'theodore-roosevelt'),
    established: '1978-11-10',
    funFact: 'It is the only national park named after a single person.'
  },
  {
    id: 'virgin-islands',
    name: 'Virgin Islands',
    state: 'VI',
    coordinates: { lat: 18.3381, lng: -64.7930 },
    description: 'Tropical beaches, coral reefs, and historic ruins.',
    imageUrl: getParkImage('Virgin Islands National Park', 'virgin-islands'),
    established: '1956-08-02',
    funFact: 'The underwater trails here have signs to guide snorkelers.'
  },
  {
    id: 'voyageurs',
    name: 'Voyageurs',
    state: 'MN',
    coordinates: { lat: 48.4841, lng: -92.8271 },
    description: 'A water-based park where you must leave your car behind.',
    imageUrl: getParkImage('Voyageurs National Park', 'voyageurs'),
    established: '1975-04-08',
    funFact: 'In winter, the frozen lakes turn into ice roads for cars and snowmobiles.'
  },
  {
    id: 'white-sands',
    name: 'White Sands',
    state: 'NM',
    coordinates: { lat: 32.7872, lng: -106.3257 },
    description: 'Great wave-like dunes of gypsum sand.',
    imageUrl: getParkImage('White Sands National Park', 'white-sands'),
    established: '2019-12-20',
    funFact: 'The sand is gypsum, which is water-soluble and rarely found as sand.'
  },
  {
    id: 'wind-cave',
    name: 'Wind Cave',
    state: 'SD',
    coordinates: { lat: 43.57, lng: -103.48 },
    description: 'One of the world\'s longest and most complex caves.',
    imageUrl: getParkImage('Wind Cave National Park', 'wind-cave'),
    established: '1903-01-09',
    funFact: 'It is the first cave to be designated a national park anywhere in the world.'
  },
  {
    id: 'wrangell-st-elias',
    name: 'Wrangell-St. Elias',
    state: 'AK',
    coordinates: { lat: 61.00, lng: -142.00 },
    description: 'The largest national park in the United States, rising from the ocean to 18,008 feet.',
    imageUrl: getParkImage('Wrangell-St. Elias National Park', 'wrangell-st-elias'),
    established: '1980-12-02',
    funFact: 'It is larger than the country of Switzerland!'
  },
  {
    id: 'yellowstone',
    name: 'Yellowstone',
    state: 'WY',
    coordinates: { lat: 44.4280, lng: -110.5885 },
    description: 'The world\'s first national park, known for geysers and wildlife.',
    imageUrl: getParkImage('Yellowstone National Park', 'yellowstone'),
    established: '1872-03-01',
    funFact: 'Old Faithful isn\'t the biggest geyser, but it is the most punctual.'
  },
  {
    id: 'yosemite',
    name: 'Yosemite',
    state: 'CA',
    coordinates: { lat: 37.8651, lng: -119.5383 },
    description: 'Famous for its waterfalls, giant sequoias, and granite cliffs.',
    imageUrl: getParkImage('Yosemite National Park', 'yosemite'),
    established: '1890-10-01',
    funFact: 'Yosemite Falls is one of the tallest waterfalls in North America (2,425 ft).'
  },
  {
    id: 'zion',
    name: 'Zion',
    state: 'UT',
    coordinates: { lat: 37.2982, lng: -113.0263 },
    description: 'Massive sandstone cliffs of cream, pink, and red.',
    imageUrl: getParkImage('Zion National Park', 'zion'),
    established: '1919-11-19',
    funFact: 'The Olympic Torch passed through Zion on its way to Salt Lake City in 2002.'
  }
];

// Mock User Data
export const USER_LOGS: UserVisit[] = [
  {
    parkId: 'yosemite',
    visited: true,
    visitCount: 3,
    dateLastVisited: '2023-05-15',
    rating: 5,
    notes: 'The Half Dome hike was grueling but worth every step. Saw a black bear near the trailhead.',
    favoriteMoment: 'Sunrise at Tunnel View'
  },
  {
    parkId: 'zion',
    visited: true,
    visitCount: 1,
    dateLastVisited: '2022-11-01',
    rating: 5,
    notes: 'Angels Landing is terrifyingly beautiful. Need to come back for the Narrows.',
    favoriteMoment: 'Scouting for deer at dusk'
  },
  {
    parkId: 'acadia',
    visited: true,
    visitCount: 1,
    dateLastVisited: '2021-08-10',
    rating: 4,
    notes: 'Very crowded but the coast is stunning. Lobster rolls afterwards were a highlight.',
    favoriteMoment: 'Cadillac Mountain sunrise'
  },
  {
    parkId: 'everglades',
    visited: true,
    visitCount: 1,
    dateLastVisited: '2024-01-20',
    rating: 3,
    notes: 'Lots of alligators. A bit flat for my hiking taste, but the airboat tour was fun.',
    favoriteMoment: 'Spotting a baby gator'
  },
  {
    parkId: 'denali',
    visited: false,
    visitCount: 0
  }
];

// Product Manager Badge Proposals
export const BADGES: Badge[] = [
  {
    id: 'ranger-rookie',
    name: 'Ranger Rookie',
    description: 'Visit your first National Park.',
    icon: 'compass',
    color: 'bg-forest-100 text-forest-700',
    condition: (visits) => visits.filter(v => v.visited).length >= 1
  },
  {
    id: 'seasoned-explorer',
    name: 'Seasoned Explorer',
    description: 'Visit 5 or more unique National Parks.',
    icon: 'map',
    color: 'bg-earth-200 text-stone-800',
    condition: (visits) => visits.filter(v => v.visited).length >= 5
  },
  {
    id: 'canyon-conqueror',
    name: 'Canyon Conqueror',
    description: 'Visit Grand Canyon or Zion.',
    icon: 'mountain',
    color: 'bg-rust-500 text-white',
    condition: (visits) => visits.some(v => v.visited && ['grand-canyon', 'zion', 'bryce-canyon', 'canyonlands'].includes(v.parkId))
  },
  {
    id: 'coastal-wandering',
    name: 'Coastal Wanderer',
    description: 'Visit a park on the coast (e.g. Acadia, Olympic).',
    icon: 'waves',
    color: 'bg-blue-100 text-blue-800',
    condition: (visits) => visits.some(v => v.visited && ['acadia', 'olympic', 'everglades', 'biscayne', 'channel-islands'].includes(v.parkId))
  },
  {
    id: 'high-altitude',
    name: 'High Altitude',
    description: 'Visit a high elevation park (e.g. Rocky Mountain, Denali).',
    icon: 'cloud',
    color: 'bg-stone-200 text-stone-800',
    condition: (visits) => visits.some(v => v.visited && ['rocky-mountain', 'glacier', 'denali', 'mount-rainier', 'grand-teton'].includes(v.parkId))
  },
  {
    id: 'super-fan',
    name: 'Super Fan',
    description: 'Visit the same park 3 or more times.',
    icon: 'star',
    color: 'bg-yellow-100 text-yellow-800',
    condition: (visits) => visits.some(v => v.visited && v.visitCount >= 3)
  },
  {
    id: 'island-hopper',
    name: 'Island Hopper',
    description: 'Visit a park outside the contiguous US (e.g. Hawaii, Alaska).',
    icon: 'sun',
    color: 'bg-orange-100 text-orange-800',
    condition: (visits) => visits.some(v => v.visited && ['denali', 'hawaii-volcanoes', 'haleakala', 'virgin-islands', 'american-samoa'].includes(v.parkId))
  }
];
