## Refactor
✅ - test for highlighting even & odds in the second blinker - check the - line5
✅ - improve the extraction from the Berlin Clock string to understand what we're looking into the test.
✅ - minutes lights: 2 extracts functions for the minutes, apply the second test pattern
   ✅ --> 1. update the describe 
   ✅ --> 2. reduce the number of duplicated functions
✅ - hours: refactor to the minute test pattern; add 2 first row test 05:00:00, 20:00:00; update the describes;
✅ - remove the duplication in expect*Row functions
✅ - seconds: check if the second is described as the top light
✅ - E2E: description
✅ - the code is messy and too function-oriented. 
 ✅ ---> restart from render5Minutes refactor.
 ✅: restart the refactor rendering the components like: seconds, hours, minutes
      ✅ - extract the render color method as return into the minutes
      ✅ - RESTART & deep REFACTOR:
        ❓--> ❌ - cluster hours in **one** render method
        ❓--> ❌ - cluster minutes in **one** render method
        ✅ - refactor seconds to call it properly as the domain

✅ - sec & hours tests have to be enhanced with the DDD desc.
✅ - top and second rows are shuffled into the tests
✅ - try to create a BerlinClock class that take care to render ✅ sec, ✅ hours, ✅ mins starting from sec.
  
- ParsedTime 
  ✅ - remove duplication in methods (splitting)
  ✅ - extract it into a time class with the regexp validator as a splitter
  ✅ the exception branch is uncovered. line 20. 
        🧪 experiment: is possible to exclude lines from the jest coverage with:
        --> /* istanbul ignore else */
        --> /* istanbul ignore next */
  ✅ - DRY refactor and description to improve
  ✅ - Improve the tests with parametrize suite.

 - Clock
  - move BerlinClock to own file
  ❓- extract every row in a specific class
  TODO: continue the seconds module appraoch to hours and minutes
        . Target: preserve the domain and then polish the code for DRY and SOLID smells.
        . uncoverege to fix!
  ❓- the clock is a Matryoshka composition of seconds, hours, minutes and every component is itself a row. 
- Install Linter into the project
  - 


## Refactoring of the test suites in a more DDD compliant language:
✅. The "Berlin Clock" is the first public clock in the world that tells the time by means of illuminated, colored fields, for which it entered the Guinness Book of Records upon its installation on 17 June 1975.
✅. The clock is read from the top row to the bottom. 
✅. The top row of four red fields denote five full hours each, alongside the second row, also of four red fields, which denote one full hour each, displaying the hour value in 24-hour format.
✅. The third row consists of eleven yellow-and-red fields, which denote five full minutes each (the red ones also denoting 15, 30 and 45 minutes past), and the bottom row has another four yellow fields, which mark one full minute each. 
✅. The round yellow light on top blinks to denote even- (when lit) or odd-numbered (when unlit) seconds.



????? Dilemmas @ the end
- at the end try to understand if is possible to extract the algorithm of switching ON the lights in a common method.
  ? minutes and hours have different colors.
- seems emerging the possibility to extract as global const the numbers of lights into a row. Try to see at the end...

## BugFix
✅ - minutes is in the hour section


## TODO:
✅ - 5 and 15 minutes: scenario
✅ -- 5 - 10 minutes Yellow (20 25 + 35 40 + 50 55)
✅ -- 15 minutes Red (30 + 45)
✅ - hours
✅ - 5 hours
✅ - Random time ("22:32:45") === "O\nRRRR\nRROO\nYYRYYROOOOO\nYYOO"

## NOTES:
✅ - the VSCode line wrap on paste is a pain in the ass DISABLE IT! --> "editor.formatOnPaste": false
✅ - the VSCode lens is expandind the code making it unreadable!    --> "editor.codeLens": false

