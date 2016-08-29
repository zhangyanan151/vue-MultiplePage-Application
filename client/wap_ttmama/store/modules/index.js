import { LOAD_INDEX } from '../mutation-type';

const state = {
	wapapp2picCol: []
};

const mutations = {
	[LOAD_INDEX] (state, wapapp2picCol) {
		state.wapapp2picCol = wapapp2picCol;
	}
}
export default {
  state,
  mutations
}