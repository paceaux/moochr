const currentLocale = 'en-US';
const currency = 'USD';

export default {
    getCurrency(int) {
        return int.toLocaleString(currentLocale, { style: 'currency', currency });
    },
};
