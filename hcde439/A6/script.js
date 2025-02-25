const BAUD_RATE = 9600; //Baud Rate for serial communication (matches arduino)
let port, connectBtn; // serial port and connection button
let joystickX = 512, joystickY = 512; // initalize the joystick in centered position
let joyButton = 1, button = 1; // button state, 1 means it's not pressed
let bgColor = 230; // The default button that is light gray

function setup() {
  setupSerial(); // initialize the serial connecction
  createCanvas(720, 400); // a 720 x 400 pixel canvas
  noStroke(); // no outline strokes for the shape
  rectMode(CENTER); // makes the rectangles be drawn from thier center
}

function draw() {
  const portIsOpen = checkPort(); // checks if the serial port is open
  if (!portIsOpen) return; // If the port is not open it exits 

  let str = port.readUntil("\n"); //read new serial data 
  if (str.length == 0) return; // no data means exits
 
  let values = str.trim().split(","); // Gets rid of whitespace and split strings by commas
  if (values.length === 4) { // 4 values
    joystickX = Number(values[0]); //converts first value to a number for x-axis
    joystickY = Number(values[1]); // converts sec value to number for y-axis
    joyButton = Number(values[2]); // convert the third value to a number for the joystick
    button = Number(values[3]); // converts the fourth value to number for the button
  }

  // Change background color when the button is pressed
  bgColor = button === 0 ? color(100, 150, 255) : 230; // Blue background, when pressed it becomes gray

  background(bgColor); //applies the background color

  // Map joystick values to the canvas size (0-1023)
  let mappedX = map(joystickX, 0, 1023, 0, width);
  let mappedY = map(joystickY, 0, 1023, 0, height);

  fill(244, 122, 158); // fill color for the first rectangle
  rect(mappedX, height / 2, mappedY / 2 + 10, mappedY / 2 + 10); //rectangle based on the joystick position

  fill(237, 34, 93);
  let inverseX = width - mappedX;
  let inverseY = height - mappedY;
  rect(inverseX, height / 2, inverseY / 2 + 10, inverseY / 2 + 10);
}

// Serial connection setup
function setupSerial() {
  port = createSerial();

  let usedPorts = usedSerialPorts(); //list of serial ports
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], BAUD_RATE); //open the available port with the baud rate
  }

  connectBtn = createButton("Connect to Arduino"); //button that connects to arduino
  connectBtn.position(5, 5);
  connectBtn.mouseClicked(onConnectButtonClicked);
}

// Checks if port is open and updates UI 
function checkPort() {
  if (!port.opened()) {
    connectBtn.html("Connect to Arduino"); //update the button
    background("gray"); // set the background to gray
    return false;
  } else {
    connectBtn.html("Disconnect"); // update 
    return true;
  }
}

// Handles connect/disconnect button click
function onConnectButtonClicked() {
  if (!port.opened()) {
    port.open(BAUD_RATE);
  } else {
    port.close();
  }
}

// Send commands based on keyboard input to control LEDs
function keyPressed() {
  if (!port.opened()) return;
  
  if (key === '1') port.write('1'); // LED yellow  on
  if (key === '2') port.write('2'); // LED yellow OFF
  if (key === '3') port.write('3'); // LED green ON
  if (key === '4') port.write('4'); // LED green OFF
  if (key === '5') port.write('5'); // LED red ON
  if (key === '6') port.write('6'); // LED red OFF
}
