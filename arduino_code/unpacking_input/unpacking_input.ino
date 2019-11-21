#include <SoftwareSerial.h>
#include <ctype.h>

int temperature = -1; //desired temperature for coffee
int servo_turns = -1; //number of turns for servo
int time_sol = -1; //how long the solenoid valve should be open for water

//constants
//amount of time to open solenoid valve
const int TIME_8 = 1;
const int TIME_10 = 2;
const int TIME_12 = 3;

//number of turns for servo
const int SERVO_3 = 3;
const int SERVO_4 = 4;
const int SERVO_5 = 5;

void setup() {
  // put your setup code here, to run once:

}

void loop() {
  if(Serial.available() > 0){
    char data = Serial.read();
    switch (tolower(data))
    {
      case 'a':
        temperature = 92;
        time_sol = TIME_8;
        servo_turns = SERVO_3;
        break;
      case 'b':
        temperature = 92;
        time_sol = TIME_10;
        servo_turns = SERVO_4;
        break;
      case 'c':
        temperature = 92;
        time_sol = TIME_12;
        servo_turns = SERVO_5;
        break;
      case 'd':
        temperature = 93;
        time_sol = TIME_8;
        servo_turns = SERVO_3;
        break;
      case 'e':
        temperature = 93;
        time_sol = TIME_10;
        servo_turns = SERVO_4;
        break;
      case 'f':
        temperature = 93;
        time_sol = TIME_12;
        servo_turns = SERVO_5;
        break;
      case 'g':
        temperature = 94;
        time_sol = TIME_8;
        servo_turns = SERVO_3;
        break;
      case 'h':
        temperature = 94;
        time_sol = TIME_10;
        servo_turns = SERVO_4;
        break;
      case 'i':
        temperature = 94;
        time_sol = TIME_12;
        servo_turns = SERVO_5;
        break;
      case 'j':
        temperature = 95;
        time_sol = TIME_8;
        servo_turns = SERVO_3;
        break;
      case 'k':
        temperature = 95;
        time_sol = TIME_10;
        servo_turns = SERVO_4;
        break;
      case 'l':
        temperature = 95;
        time_sol = TIME_12;
        servo_turns = SERVO_5;
        break;
      case 'm':
        temperature = 96;
        time_sol = TIME_8;
        servo_turns = SERVO_3;
        break;
      case 'n':
        temperature = 96;
        time_sol = TIME_10;
        servo_turns = SERVO_4;
        break;
      case 'o':
        temperature = 96;
        time_sol = TIME_12;
        servo_turns = SERVO_5;
        break;
    }
    if (isupper(data))
      servo_turns ++; //requested strong coffee
  
    /* Janice put your code here */

    /* Isha put your code here*/
   }
}
  
