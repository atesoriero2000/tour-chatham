//35 mph = 15 m/s = 51 fps

const RADIUS_DELAY = 1500; //feet

const pic1 = require('../../../images/Flower.jpg');
const pic2 = require('../../../images/Eagle.jpg');
const pic3 = require('../../../images/FlagWaving.jpg');
const pic4 = require('../../../images/boy-scout-emblem.jpg');

const startPic = pic1;
const a1 = require('../../../images/edited/A1_00000.jpg');
//const a2 = require('../../images/A2.jpg');
const a3 = require('../../../images/edited/A3_00000.jpg');

const b1 = require('../../../images/edited/B1_00000.jpg');
const b2 = require('../../../images/edited/B2_00000.jpg');

const d1 = require('../../../images/edited/D1_00000.jpg');
const d2 = require('../../../images/edited/D2_00000.jpg');
const d3 = require('../../../images/edited/D3_00000.jpg');

const e1 = require('../../../images/edited/E1_00000.jpg');
const e2 = require('../../../images/edited/E2_00000.jpg');
const e3 = require('../../../images/edited/E3_00000.jpg');

const f1 = require('../../../images/edited/F1_00000.jpg');
const f2 = require('../../../images/edited/F2_00000.jpg');
const f3 = require('../../../images/edited/F3_00000.jpg');

const g1 = require('../../../images/edited/G1_00000.jpg');
const g2 = require('../../../images/edited/G2_00000.jpg');
const g3 = require('../../../images/edited/G3_00000.jpg');
const g4 = require('../../../images/edited/G4_00000.jpg');
const g5 = require('../../../images/edited/G5_00000.jpg');

const h1 = require('../../../images/edited/H1_00000.jpg');
const h2 = require('../../../images/edited/H2_00000.jpg');

const i1 = require('../../../images/edited/I1_00000.jpg');
const i2 = require('../../../images/edited/I2_00000.jpg');

const j1 = require('../../../images/edited/J1_00000.jpg');
const j2 = require('../../../images/edited/J2_00000.jpg');
const j3 = require('../../../images/edited/J3_00000.jpg');

const k1 = require('../../../images/edited/K1_00000.jpg');
const k2 = require('../../../images/edited/K2_00000.jpg');

const l1 = require('../../../images/edited/L1_00000.jpg');
const l2 = require('../../../images/edited/L2_00000.jpg');

const m1 = require('../../../images/edited/M1_00000.jpg');
const m2 = require('../../../images/edited/M2_00000.jpg');
const m3 = require('../../../images/edited/M3_00000.jpg');
const m4 = require('../../../images/edited/M4_00000.jpg');

const n1 = require('../../../images/edited/N1_00000.jpg');
const n2 = require('../../../images/edited/N2_00000.jpg');

const o1 = require('../../../images/edited/O1_00000.jpg');
const o2 = require('../../../images/edited/O2_00000.jpg');
const o3 = require('../../../images/edited/O3_00000.jpg');


//THE JOHNSON HOUSE
const loc1 = [
  {
    direction: 'Turn left out of the Schoolhouse parking lot onto Fairmount Ave',
    picture: a1,
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'Travel straight 2.03 miles past the Fairmount Country Store Deli',
    picture: pic1,
    latitude: 40.705910,
    longitude: -74.429376,
    radius: 9244 - RADIUS_DELAY,
  },
  {
    direction: 'Follow past the Marker and Turn left and park in Esternay Field. You may walk back up Fairmount to the marker.',
    picture: a3,
    latitude: 40.703046,
    longitude: -74.428045,
    radius: 1108 - RADIUS_DELAY,
  },
];


//ISAAC CLARK FARMSTEAD
const loc2 = [
 {
   direction: 'Turn around and make a left out of Esternay Field. Shortly after take a right onto River Road and follow for .6 miles',
   picture: b1,
   latitude: null,
   longitude: null,
   radius: 500,
 },
 {
   direction: 'Turn left and park in the Passaic River County Park entrance. The marker is located to your left across River Road (if you reach Mountain Ave youve gone too far)',
   picture: b2,
   latitude: 40.697119,
   longitude: -74.435379,
   radius: 2965 - RADIUS_DELAY,
 },
];


//BEY'S BOXING CAMP
const loc3 = [
 {
   direction: 'Turn around in the Passaic River County Park entrance and turn right back onto River Road (northeast)',
   picture: d1,
   latitude: null,
   longitude: null,
   radius: 500,
 },
 {
   direction: 'Follow River Road for 1.30 miles (the marker is 0.7 miles past Fairmount Ave)',
   picture: d2,
   latitude: 40.702367,
   longitude: -74.427685,
   radius: 2863 - RADIUS_DELAY,
 },
 {
   direction: 'Park along River Road to right in the gravel outcrop',
   picture: d3,
   latitude: 40.708721,
   longitude: -74.416936,
   radius: 3770 - RADIUS_DELAY,
 },
];


