const each = require('jest-each').default;
const { ParsedTime } = require('../src/Parsed-time');

describe('The input time is validated to clean it from wrong values.', () => {
  each([[null], [undefined], [''], ['asda'], ['24:61:78']]).it(
    'Expect an exception when the input is: %s',
    (text) => {
      expect(() => {
        new ParsedTime(text);
      }).toThrow('Invalid input');
    }
  );
});
