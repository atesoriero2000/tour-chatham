//35 mph = 15 m/s = 51 fps
const RADIUS_DELAY = 500; //feet

// const pic1 = require('../../images/testing_pics/Flower.jpg');
// const pic2 = require('../../images/testing_pics/Eagle.jpg');
// const pic3 = require('../../images/testing_pics/FlagWaving.jpg');
// const pic4 = require('../../images/testing_pics/boy-scout-emblem.jpg');


const a1 = require('../../images/edited/A1_00000.jpg');
const a2 = require('../../images/edited/A2_00000.jpg');
const a3 = require('../../images/edited/A3_00000.jpg');

const b1 = require('../../images/edited/B1_00000.jpg');
const b2 = require('../../images/edited/B2_00000.jpg');

const d1 = require('../../images/edited/D1_00000.jpg');
const d2 = require('../../images/edited/D2_00000.jpg');
const d3 = require('../../images/edited/D3_00000.jpg');

const e0 = require('../../images/edited/E0_00000.jpg');
const e1 = require('../../images/edited/E1_00000.jpg');
const e2 = require('../../images/edited/E2_00000.jpg');
const e3 = require('../../images/edited/E3_00000.jpg');

const f0 = require('../../images/edited/F0_00000.jpg');
const f1 = require('../../images/edited/F1_00000.jpg');
const f2 = require('../../images/edited/F2_00000.jpg');
const f3 = require('../../images/edited/F3_00000.jpg');

const g1 = require('../../images/edited/G1_00000.jpg');
const g2 = require('../../images/edited/G2_00000.jpg');
const g3 = require('../../images/edited/G3_00000.jpg');
const g4 = require('../../images/edited/G4_00000.jpg');
const g5 = require('../../images/edited/G5_00000.jpg');

const h1 = require('../../images/edited/H1_00000.jpg');
const h2 = require('../../images/edited/H2_00000.jpg');

const i1 = require('../../images/edited/I1_00000.jpg');
const i2 = require('../../images/edited/I2_00000.jpg');

const j1 = require('../../images/edited/J1_00000.jpg');
const j2 = require('../../images/edited/J2_00000.jpg');
const j3 = require('../../images/edited/J3_00000.jpg');

const k1 = require('../../images/edited/K1_00000.jpg');
const k2 = require('../../images/edited/K2_00000.jpg');

const l1 = require('../../images/edited/L1_00000.jpg');
const l2 = require('../../images/edited/L2_00000.jpg');

const m1 = require('../../images/edited/M1_00000.jpg');
const m2 = require('../../images/edited/M2_00000.jpg');
const m3 = require('../../images/edited/M3_00000.jpg');
const m4 = require('../../images/edited/M4_00000.jpg');

const n1 = require('../../images/edited/N1_00000.jpg');
const n2 = require('../../images/edited/N2_00000.jpg');

const o1 = require('../../images/edited/O1_00000.jpg');
const o2 = require('../../images/edited/O2_00000.jpg');
const o3 = require('../../images/edited/O3_00000.jpg');

//LATER turn right to travel
//LATER take a right onto

//THE MOUNT VERNON SCHOOLHOUSE
const loc0 = [
  {
    direction: 'NONE_TURN',
    picture: a1,
    latitude: 40.721841,
    longitude: -74.403383,
    radius: 500,
  },
];

//THE JOHNSON HOUSE
const loc1 = [
  {
    direction: 'Turn left out of the Schoolhouse parking lot. Then, travel along Fairmount Ave.',
    picture: a1,
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'Travel straight 2.03 miles past the Fairmount Country Store Deli.',
    picture: a2,
    latitude: 40.703046,
    longitude: -74.428045,
    radius: 9639 - RADIUS_DELAY, // straight 9244
  },
  {
    direction: 'Drive past the marker on the left. Then, turn left to park in Esternay Field. You may walk back up Fairmount to the marker.',
    picture: a3,
    latitude: 40.703046,
    longitude: -74.428045, // from 40.705910, -74.429376
    radius: 3000, //1108 Smaller bc prev is a go straight command and radius can go past that point
  },
];