//PRINCE BALDWIN HOUSE
const loc4 = [
  {
    direction: 'Continue Travelling Northeast on River Road and make a left to continue on River Road',
    picture: e1,
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'Turn Left onto Southern Blvd and travel up "Snake Hill"',
    picture: e2,
    latitude: 40.720305,
    longitude: -74.401989,
    radius: 5911 - RADIUS_DELAY,
  },
  {
    direction: 'Continue Strait along Southern Blvb just past the intersection of Fairmount Ave until you reach the marker. You may park in the gravel driveway to the right or along Southern Boulevard',
    picture: e3,
    latitude: 40.722827,
    longitude: -74.405053,
    radius: 1251 - RADIUS_DELAY,
  },
];


// CHATHAM COLONY ASSOCIATION
const loc5 = [
  {
    direction: 'Continue traveling along Southern Blvd and take the 3rd right onto Lafayette Ave. (0.4 miles)',
    picture: f1,
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'Take the first left onto Spring St (approx 0.2 miles)',
    picture: f2,
    latitude: 40.729022,
    longitude: -74.407241,
    radius: 2340 - RADIUS_DELAY,
  },
  {
    direction: 'Continue until you see the marker. You may park along the right side of Spring Street',
    picture: f3,
    latitude: 40.730427,
    longitude: -74.408672,
    radius: 648 / 2,
  },
];


//LEWIS NOE FARMSTEAD
const loc6 = [
  {
    direction: 'Drive 0.2 miles and take the first right onto School Ave (If you reach Dale Drive you have gone too far)',
    picture: g1,
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'Drive to the end of School Ave and turn right onto Maple St',
    picture: g2,
    latitude: 40.732468,
    longitude: -74.406383,
    radius: 977 - RADIUS_DELAY,
  },
  {
    direction: 'Take another right onto Lafayette Ave and drive 0.4 miles',
    picture: g3,
    latitude: 40.730598,
    longitude: -74.404530,
    radius: 853 / 2,
  },
  {
    direction: 'Turn right onto Southern Blvd (0.2 miles)',
    picture: g4,
    latitude: 40.727553,
    longitude: -74.409742,
    radius: 1819 - RADIUS_DELAY,
  },
  {
    direction: '184 Southern Blvd and the marker are on the right (If you reached Jay Road you have gone too far). Park in Southern Boulevard School to right just past the marker',
    picture: g5,
    latitude: 40.729440,
    longitude: -74.413286,
    radius: 1198 - RADIUS_DELAY,
  },
];


//NOE POND
const loc7 = [
  {
    direction: 'Turn left onto Southern Blvd towards Jay Road for approx 0.8 miles',
    picture: h1,
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'Turn left and park in 395 Southern Blvd (Noe Pond Club) (If you reach Hickory Pl you have gone too far). The marker is 100 ft before the entrance of Noe pond, you may walk to the marker',
    picture: h2,
    latitude: 40.737275,
    longitude: -74.425151,
    radius: 4351 - RADIUS_DELAY,
  },
];


//GREENHOUSE INDUSTRY
const loc8 = [
  {
    direction: 'Turn left out of Noe Pond and Continue along Southern Blvd',
    picture: i1,
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: '405 Southern Blvd is on the left. You marker may turn into and park in Nash Field (approx 0.14 mile)',
    picture: i2,
    latitude: 40.741458,
    longitude: -74.430853,
    radius: 2194 - RADIUS_DELAY,
  },
];


//ELIAS BOUDINOT HOUSE
const loc9 = [
  {
    direction: 'Continue along Southern Blvd (northwest) and quickly take a left onto Hickory Pl (if you reach Shunpike Road you have gone too far)',
    picture: j1,
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'Turn left onto Green Village Road and drive about 0.8 miles',
    picture: j2,
    latitude: 40.744404,
    longitude: -74.434543,
    radius: 1482 - RADIUS_DELAY,
  },
  {
    direction: 'The destination is on the left at 461 Green Village Road. You may park in the driveway to the left',
    picture: j3,
    latitude: 40.738649,
    longitude: -74.446364,
    radius: 3884 - RADIUS_DELAY,
  },
];


//COCKREM FARM
const loc10 = [
  {
    direction: 'Turn left back onto Green Village Road going west for approx 0.2 miles to 486 Green Village Road on the right',
    picture: k1,
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'You may park along white fence to the right',
    picture: k2,
    latitude: 40.738841,
    longitude: -74.449521,
    radius: 876 / 2,
  },
];


