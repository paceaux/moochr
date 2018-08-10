export default class TimeHelper {
    static get daysOfWeek() {
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    }

    static get monthsOfYear() {
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }

    static get seasonsOfYear() {
        return ['Spring', 'Summer', 'Fall', 'Winter'];
    }
    /**
     * @param  {int} Number. Numeric Value day of the week
     * @returns {string} Corresponding English name of the day
     */

    static getDayOfWeek(int) {
        return this.daysOfWeek[int];
    }
    /**
     * @param  {int} Number. Numeric value of month
     * @returns {string} Corresponding English name of the month
     */

    static getMonthOfYear(int) {
        return this.monthsOfYear[int];
    }

    /**
     * @param  {int} Number. Numeric season
     * @returns {string} Corresponding English name of the season
     */

    static getSeasonOfYear(int) {
        return this.seasonsOfYear[int];
    }

    /**
     * @param  {int} Number. Day of the month
     * @returns {string} Day of the month formatted with ordinal suffixes
     */
    static getOrdinalDate(int) {
        const intString = int.toString();
        const lastChar = intString[intString.length - 1];
        let suffix = 'th';

        switch (lastChar) {
        case '1':
            if (int === 1 || (int !== 11 && intString.length > 1)) suffix = 'st';
            break;
        case '2':
            if (int != 12) suffix = 'nd';
            break;
        case '3':
            suffix = 'rd';
            break;
        default:
            break;
        }

        return intString + suffix;
    }
    /**
     * @param  {String} timestring. UTC formatted time
     * @returns {String} The time in plain English;
     */

    static getTextDate(timestring) {
        const time = new Date(timestring);
        const month = time.getMonth();
        const date = time.getDate();
        const year = time.getFullYear();

        return `The ${this.getOrdinalDate(date)} of ${this.getMonthOfYear(month)}, ${year}`;
    }

    /**
     * @param  {String} timestringA UTC formatted time
     * @param  {String} timestringB UTC formatted time
     * @returns {Object} Difference between two points in time
     */

    static getTimeDiff(timestringA, timestringB) {
        const timeA = new Date(timestringA);
        const timeB = new Date(timestringB);
        const timeDist = Math.abs(timeB.getTime() - timeA.getTime());
        const timeDiff = timeDist / 1000;
        const seconds = timeDiff; // just here for ease of reading
        const hours = timeDiff / 3600; // 60 * 60
        const minutes = timeDiff / 60;
        const days = timeDiff / 86400; // 60 * 60 * 24
        const weeks = timeDiff / (86400 * 7);

        return {
            seconds,
            minutes,
            hours,
            days,
            weeks,
        };
    }

    /**
     * @param  {String} timestringA UTC formatted time
     * @param  {String} timestringB UTC formatted time
     * @returns {String} Difference between two points in time in plain English
     */

    static getTextTimeDiff(timeStringA, timeStringB) {
        const {
            seconds,
            minutes,
            hours,
            days,
            weeks,
        } = this.getTimeDiff(timeStringA, timeStringB);

        let time = seconds;
        let timeUnit = 'seconds';

        if (minutes > 1.5) {
            time = Math.round(minutes * 10) / 10;
            timeUnit = 'minutes';
        }

        if (hours > 1.5) {
            time = Math.round(hours * 10) / 10;
            timeUnit = 'hours';
        }

        if (days > 1.5) {
            time = Math.round(days * 10) / 10;
            timeUnit = 'days';
        }

        if (weeks > 1.5) {
            time = Math.round(weeks * 10) / 10;
            timeUnit = 'weeks';
        }
        return `${time} ${timeUnit} ago`;
    }
}