//ISAAC CLARK FARMSTEAD
const loc2 = [
 {
   direction: 'Turn around and make a left onto Fairmount Ave. Shortly after, take a right onto River Road and follow for .6 miles.',
   picture: b1,
   latitude: null,
   longitude: null,
   radius: 500,
 },
 {
   direction: 'Drive past the marker on the right, then turn left to park in the Passaic River County Park entrance. (if you reach Mountain Ave, you have gone too far)',
   picture: b2,
   latitude: 40.697119,
   longitude: -74.435379,
   radius: 2864 - RADIUS_DELAY, // from 40.702367, -74.42768
 },
];


//BEY'S BOXING CAMP
const loc3 = [
 {
   direction: 'Turn around in the Passaic River County Park entrance. Then, turn right to travel back onto River Road (northeast).',
   picture: d1,
   latitude: null,
   longitude: null,
   radius: 500,
 },
 {
   direction: 'Follow River Road for 1.3 miles. The marker is 0.7 miles past Fairmount Ave.',
   picture: d2,
   latitude: 40.708721,
   longitude: -74.416936,
   radius: 2863 + 3770 - RADIUS_DELAY, // straight
 },
 {
   direction: 'Park along River Road to the right in the gravel outcrop. The marker is across the street at 516 River Road.',
   picture: d3,
   latitude: 40.708721,
   longitude: -74.416936,
   radius: 3770 - RADIUS_DELAY, // from 40.702367, -74.427685
 },
];


//PRINCE BALDWIN HOUSE
const loc4 = [
  {
    direction: 'Continue traveling along River Road (right).',
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'Make a left to continue on River Road.',
    picture: e1,
    latitude: 40.714512,
    longitude: -74.407812,
    radius: 3291 - RADIUS_DELAY,
  },
  {
    direction: 'Turn Left onto Southern Blvd and travel up "Snake Hill".',
    picture: e2,
    latitude: 40.720305,
    longitude: -74.401989,
    radius: 2657 - RADIUS_DELAY,
  },
  {
    direction: 'Continue straight along Southern Blvd until you reach the marker (right). You may park in the gravel driveway to the right or along Southern Blvd.', //just past the intersection of Fairmount Ave
    picture: e3,
    latitude: 40.722827,
    longitude: -74.405053,
    radius: 1000,  //1251,
  },
];


// CHATHAM COLONY ASSOCIATION
const loc5 = [
  {
    direction: 'Continue traveling along Southern Blvd and take the 3rd right onto Lafayette Ave.',
    picture: f0,
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'Take the 3rd right onto Lafayette Ave.', // (approximately 0.4 miles).',
    picture: f1,
    latitude: 40.727589,
    longitude: -74.409730,
    radius: 2166 - RADIUS_DELAY,
  },
  {
    direction: 'Take the first left onto Spring St.', // (approximately 0.2 miles).',
    picture: f2,
    latitude: 40.729022,
    longitude: -74.407241,
    radius: 864 - 150, // from 40.727589, -74.409730
  },
  {
    direction: 'Continue until you see the marker. You may park along the right side of Spring Street.',
    picture: f3,
    latitude: 40.730427,
    longitude: -74.408672,
    radius: 648 - 100,
  },
];


