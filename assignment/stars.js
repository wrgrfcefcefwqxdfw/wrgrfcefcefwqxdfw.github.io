// setting the canvas
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
let w;
let h;
const setcanvasExtents = () => {
  w = document.body.clientWidth;
  h = document.body.clientHeight;
  canvas.width = w;
  canvas.height = h;
};

setcanvasExtents();
window.onresize = () => {
  setcanvasExtents();
};

// setting stars in x,y,z coordinates
// placing stars in random spots
const makeStars = (count) => {
  const out = [];
  for (let i = 0; i < count; i++) {
    const s = {
      // -800 to 800 x values, -450 to 450 for y value, 0 to 900 for z values
      x: Math.random() * 1600 - 800,
      y: Math.random() * 900 - 450,
      z: Math.random() * 900
    };
    out.push(s);
  }
  return out;
};
let stars = makeStars(10000);

// making the background
const clear = () => {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
};

//drawing the stars which are tiny rectangles
// brightness value is between 0 and 1
const putPixel = (x, y, brightness) => {
  const intensity = brightness * 255;
  const rgb = "rgb(" + intensity + "," + intensity + "," + intensity + ")";
  c.fillStyle = rgb;
  c.fillRect(x, y, 3, 3);
};

// moving the stars
const moveStars = distance => {
  const count = stars.length;
  for (var i = 0; i < count; i++) {
    const s = stars[i];
    // decrease the z coordinates
    s.z -= distance;
    while (s.z <= 1) {
      // send the stare back to come back again
      s.z += 1000;
    }
  }
};
//control the speed of animation
let prevTime;
const init = time => {
  prevTime = time;
  // requestAnimationFrame method tells the browser that you wish to
  // perform an animation and requests that the browser calls
  // a specified function to update an animation before
  // the next repaint.
  requestAnimationFrame(tick);
};
// tick determines the time passed passed since last refresh and calls all functions
// requests to be called on next screen refresh
const tick = time => {
  let elapsed = time - prevTime;
  prevTime = time;
  moveStars(elapsed * 0.7);
  clear();
  const cx = w / 2;
  const cy = h / 2;
  const count = stars.length;
  for (var i = 0; i < count; i++) {
    const star = stars[i];
    // star further from us has coordinates of 0,0,0 since it is the center
    // hence for star to be close to vanishing point, you divide by z
    // higher the z, closer to zero
    const x = cx + star.x / (star.z * 0.001);
    const y = cy + star.y / (star.z * 0.001);
    // if star fall out of visible area
    if (x < 0 || x >= w || y < 0 || y >= h) {
      continue;
    }
    // stars closer to us are brighter and furthur are dimmer
    // since z max value is 1000, we can change the brightness by divding by 1000
    // limit z=1000, d=1, z=0,d=0
    const d = star.z / 1000.0;
    // but since 1 is the most bright, we need to invert the value
    const b = 1 - (d * d);
    putPixel(x, y, b);
  }
  requestAnimationFrame(tick);
};
requestAnimationFrame(init);
