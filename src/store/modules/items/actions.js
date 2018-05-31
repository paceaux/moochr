const axios = require('axios');

const apiGetItem = '/api/v1/item';
const apiGetItems = '/api/v1/items';

export default {
    addItem({ commit }, item) {
        axios.post(apiGetItem, item)
            .then(res => {
                if (res.status === 200) {
                    commit('ADDITEM', res.data);
                }
            })
            .catch(err => {
                console.warn(err);
            });
    },
    requestItems({ commit }) {
        axios.get(apiGetItems)
            .then(res => {
                res.data.forEach(item => {
                    commit('ADDITEM', item);
                });
            })
            .catch(err => {
                console.warn(err);
            });
    },
    updateItem({ commit }, item) {
        axios.put(`${apiGetItem}/${item.id}`, item)
            .then(res => {
                if (res.status === 200) {
                    commit('UPDATEITEM', item);
                }
            })
            .catch(err => {
                console.warn(err);
            });
    },
    deleteItem({ commit }, itemId) {
        axios.delete(`${apiGetItem}/${itemId}`)
            .then((res) => {
                if (res.status === 200) {
                    const itemIndex = this.getters.itemIndexById(itemId);
                    commit('DELETEITEM', itemIndex);
                }
            })
            .catch(err => {
                console.warn(err);
            });
    },
}