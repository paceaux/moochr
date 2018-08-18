const axios = require('axios');

export default {
    login({ commit }, user) {
        axios.post('/api/v1/login', user)
            .then(res => {
                console.log('login', res);
                if (res.status === 201) {
                    commit('LOGIN', res.body);
                }
            })
            .catch(err => {
                console.log(err);
            });
    },
    register({ commit }, user) {
        axios.post('/api/v1/register', user)
            .then(res => {
                console.log('register', res);
                if (res.status === 201) {
                    commit('LOGIN', res.body);
                }
            })
            .catch(err => {
                console.log(err);
            });
    },
};
