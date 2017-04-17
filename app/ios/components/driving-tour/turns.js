



// var stages = [ {loc1}, {loc2}, {loc3}, {loc4}, {loc5}, {loc6}, {loc7}, {loc8},
//   {loc9}, {loc10}, {loc11}, {loc12}, {loc13}];


const pic1 = require('../../images/Flower.jpg');
const pic2 = require('../../images/Eagle.jpg');
const pic3 = require('../../images/FlagWaving.jpg');
const pic4 = require('../../images/boy-scout-emblem.jpg');

const a1 = require('../../images/A1.jpg');
//const a2 = require('../../images/A2.jpg');
const a3 = require('../../images/A3.jpg');

const b1 = require('../../images/B1.jpg');
const b2 = require('../../images/B2.jpg');

const d1 = require('../../images/D1.jpg');
const d2 = require('../../images/D2.jpg');
const d3 = require('../../images/D3.jpg');

const e1 = require('../../images/E1.jpg');
const e2 = require('../../images/E2.jpg');
const e3 = require('../../images/E3.jpg');

const f1 = require('../../images/F1.jpg');
const f2 = require('../../images/F2.jpg');
const f3 = require('../../images/F3.jpg');

const g1 = require('../../images/G1.jpg');
const g2 = require('../../images/G2.jpg');
const g3 = require('../../images/G3.jpg');
const g4 = require('../../images/G4.jpg');
const g5 = require('../../images/G5.jpg');

const h1 = require('../../images/H1.jpg');
const h2 = require('../../images/H2.jpg');

const i1 = require('../../images/I1.jpg');
const i2 = require('../../images/I2.jpg');

const j1 = require('../../images/J1.jpg');
const j2 = require('../../images/J2.jpg');
const j3 = require('../../images/J3.jpg');

const k1 = require('../../images/K1.jpg');
const k2 = require('../../images/K2.jpg');

const l1 = require('../../images/L1.jpg');
const l2 = require('../../images/L2.jpg');

const m1 = require('../../images/M1.jpg');
const m2 = require('../../images/M2.jpg');
const m3 = require('../../images/M3.jpg');
const m4 = require('../../images/M4.jpg');

const n1 = require('../../images/N1.jpg');
const n2 = require('../../images/N2.jpg');

const o1 = require('../../images/O1.jpg');
const o2 = require('../../images/O2.jpg');
const o3 = require('../../images/O3.jpg');


//THE JOHNSON HOUSE
const loc1 = [
  {
    direction: 'Turn left out of the Schoolhouse parking lot onto Fairmount Ave',
    picture: a1,
    latitude: null,
    longitude: null,
    radius: 200,
  },
  {
    direction: 'Travel straight 2.03 miles past the Fairmount Country Store Deli',
    picture: pic1,
    latitude: 40.705910,
    longitude: -74.429376,
    radius: 200,
  },
  {
    direction: 'Follow past the Marker and Turn left and park in Esternay Field. You may walk back up Fairmount to the marker.',
    picture: a3,
    latitude: 40.703046,
    longitude:  -74.428045,
    radius: 200,
  },

];


//ISAAC CLARK FARMSTEAD
const loc2 = [
 {
   direction: 'Turn around and make a left out of Esternay Field. Shortly after take a right onto River Road and follow for .6 miles',
   picture: b1,
   latitude: null,
   longitude: null,
   radius: 200,
 },
 {
   direction: 'Turn left and park in the Passaic River County Park entrance. The marker is located to your left across River Road (if you reach Mountain Ave youve gone too far)',
   picture: b2,
   latitude: 40.697932,
   longitude: -74.433610,
   radius: 200,
   //alt: 40.697827, -74.434586
 },
];


//BEY'S BOXING CAMP
const loc3 = [
 {
   direction: 'Turn around in the Passaic River County Park entrance and turn right back onto River Road (northeast)',
   picture: d1,
   latitude: null,
   longitude: null,
   radius: 200,
 },
 {
   direction: 'Follow River Road for 1.30 miles (the marker is 0.7 miles past Fairmount Ave)',
   picture: d2,
   latitude: 0,
   longitude: 0,
   radius: 200,
 },
 {
   direction: 'Park along River Road to right in the gravel outcrop',
   picture: d3,
   latitude: 0,
   longitude: 0,
   radius: 200,
 },
];