//LEWIS NOE FARMSTEAD
const loc6 = [
  {
    direction: 'Drive 0.2 miles and take the first right onto School Ave. (if you reach Dale Drive, you have gone too far)',
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'Drive to the end of School Ave and turn right onto Maple St.', //LATER right, 
    picture: g2,
    latitude: 40.733880,
    longitude: -74.403967,
    radius: 1785 - 150, // from 40.730896, -74.409085
  },
  {
    direction: 'Take another right onto Lafayette Ave and drive 0.4 miles.',
    picture: g3,
    latitude: 40.732065,
    longitude: -74.402097,
    radius: 840 - 140,
  },
  {
    direction: 'Turn right onto Southern Blvd (0.2 miles).', //LATER right,
    picture: g4,
    latitude: 40.727553,
    longitude: -74.409742,
    radius: 2679 - 250,
  },
  {
    direction: 'The marker is on the right at 184 Southern Blvd. Park in Southern Boulevard School to the right just past the marker.', // (If you reached Jay Road you have gone too far)
    picture: g5,
    latitude: 40.729440,
    longitude: -74.413286,
    radius: 1198 - 200,
  },
];


//NOE POND
const loc7 = [
  {
    direction: 'Turn right onto Southern Blvd and travel for 0.8 miles.', // towards Jay Road // approximately //LATER right,
    picture: h1,
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'Drive past the marker on the left. Then turn left to park in The Noe Pond Club (395 Southern Blvd). You may walk to the marker.', //The marker is 100 ft before the entrance of Noe pond. (If you reach Hickory Pl you have gone too far)
    picture: h2,
    latitude: 40.737275,
    longitude: -74.425151,
    radius: 4351 - RADIUS_DELAY,
  },
];


//GREENHOUSE INDUSTRY
const loc8 = [
  {
    direction: 'Turn left out of Noe Pond and continue along Southern Blvd.',
    picture: i1,
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'Turn left into Nash Field (405 Southern Blvd). You may park in Nash Field.',
    picture: i2,
    latitude: 40.741458,
    longitude: -74.430853,
    radius: 2194 - RADIUS_DELAY,
  },
];


//ELIAS BOUDINOT HOUSE
const loc9 = [
  {
    // direction: 'Continue along Southern Blvd (left) and shortly after take a left onto Hickory Pl (if you reach Shunpike Road, you have gone too far)',
    direction: 'Turn left onto Southern Blvd then turn left onto Hickory Pl shortly after. (if you reach Shunpike Road, you have gone too far)',
    picture: j1,
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'Turn left onto Green Village Road and drive approximately 0.8 miles.',
    picture: j2,
    latitude: 40.744404,
    longitude: -74.434543,
    radius: 1350 - 250, // from 40.742026, -74.430803
  },
  {
    direction: 'The destination is on the left at 461 Green Village Road. You may park in the driveway to the left.',
    picture: j3,
    latitude: 40.738649,
    longitude: -74.446364,
    radius: 3884 - RADIUS_DELAY,
  },
];


//COCKREM FARM
const loc10 = [
  {
    direction: 'Turn left back onto Green Village Road towards 486 Green Village Road.',
    picture: k1,
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'Follow Green Village Road to 486 Green Village Road. You may park along the white fence in the outcrop to the right.',
    picture: k2,
    latitude: 40.738841,
    longitude: -74.449521,
    radius: 876 - 150,
  },
];


//GREEN VILLAGE
const loc11 = [
  {
    direction: 'Continue along Green Village Road for approximately 0.9 miles.', //(west) //toward Fawcett Lane 
    picture: l1,
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'Stop at 536 Green Village Road and park in the Green Village Deli to the right.',
    picture: l2,
    latitude: 40.739029,
    longitude: -74.453421,
    radius: 1080 - 150,
  },
];


//GIBBONS HORSE BARN
const loc12 = [
  {
    direction: 'Turn right and continue along Green Village Road for approximately 0.3 miles. Then, keep right to travel along Spring Valley Rd.', //(toward Meyersville Road)
    picture: m1,
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'Keep right to stay on Spring Valley Road.', //(0.9 miles)
    picture: m2,
    latitude: 40.740854,
    longitude: -74.456702,
    radius: 1125 - 150,
  },
  {
    direction: 'Take the next right and follow Loantaka Way for 0.5 miles until you see the maroon marker on the right.',
    picture: m3,
    latitude: 40.753155,
    longitude: -74.452436,
    radius: 4640 - RADIUS_DELAY,
  },
  {
    direction: 'The destination is on the right at 340 Loantaka Way. You may park in gravel driveway to the right.',
    picture: m4,
    latitude: 40.752534,
    longitude: -74.446877,
    radius: 1553 - 150,
  },
];


