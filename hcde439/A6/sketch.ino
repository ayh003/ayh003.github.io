const int joystickX = A1;  // Joystick X-axis
const int joystickY = A0;  // Joystick Y-axis
const int joyButton = 2;   // Joystick Pin 2
const int button = 3;      // Button that controls the background

const int ledYellow = 8;  // Yellow LED
const int ledGreen = 9;  // Green LED
const int ledRed = 10;  // Red LED

void setup() {
  Serial.begin(9600); // initialize serial communication

  pinMode(joyButton, INPUT_PULLUP); // Sets the joystick as input with the internal up resistor
  pinMode(button, INPUT_PULLUP); // Sets the button as input with the internal up resistor

  pinMode(ledYellow, OUTPUT);  // Sets the yellow Led as an output pin
  pinMode(ledGreen, OUTPUT); // Sets the green Led as an output pin
  pinMode(ledRed, OUTPUT); // Sets the Red Led as an output pin
}

void loop() {
  int xValue = analogRead(joystickX); // Reads the x axis position from 0-1023
  int yValue = analogRead(joystickY); // Reads the y axis position from 0-1023
  int joyBtnState = digitalRead(joyButton); // Reads the current state of the joystick (0 if pressed, and 1 if not pressed)
  int buttonState = digitalRead(button); // Reads the state of the button (0 if pressed, and 1 if not pressed)

  Serial.print(xValue); //prints the x axis value
  Serial.print(","); // prints a comma to separate
  Serial.print(yValue); // prints the y axis value
  Serial.print(","); // prints the comma to separate
  Serial.print(joyBtnState); // prints out the joystick state(0 or 1)
  Serial.print(","); // prints out he comma to separate
  Serial.println(buttonState); // End with newline

  if (Serial.available() > 0) { // Checks if the data is available frim the serial port from p5.js
    char command = Serial.read(); // Reads & used to control the LEDs

    if (command == '1') digitalWrite(ledYellow, HIGH); // Turns on the yellow Led
    if (command == '2') digitalWrite(ledYellow, LOW); // Turns off the yellow Led
    if (command == '3') digitalWrite(ledGreen, HIGH); // Turns on the green Led
    if (command == '4') digitalWrite(ledGreen, LOW); // Turns off the green Led
    if (command == '5') digitalWrite(ledRed, HIGH); // Turns on the red Led
    if (command == '6') digitalWrite(ledRed, LOW); // Turns off the red Led
  }

  delay(50); // Slight delay
}