//PRINCE BALDWIN HOUSE
const loc4 = [
  {
    direction: 'Continue Travelling Northeast on River Road and make a left to continue on River Road',
    picture: e1,
    latitude: null,
    longitude: null,
    radius: 200,
  },
  {
    direction: 'Turn Left onto Southern Blvd and travel up "Snake Hill"',
    picture: e2,
    latitude: 0,
    longitude: 0,
    radius: 200,
  },
  {
    direction: 'Continue Strait along Southern Blvb just past the intersection of Fairmount Ave until you reach the marker. You may park in the gravel driveway to the right or along Southern Boulevard',
    picture: e3,
    latitude: 0,
    longitude: 0,
    radius: 200,
  },
];



// CHATHAM COLONY ASSOCIATION
const loc5 = [
  {
    direction: 'Continue traveling along Southern Blvd and take the 3rd right onto Lafayette Ave. (0.4 miles)',
    picture: f1,
    latitude: null,
    longitude: null,
    radius: 200,
  },
  {
    direction: 'Take the first left onto Spring St (approx 0.2 miles)',
    picture: f2,
    latitude: 40.729022,
    longitude: -74.407241,
    radius: 200,
  },
  {
    direction: 'Continue until you see the marker. You may park along the right side of Spring Street',
    picture: f3,
    latitude: 40.730427,
    longitude: -74.408672,
    radius: 200,
  },
];


//LEWIS NOE FARMSTEAD
const loc6 = [
  {
    direction: 'Drive 0.2 miles and take the first right onto School Ave (If you reach Dale Drive you have gone too far)',
    picture: g1,
    latitude: null,
    longitude: null,
    radius: 200,
  },
  {
    direction: 'Drive to the end of School Ave and turn right onto Maple St',
    picture: g2,
    latitude: 40.732468,
    longitude: -74.406383,
    radius: 200,
  },
  {
    direction: 'Take another right onto Lafayette Ave and drive 0.4 miles',
    picture: g3,
    latitude: 40.730598,
    longitude: -74.404530,
    radius: 200,
  },
  {
    direction: 'Turn right onto Southern Blvd (0.2 miles)',
    picture: g4,
    latitude: 40.727553,
    longitude: -74.409742,
    radius: 200,
  },
  {
    direction: '184 Southern Blvd and the marker are on the right (If you reached Jay Road you have gone too far). Park in Southern Boulevard School to right just past the marker',
    picture: g5,
    latitude: 40.729606,
    longitude: -74.413354,
    radius: 200,
  },
];



//NOE POND
const loc7 = [
  {
    direction: 'Turn left onto Southern Blvd towards Jay Road for approx 0.8 miles',
    picture: h1,
    latitude: null,
    longitude: null,
    radius: 200,
  },
  {
    direction: 'Turn left and park in 395 Southern Blvd (Noe Pond Club) (If you reach Hickory Pl you have gone too far). The marker is 100 ft before the entrance of Noe pond, you may walk to the marker',
    picture: h2,
    latitude: 40.737275,
    longitude: -74.425151,
    radius: 200,
  },
];


//GREENHOUSE INDUSTRY
const loc8 = [
  {
    direction: 'Turn left out of Noe Pond and Continue along Southern Blvd',
    picture: i1,
    latitude: null,
    longitude: null,
    radius: 200,
  },
  {
    direction: '405 Southern Blvd is on the left. You marker may turn into and park in Nash Field (approx 0.14 mile)',
    picture: i2,
    latitude: 40.741458,
    longitude: -74.430853,
    radius: 200,
  },
];


//ELIAS BOUDINOT HOUSE
const loc9 = [
  {
    direction: 'Continue along Southern Blvd (northwest) to Hickory Place (0.4 miles) and take a left onto Hickory Pl (if you reach Shunpike Road you have gone too far)',
    picture: j1,
    latitude: null,
    longitude: null,
    radius: 200,
  },
  {
    direction: 'Turn left onto Green Village Road and drive about 0.8 miles',
    picture: j2,
    latitude: 40.744404,
    longitude: -74.434543,
    radius: 200,
  },
  {
    direction: 'The destination is on the left at 461 Green Village Road. You may park in the driveway to the left',
    picture: j3,
    latitude: 40.738745,
    longitude: -74.446597,
    radius: 200,
  },
];


