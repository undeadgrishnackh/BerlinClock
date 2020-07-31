let {
  berlinClock
} = require('../src/sandbox');

const berlinClockRow = (berlinClockString, rowIndex) => berlinClockString.split("\n")[rowIndex];
const expectRow = (berlinClockString, rowIndex, expectedRow) => expect(berlinClockRow(berlinClockString, rowIndex)).toEqual(expectedRow);

describe("The 'Berlin Clock' is the first public clock in the world that tells the time by means of illuminated, colored fields,"
  + "for which it entered the Guinness Book of Records upon its installation on 17 June 1975.", () => {

  describe("The round yellow light on top blinks on seconds", () => {
    const secondsLigth = (berlinClockString) => berlinClockRow(berlinClockString, 0);

    it("Expect lit (ON) at EVEN seconds time.", () => {
      expect(secondsLigth(berlinClock("00:00:00"))).toEqual("Y");
    });

    it("Expect unlit (OFF) at ODD seconds time.", () => {
      expect(secondsLigth(berlinClock("00:00:01"))).toEqual("O");
    });
  });

  describe("The top and second rows displaying the hour value in 24-hour format.", () => {
    describe("The top row of four red fields denotes five full hours each.", () => {
      it("Expect the top row to be ROOO at 05:00:00", () => {
        expectTopRow(berlinClock("05:00:00"), "ROOO");
      });
      it("Expect the top row to be RRRR at 20:00:00", () => {
        expectTopRow(berlinClock("20:00:00"), "RRRR");
      });
      it("Expect the top row to be RRRR and the second row to be RRRO at 23:00:00", () => {
        expectHoursLight(berlinClock("23:00:00"), 'RRRR', 'RRRO');
      });
    });

    describe("The second row of four red fields denotes one full hour each.", () => {
      it("Expect the second row to be ROOO at 01:00:00", () => {
        expectSecondRow(berlinClock("01:00:00"), "ROOO");
      });
      it("Expect the second row to be RRRR at 04:00:00", () => {
        expectSecondRow(berlinClock("04:00:00"), "RRRR");
      });
    });

    function expectHoursLight(berlinClockString, expectedTopRow, expectedSecondRow) {
      expectTopRow(berlinClockString, expectedTopRow);
      expectSecondRow(berlinClockString, expectedSecondRow);
    }

    const expectTopRow = (berlinClockString, expectedLights) => expectRow(berlinClockString, 1, expectedLights);
    const expectSecondRow = (berlinClockString, expectedLights) => expectRow(berlinClockString, 2, expectedLights);
  })

  describe("The third and bottom rows displaying the minutes value.", () => {
    describe("The third row consists of eleven yellow-and-red fields, which denote five full minutes each (the red ones also denoting 15, 30 and 45 minutes past)", () => {
      it("Expect the third row to be YOOOOOOOOOO at 00:05:00", () => {
        expectThirdRow(berlinClock("00:05:00"), "YOOOOOOOOOO");
      });

      it("Expect the third row to be YYRYYRYYRYY at 00:55:00", () => {
        expectThirdRow(berlinClock("00:55:00"), "YYRYYRYYRYY");
      })
    });

    describe("The bottom row has another four yellow fields, which mark one full minute each.", () => {
      it("Expect the bottom row to be YOOO at 00:01:00", () => {
        expectBottomRow(berlinClock("00:01:00"), "YOOO");
      });

      it("Expect the bottom row to be YYYY at 00:04:00", () => {
        expectBottomRow(berlinClock("00:04:00"), "YYYY");
      });
    });

    it("Expect the third row to be YYRYYRYYRYO and the bottom row to be YYOO at 00:52:00", () => {
      expectMinutesLights(berlinClock("00:52:00"), "YYRYYRYYRYO", "YYOO");
    });

    function expectMinutesLights(berlinClockString, expectedThirdRow, expectedBottomRow) {
      expectBottomRow(berlinClockString, expectedBottomRow);
      expectThirdRow(berlinClockString, expectedThirdRow);
    }

    const expectBottomRow = (berlinClockString, expectedLights) => expectRow(berlinClockString, 4, expectedLights);
    const expectThirdRow = (berlinClockString, expectedLights) => expectRow(berlinClockString, 3, expectedLights);
  })


  describe("Guardian and edge cases to clean the input time", () => {
    it("Expect error on undefined", () => {
      expect(berlinClock(undefined)).toEqual("error");
    });
    it("Expect error on empty string", () => {
      expect(berlinClock("")).toEqual("error");
    });
    it("Clock FORMAT shoud be like 'hh:mm:ss', otherwise raises an error", () => {
      expect(berlinClock("asda")).toEqual("error");
    });
    it("Clock TIME range shoud be between '00:00:00' and '23:59:59', otherwise raises an error", () => {
      expect(berlinClock("24:61:78")).toEqual("error");
    });
  });

  describe("E2E - Berlin clock lights as observed by someone on the square", () => {
    it("Expect the clock is displaying top-down: O, RRRR, RROO, YYRYYROOOOO and YYOO at 22:32:45", () => {
      expect(berlinClock("22:32:45")).toEqual("O\nRRRR\nRROO\nYYRYYROOOOO\nYYOO");
    });
  });

});