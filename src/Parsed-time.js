class ParsedTime {
  constructor(time) {
    if (time !== undefined && time !== null) {
      const regexp = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/g;
      const matches = time.matchAll(regexp);
      if (matches) {
        const parts = [...matches];

        if (Array.isArray(parts) && parts.length) {
          [[this._timeString, this._hours, this._minutes, this._seconds]] = parts;
        } else {
          throw Error('Invalid input');
        }
      } else {
        throw Error('Invalid input');
      }
    } else {
      throw Error('Invalid input');
    }
  }

  seconds = () => this._seconds;

  minutes = () => this._minutes;

  hours = () => this._hours;
}

module.exports.ParsedTime = ParsedTime;