//LOANTAKA SCHOOL
const loc13 = [
  {
    direction: 'Turn right and continue along Loantaka Way for 0.1 miles. The destination is on the left (a grey/white house).',
    picture: n1,
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'The destination is on the left (a grey/white house). You may park in the right shoulder along the wooden fence.',
    picture: n2,
    latitude: 40.753724,
    longitude: -74.440480,
    radius: 1820 - 200,
  },
];


//BOISAUBIN HOUSE
const loc14 = [
  {
    direction: 'Continue straight along Loantaka Way past Shunpike Road. Then, turn left onto Woodland Road.', //(Woodland Road becomes Woodland Ave).', // LEAVING BAD(jk) 1698
    picture: o1,
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'Turn right onto Treadwell Ave. (if you reach Nordling Lane, you have gone too far)', //LATER right,
    picture: o2,
    latitude: 40.765623,
    longitude: -74.445828,
    radius: 4786 - RADIUS_DELAY, // from 40.755507, -74.434803
  },
  {
    direction: 'Once you see the marker on the left, park along fence in an outcrop to the right.',
    picture: o3,
    latitude: 40.768086,
    longitude: -74.442928,
    radius: 1204 - 200,
  },
];


/*------------------*/
/* ! Load At Pics ! */
/*------------------*/
// These are the pretty pics of each marker location
// Comes in OG size and square
// Used in start.js and audio-tour.js
const atPic0 = require('../../images/atPics/at0.jpg');
const atPic1 = require('../../images/atPics/at1.jpg');
const atPic1_2 = require('../../images/atPics/at1_2.jpg');
const atPic2 = require('../../images/atPics/at2.jpg');
const atPic3 = require('../../images/atPics/at3.jpg');
const atPic4 = require('../../images/atPics/at4.jpg');
const atPic5 = require('../../images/atPics/at5.jpg');
const atPic6 = require('../../images/atPics/at6.jpg');
const atPic6_2 = require('../../images/atPics/at6_2.jpg');
const atPic7 = require('../../images/atPics/at7.jpg');
const atPic7_2 = require('../../images/atPics/at7_2.jpg');
const atPic8 = require('../../images/atPics/at8.jpg');
const atPic9 = require('../../images/atPics/at9.jpg');
const atPic10 = require('../../images/atPics/at10.jpg');
const atPic11 = require('../../images/atPics/at11.jpg');
const atPic11_2 = require('../../images/atPics/at11_2.jpg');
const atPic12 = require('../../images/atPics/at12.jpg');
const atPic12_2 = require('../../images/atPics/at12_2.jpg');
const atPic12_3 = require('../../images/atPics/at12_3.jpg');
const atPic12_4 = require('../../images/atPics/at12_4.jpg');
const atPic13 = require('../../images/atPics/at13.jpg');
const atPic13_2 = require('../../images/atPics/at13_2.jpg');
const atPic14 = require('../../images/atPics/at14.jpg');
const atPic14_2 = require('../../images/atPics/at14_2.jpg');
const atPic14_3 = require('../../images/atPics/at14_3.jpg');