//GREEN VILLAGE
const loc11 = [
  {
    direction: 'Proceed along Green Village Road (west) toward Fawcett Lane for approx 0.9 miles',
    picture: l1,
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'Stop at 520 Green Village Road and park in the Green Village Deli to the right',
    picture: l2,
    latitude: 40.739029,
    longitude: -74.453421,
    radius: 1080 - RADIUS_DELAY,
  },
];


//GIBBONS HORSE BARN
const loc12 = [
  {
    direction: 'Proceed right along Green Village Road (toward Meyersville Road) for approx 0.3 miles and keep right to go onto Spring Valley Road',
    picture: m1,
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'Take the first right to stay on Spring Valley Road (0.9 miles)',
    picture: m2,
    latitude: 40.740854,
    longitude: -74.456702,
    radius: 1125 - RADIUS_DELAY,
  },
  {
    direction: 'Take the next right and follow Loantaka Way for 0.5 miles until you see the marron marker',
    picture: m3,
    latitude: 40.753155,
    longitude: -74.452436,
    radius: 4640 - RADIUS_DELAY,
  },
  {
    direction: 'The destination is on the left at 340 Loantaka Way. You may park in gravel driveway to the right',
    picture: m4,
    latitude: 40.752534,
    longitude: -74.446877,
    radius: 1553 - RADIUS_DELAY,
  },
];


//LOANTAKA SCHOOL
const loc13 = [
  {
    direction: 'Proceed right, along Loantaka Way (east for 0.1 miles) and the destination is on the left (a grey/white hosue)',
    picture: n1,
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'You may park along the wooden fence to the right',
    picture: n2,
    latitude: 40.753724,
    longitude: -74.440480,
    radius: 1820 - RADIUS_DELAY,
  },
];


//BOISAUBIN HOUSE
const loc14 = [
  {
    direction: 'Continue strait along Loantaka Way towards Shunpike Road and turn left onto Woodland Road (Woodland Road becomes Woodland Ave)',
    picture: o1,
    latitude: null,
    longitude: null,
    radius: 500,
  },
  {
    direction: 'Turn right onto Treadwell Ave (If you reach Nordling Lane you have gone too far)',
    picture: o2,
    latitude: 40.765623,
    longitude: -74.445828,
    radius: 4586 - RADIUS_DELAY,
  },
  {
    direction: 'Park along fence to the left or right once you see the marker on the left',
    picture: o3,
    latitude: 40.768086,
    longitude: -74.442928,
    radius: 1204 - RADIUS_DELAY,
  },
];


class Turns {

  static stages = [

  //  {loc: [{directions: 'Welcome to the Chatham ', picture: startPic}], title: 'The Mount Vernon Schoolhouse', atAudio: null, atPic: startPic},

    {loc: loc1, title: 'The Johnson House Marker', toAudio: null, atAudio: null, atPic: null},
    {loc: loc2, title: 'The Isaac Clark Farmstead Marker', toAudio: null, atAudio: null, atPic: null},
    {loc: loc3, title: 'The Bey’s Boxing Camp Marker', toAudio: null, atAudio: null, atPic: null},
    {loc: loc4, title: 'The Price-Baldwin House Marker', toAudio: null, atAudio: null, atPic: null},
    {loc: loc5, title: 'The Chatham Colony Association Marker', toAudio: null, atAudio: null, atPic: null},
    {loc: loc6, title: 'The Lewis Noe Farmstead Marker', toAudio: null, atAudio: null, atPic: null},
    {loc: loc7, title: 'The Noe Pond Marker', toAudio: null, atAudio: null, atPic: null},
    {loc: loc8, title: 'The Greenhouse Industry Marker', toAudio: null, atAudio: null, atPic: null},
    {loc: loc9, title: 'The Elias Boudinot House Marker', toAudio: null, atAudio: null, atPic: null},
    {loc: loc10, title: 'The Cockrem Farm Marker', toAudio: null, atAudio: null, atPic: null},
    {loc: loc11, title: 'The Green Village Marker', toAudio: null, atAudio: null, atPic: null},
    {loc: loc12, title: 'The Gibbons Horse Barn Marker', toAudio: null, atAudio: null, atPic: null},
    {loc: loc13, title: 'The Loantaka School – Spring Valley School Marker', toAudio: null, atAudio: null, atPic: null},
    {loc: loc14, title: 'The Boisaubin House Marker', toAudio: null, atAudio: null, atPic: null},

  ];

  static stage = 0;
  static turn = 0;

}
module.exports = Turns;
