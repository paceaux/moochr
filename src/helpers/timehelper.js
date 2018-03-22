export default {
    daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    monthsOfYear: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    seasonsOfYear: ['Spring', 'Summer', 'Fall', 'Winter'],
    getDayOfWeek(int) {
        return this.daysOfWeek[int];
    },
    getMonthOfYear(int) {
        return this.monthsOfYear[int];
    },
    getSeasonOfYear(int) {
        return this.seasonsOfYear[int];
    },
    getOrdinalDate(int) {
        const intString = int.toString();
        const lastChar = intString[intString.length - 1];
        let suffix = 'th';

        switch (lastChar) {
            case '1':
                if (int === 1 || int == 11)  suffix = 'st';
                break;
            case '2':
                suffix = 'nd';
                break;
            case '3':
                suffix = 'rd';
                break;
            default:
                break;
        }

        return intString + suffix;
    }
};