//COCKREM FARM
const loc10 = [
  {
    direction: 'Turn left back onto Green Village Road going west for approx 0.2 miles to 486 Green Village Road on the right',
    picture: k1,
    latitude: null,
    longitude: null,
    radius: 200,
  },
  {
    direction: 'You may park along white fence to the right',
    picture: k2,
    latitude: 40.738841,
    longitude: -74.449521,
    radius: 200,
  },
];


//GREEN VILLAGE
const loc11 = [
  {
    direction: 'Proceed along Green Village Road (west) toward Fawcett Lane for approx 0.9 miles',
    picture: l1,
    latitude: null,
    longitude: null,
    radius: 200,
  },
  {
    direction: 'Stop at 520 Green Village Road and park in the Green Village Deli to the right',
    picture: l2,
    latitude: 40.739029,
    longitude: -74.453421,
    radius: 200,
  },
];


//GIBBONS HORSE BARN
const loc12 = [
  {
    direction: 'Proceed right along Green Village Road (toward Meyersville Road) for approx 0.3 miles and keep right to go onto Spring Valley Road',
    picture: m1,
    latitude: null,
    longitude: null,
    radius: 200,
  },
  {
    direction: 'Take the first right to stay on Spring Valley Road (0.9 miles)',
    picture: m2,
    latitude: 40.740854,
    longitude: -74.456702,
    radius: 200,
  },
  {
    direction: 'Take the next right and follow Loantaka Way for 0.5 miles until you see the marron marker',
    picture: m3,
    latitude: 40.753155,
    longitude: -74.452436,
    radius: 200,
  },
  {
    direction: 'The destination is on the left at 340 Loantaka Way. You may park in gravel driveway to the right',
    picture: m4,
    latitude: 40.752534,
    longitude: -74.446877,
    radius: 200,
  },
];


//LOANTAKA SCHOOL
const loc13 = [
  {
    direction: 'Proceed right, along Loantaka Way (east for 0.1 miles) and the destination is on the left (a grey/white hosue)',
    picture: n1,
    latitude: null,
    longitude: null,
    radius: 200,
  },
  {
    direction: 'You may park along the wooden fence to the right',
    picture: n2,
    latitude: 40.753724,
    longitude: -74.440480,
    radius: 200,
  },
];


//BOISAUBIN HOUSE
const loc14 = [
  {
    direction: 'Continue strait along Loantaka Way towards Shunpike Road and turn left onto Woodland Road (Woodland Road becomes Woodland Ave)',
    picture: o1,
    latitude: null,
    longitude: null,
    radius: 200,
  },
  {
    direction: 'Turn right onto Treadwell Ave (If you reach Nordling Lane you have gone too far)',
    picture: o2,
    latitude: 40.765623,
    longitude: -74.445828,
    radius: 200,
  },
  {
    direction: 'Park along fence to the left or right once you see the marker on the left',
    picture: o3,
    latitude: 40.768086,
    longitude: -74.442928,
    radius: 200,
  },
];


class Turns {

  static stages = [

    {loc: loc1, title: 'The Johnson House Marker', toAudion: null, atAudio: null},
    {loc: loc2, title: 'The Isaac Clark Farmstead Marker', toAudion: null, atAudio: null},
    {loc: loc3, title: 'The Bey’s Boxing Camp Marker', toAudion: null, atAudio: null},
    {loc: loc4, title: 'The Price-Baldwin House Marker', toAudion: null, atAudio: null},
    {loc: loc5, title: 'The Chatham Colony Association Marker', toAudion: null, atAudio: null},
    {loc: loc6, title: 'The Lewis Noe Farmstead Marker', toAudion: null, atAudio: null},
    {loc: loc7, title: 'The Noe Pond Marker', toAudion: null, atAudio: null},
    {loc: loc8, title: 'The Greenhouse Industry Marker', toAudion: null, atAudio: null},
    {loc: loc9, title: 'The Elias Boudinot House Marker', toAudion: null, atAudio: null},
    {loc: loc10, title: 'The Cockrem Farm Marker', toAudion: null, atAudio: null},
    {loc: loc11, title: 'The Green Village Marker', toAudion: null, atAudio: null},
    {loc: loc12, title: 'The Gibbons Horse Barn Marker', toAudion: null, atAudio: null},
    {loc: loc13, title: 'The Loantaka School – Spring Valley School Marker', toAudion: null, atAudio: null},
    {loc: loc14, title: 'The Boisaubin House Marker', toAudion: null, atAudio: null},

  ];

  static stage = 0;
  static turn = 0;

}
module.exports = Turns;
