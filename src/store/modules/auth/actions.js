const axios = require('axios');

export default {
    login({ commit }, user) {
        axios.post('/api/v1/login', user)
            .then(res => {
                if (res.status === 201) {
                    commit('LOGIN', res.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    },
    register({ commit }, user) {
        axios.post('/api/v1/register', user)
            .then(res => {
                if (res.status === 201) {
                    commit('LOGIN', res.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    },
};
