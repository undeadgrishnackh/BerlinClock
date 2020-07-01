## Refactor
✅ - test for highlighting even & odds in second blinker - check the - line5
✅ - improve the extraction from the Berlin Clock string to understand what we're looking into the test.
✅ - minutes lights: 2 extracts functions for the minutes, apply the seconds test pattern
   --> 1. update the desribe. 2. reduce the number of duplicated functions
✅ - hours: refactor to the minutes test pattern; add 2 first row test 05:00:00, 20:00:00; update the describes;
✅ - remove the duplication in expect*Row functions
TODO: - seconds: chech if second is described as the top light
TODO: - E2E: 
TODO: - the code is messy and too function oriented


## BugFix
✅ - minutes is in the hours section


## TODO:
- 5 and 15 minutes: scenario
✅ -- 5 - 10 minutes Yellow (20 25 + 35 40 + 50 55)
✅ -- 15 minutes Red (30 + 45)
✅ - hours
✅ - 5 hours
✅ - Random time ("22:32:45") === "O\nRRRR\nRROO\nYYRYYROOOOO\nYYOO"

## NOTES:
✅ - the VSCode line wrap on paste is a pain in the ass DISABLE IT! --> "editor.formatOnPaste": false
✅ - the VSCode lens is expandind the code making it unreadable!    --> "editor.codeLens": false

