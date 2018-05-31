const axios = require('axios');

const apiGetCategory = '/api/v1/category';
const apiGetCategories = '/api/v1/categories';

export default {
    addCategory({ commit }, category) {
        axios.post(apiGetCategory, category)
            .then(res => {
                if (res.status === 200) {
                    commit('ADDCATEGORY', res.data);
                }
            })
            .catch(err => {
                console.warn('error', err);
            });
    },
    requestCategories({ commit }) {
        axios.get(apiGetCategories)
            .then(res => {
                res.data.forEach(category => {
                    commit('ADDCATEGORY', category);
                });
            })
            .catch(err => {
                console.warn(err);
            });
    },
    updateCategory({ commit }, category) {
        axios.put(`${apiGetCategory}/${category.id}`, category)
            .then(() => {
                commit('UPDATECATEGORY', category);
            })
            .catch(err => {
                console.warn(err);
            });
    },
    deleteCategory({ commit }, categoryId) {
        axios.delete(`${apiGetCategory}/${categoryId}`)
            .then((res) => {
                if (res.status === 200) {
                    const catIndex = this.getters.categoryIndexById(categoryId);
                    commit('DELETECATEGORY', catIndex);
                }
            })
            .catch(err => {
                console.warn(err);
            });
    },
};
