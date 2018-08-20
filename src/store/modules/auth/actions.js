const axios = require('axios');
const jwtDecode = require('jwt-decode');

export default {
    login({ commit }, user) {
        axios.post('/api/v1/login', user)
            .then(res => {
                if (res.status === 201) {
                    commit('LOGIN', res.data);
                    commit('UPDATETOKEN', res.data.token);
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
                    commit('UPDATETOKEN', res.data.token);
                }
            })
            .catch(err => {
                console.log(err);
            });
    },
    // borrowed from: https://hackernoon.com/jwt-authentication-in-vue-js-and-django-rest-framework-part-2-788f0ad53ad5
    inspectToken() {
        const token = this.state.jwt;
        if (token) {
            const decoded = jwtDecode(token);
            const { exp, orig_iat } = decoded;
            const nowInSecs = Date.now() / 1000;
            const isExpiringIn30Min = (exp - nowInSecs) < 1800;

            if (isExpiringIn30Min && nowInSecs - orig_iat < 628200) {
                // add something to auto-refresh?
            } else if (isExpiringIn30Min) {
            // DO NOTHING, DO NOT REFRESH
            } else {
            // PROMPT USER TO RE-LOGIN, THIS ELSE CLAUSE COVERS THE CONDITION WHERE A TOKEN IS EXPIRED AS WELL
            }
        }
    },
};