// Square atPics 
// Used in selection-page.js and passed to info-page.js
const sAtPic0 = require('../../images/atPics/s_at0.jpg');
const sAtPic1 = require('../../images/atPics/s_at1.jpg');
const sAtPic1_2 = require('../../images/atPics/s_at1_2.jpg');
const sAtPic2 = require('../../images/atPics/s_at2.jpg');
const sAtPic3 = require('../../images/atPics/s_at3.jpg');
const sAtPic4 = require('../../images/atPics/s_at4.jpg');
const sAtPic5 = require('../../images/atPics/s_at5.jpg');
const sAtPic6 = require('../../images/atPics/s_at6.jpg');
const sAtPic6_2 = require('../../images/atPics/s_at6_2.jpg');
const sAtPic7 = require('../../images/atPics/s_at7.jpg');
const sAtPic7_2 = require('../../images/atPics/s_at7_2.jpg');
const sAtPic8 = require('../../images/atPics/s_at8.jpg');
const sAtPic9 = require('../../images/atPics/s_at9.jpg');
const sAtPic10 = require('../../images/atPics/s_at10.jpg');
const sAtPic11 = require('../../images/atPics/s_at11.jpg');
const sAtPic11_2 = require('../../images/atPics/s_at11_2.jpg');
const sAtPic12 = require('../../images/atPics/s_at12.jpg');
const sAtPic12_2 = require('../../images/atPics/s_at12_2.jpg');
const sAtPic12_3 = require('../../images/atPics/s_at12_3.jpg');
const sAtPic12_4 = require('../../images/atPics/s_at12_4.jpg');
const sAtPic13 = require('../../images/atPics/s_at13.jpg');
const sAtPic13_2 = require('../../images/atPics/s_at13_2.jpg');
const sAtPic14 = require('../../images/atPics/s_at14.jpg');
const sAtPic14_2 = require('../../images/atPics/s_at14_2.jpg');
const sAtPic14_3 = require('../../images/atPics/s_at14_3.jpg');


/*----------------*/
/* ! Load Audio ! */
/*----------------*/
var to1 = loadSound('page_3.4_lilly.mp3');
var to2 = loadSound('page_6_eitan.mp3');
var to3 = loadSound('page_7_tony.mp3');
var to4 = loadSound('page_9_kimberly.mp3');
var to5 = loadSound('page_11_owen.mp3');
var to6 = loadSound('page_13_tony.mp3');
var to7 = loadSound('page_15_eitan.mp3');
var to8 = loadSound('page_17_owen.mp3');
var to9 = loadSound('page_18_eitan.mp3');
var to10 = loadSound('page_20_kimberly.mp3');
var to11 = loadSound('page_21_mikey.mp3');
var to12 = loadSound('page_22_lilly.mp3');
var to13 = loadSound('page_24_cat.mp3');
var to14 = loadSound('page_25_mikey.mp3');

var at0 = loadSound('page_2_eitan.mp3');
var at1 = loadSound('page_5_cat.mp3');
// var at2 = loadSound('NULL');
var at3 = loadSound('page_8_owen.mp3');
var at4 = loadSound('page_10_grace.mp3');
var at5 = loadSound('page_12_mikey.mp3');
var at6 = loadSound('page_14_lilly.mp3');
var at7 = loadSound('page_16_cat.mp3');
// var at8 = loadSound('NULL');
var at9 = loadSound('page_19_owen.mp3');
// var at10 = loadSound('NULL');
// var at11 = loadSound('NULL');
var at12 = loadSound('page_23_jacob.mp3');
// var at13 = loadSound('NULL');
var at14 = loadSound('page_26_eitan.mp3');

function loadSound(file){
  var Sound = require('react-native-sound');
  return new Sound(file, Sound.MAIN_BUNDLE, error => (error) && console.log('FAILED TO LOAD SOUND' + error))
}


// No atAudio:  2, 8, 10, 11, 13
// 2 atPics:    1, 6, 7, 11, 13
// 3 atPics:    14
// 4 atPics:    12 
// No toAudio:  0

// Used in audio-page.js, selection-page.js, start.js
// TLDR: Ignore/Leave as is. CANNOT group simplify locations array for start and selection page
  // !loc:           audio-page.js
  // !title:         selection-page.js, audio-page.js
  // !address:       selection-page.js
  // !toAudio:       audio-page.js
  // !atAudio:       audio-page.js
  // !atPics:        start.js, audio-page.js  (start does swiper of all images, audio-page does swiper if multiple pics available)
  // !squareAtPics:  selection-page.js (info-page.js does swiper if multiple pics available)



