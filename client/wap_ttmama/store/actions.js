import indexService from '../service/indexService.js';

import * as types from './mutation-type';

export const showIndex = ({ dispatch }) => {
	indexService.indexData().then((data)=>{
		dispatch(types.LOAD_INDEX, data[1]);
	});
}