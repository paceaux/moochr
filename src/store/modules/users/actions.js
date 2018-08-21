import axios from '../../../helpers/authhelper';

const apiGetUser = '/user';
const apiGetUsers = '/users';

export default {
    addUser({ commit }, user) {
        axios.post(apiGetUser, user)
            .then(res => {
                if (res.status === 200) {
                    commit('ADDUSER', res.data);
                }
            })
            .catch(err => {
                console.warn(err);
            });
    },
    updateUser({ commit }, user) {
        axios.put(`${apiGetUser}/${user.id}`, user)
            .then(res => {
                if (res.status === 200) {
                    console.info(res);
                    commit('UPDATEUSER', user);
                }
            })
            .catch(err => {
                console.warn(err);
            });
    },
    deleteUser({ commit }, userId) {
        axios.delete(`${apiGetUser}/${userId}`)
            .then(res => {
                if (res.status === 200) {
                    const userIndex = this.getters.userIndexById(userId);
                    commit('DELETEUSER', userIndex);
                }
            })
            .catch(err => {
                console.warn(err);
            });
    },
    requestUsers({ commit }) {
        axios.get(apiGetUsers)
            .then(res => {
                res.data.forEach(user => {
                    commit('ADDUSER', user);
                });
            })
            .catch(err => {
                console.warn(err);
            });
    },
};