const Locations = [
  { turns: loc0, title: 'The Mount Vernon Schoolhouse', address: '24 Southern Blvd, Chatham Township', time: 90, toAudio: null, atAudio: at0, atPic: [atPic0], squareAtPic: [sAtPic0] },
  { turns: loc1, title: 'The Johnson House Marker', address: '805 Fairmount Ave, Chatham Township', time: 80, toAudio: to1, atAudio: at1, atPic: [atPic1, atPic1_2], squareAtPic: [sAtPic1, sAtPic1_2] },
  { turns: loc2, title: 'The Isaac Clark Farmstead Marker', address: '788 River Road, Chatham Township', time: 75, toAudio: to2, atAudio: null, atPic: [atPic2], squareAtPic: [sAtPic2] },
  { turns: loc3, title: 'The Bey’s Boxing Camp Marker', address: '516 River Road, Chatham Township', time: 70, toAudio: to3, atAudio: at3, atPic: [atPic3], squareAtPic: [sAtPic3] },
  { turns: loc4, title: 'The Price-Baldwin House Marker', address: '48 Southern Blvd, Chatham Township', time: 60, toAudio: to4, atAudio: at4, atPic: [atPic4], squareAtPic: [sAtPic4] },
  { turns: loc5, title: 'The Chatham Colony Association', address: '25 Spring Street, Chatham Township', time: 55, toAudio: to5, atAudio: at5, atPic: [atPic5], squareAtPic: [sAtPic5] },
  { turns: loc6, title: 'The Lewis Noe Farmstead Marker', address: '184 Southern Blvd, Chatham Township', time: 50, toAudio: to6, atAudio: at6, atPic: [atPic6, atPic6_2], squareAtPic: [sAtPic6, sAtPic6_2] },
  { turns: loc7, title: 'The Noe Pond Marker', address: '395 Southern Blvd, Chatham Township', time: 40, toAudio: to7, atAudio: at7, atPic: [atPic7, atPic7_2], squareAtPic: [sAtPic7, sAtPic7_2] },
  { turns: loc8, title: 'The Greenhouse Industry Marker', address: '405 Southern Blvd, Chatham Township', time: 35, toAudio: to8, atAudio: null, atPic: [atPic8], squareAtPic: [sAtPic8] },
  { turns: loc9, title: 'The Elias Boudinot House Marker', address: '461 Green Village Road, Green Village', time: 30, toAudio: to9, atAudio: at9, atPic: [atPic9], squareAtPic: [sAtPic9] },
  { turns: loc10, title: 'The Cockrem Farm Marker', address: '486 Green Village Road, Green Village', time: 25, toAudio: to10, atAudio: null, atPic: [atPic10], squareAtPic: [sAtPic10] },
  { turns: loc11, title: 'The Green Village Marker', address: '536 Green Village Road, Green Village', time: 20, toAudio: to11, atAudio: null, atPic: [atPic11, atPic11_2], squareAtPic: [sAtPic11, sAtPic11_2] },
  { turns: loc12, title: 'The Gibbons Horse Barn Marker', address: '336 Loantaka Way, Madison', time: 15, toAudio: to12, atAudio: at12, atPic: [atPic12, atPic12_2, atPic12_3, atPic12_4], squareAtPic: [sAtPic12, sAtPic12_2, sAtPic12_3, sAtPic12_4] },
  { turns: loc13, title: 'The Loantaka School Marker', address: '245 Loantaka Way, Madison', time: 10, toAudio: to13, atAudio: null, atPic: [atPic13, atPic13_2], squareAtPic: [sAtPic13, sAtPic13_2] },
  { turns: loc14, title: 'The Boisaubin House Marker', address: '65 Treadwell Ave, Madison', time: 5, toAudio: to14, atAudio: at14, atPic: [atPic14, atPic14_2], squareAtPic: [sAtPic14, sAtPic14_2] },
];

module.exports = Locations;
