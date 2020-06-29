let { berlinClock } = require('../src/sandbox');

describe ("Guardian and edge cases to clean the input time", () => {
  it ("Expect error on undefined", () => {
    expect(berlinClock(undefined)).toEqual( "error");
  });
  it ("Expect error on empty string", () => {
    expect(berlinClock("")).toEqual( "error");
  });
  it ("Clock FORMAT shoud be like 'hh:mm:ss', otherwise raises an error", () => {
    expect(berlinClock("asda")).toEqual( "error");
  });
  it ("Clock TIME range shoud be between '00:00:00' and '23:59:59', otherwise raises an error", () => {
    expect(berlinClock("24:61:78")).toEqual( "error");
  });
});


describe ("Seconds Light - Higher light bulb. Switched ON by even seconds, OFF by odd seconds", () => {
  function secondsLigth (berlinClockString) {
    return berlinClockString.split("\n")[0]
  }
    
  it ("Seconds light bulb should be ON at EVEN seconds time.", () => {
    expect(secondsLigth(berlinClock("00:00:00"))).toEqual("Y");
  });

  it ("Expect OFF at ODD seconds time.", () => {
    expect(secondsLigth(berlinClock("00:00:01"))).toEqual("O");
  });
});

describe ("Minutes lights - 5 to 55 minutes + 0 to 4 minutes", () => {
  function firstMinuteRow (berlinClockString) {
    return berlinClockString.split("\n")[3]
  }

  function secondMinuteRow (berlinClockString) {
    return berlinClockString.split("\n")[4]
  }

  function expectMinutesLights (berlinClockString, expectedFirstRow, expectedSecondRow) {
    expect(firstMinuteRow(berlinClockString)).toEqual(expectedFirstRow);
    expect(secondMinuteRow(berlinClockString)).toEqual(expectedSecondRow);
  }

    it("Expect the bottom row to be YOOO at 00:01:00", () => {
      expectMinutesLights(berlinClock("00:01:00"),"OOOOOOOOOOO", "YOOO");
    });

    it("Expect the bottom row to be YYYY at 00:04:00", () => {
      expectMinutesLights(berlinClock("00:04:00"),"OOOOOOOOOOO", "YYYY");
    });

    it("Expect at 5 minutes to have on the first light on the 5 minutes row", () => {
      expectMinutesLights(berlinClock("00:05:00"),"YOOOOOOOOOO", "OOOO");
    });

    it("Expect at 15 minutes to have on the 2 Yellow light and 1 Red light on the 5 minutes row", () => {
      expectMinutesLights(berlinClock("00:15:00"),"YYROOOOOOOO", "OOOO");
    });

    it("Expect at 20 minutes to have on the 3 Yellow light and 1 Red light on the 5 minutes row", () => {
      expectMinutesLights(berlinClock("00:20:00"),"YYRYOOOOOOO", "OOOO");
    });

    it("Expect at 30 minutes to have on the 3 Yellow light and 1 Red light on the 5 minutes row", () => {
      expectMinutesLights(berlinClock("00:30:00"),"YYRYYROOOOO", "OOOO");
    });

    it("Expect to have YYRYYRYYRYO as the 3th and YYOO as the bottom row lights at 52 minutes on the clock", () => {
      expectMinutesLights(berlinClock("00:52:00"),"YYRYYRYYRYO", "YYOO");
    });
})

describe ("Hours lights", () => {
  it("Expect 1 hour light is ON at 01:00:00", () => {
    expect(berlinClock("01:00:00")).toEqual("Y\nOOOO\nROOO\nOOOOOOOOOOO\nOOOO");
  });
  it("Expect 4 hour light is ON at 04:00:00", () => {
    expect(berlinClock("04:00:00")).toEqual("Y\nOOOO\nRRRR\nOOOOOOOOOOO\nOOOO");
  });
  it("Expect 4 fivehour lights and 3 hour lights is ON at 23:00:00", () => {
    expect(berlinClock("23:00:00")).toEqual("Y\nRRRR\nRRRO\nOOOOOOOOOOO\nOOOO");
  });
})

describe ("Random time", () => {
  it("Expect the clock is working for random time", () => {
    expect(berlinClock("22:32:45")).toEqual("O\nRRRR\nRROO\nYYRYYROOOOO\nYYOO");
  });  
})

