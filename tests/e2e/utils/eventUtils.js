import { tableUtils, listUtils } from '.';

const EventUtils = {
	checkListResponse(res) {
		listUtils.checkListResponse(res);
	},
	checkListView() {
		tableUtils.checkListData('event');
	},
};

export default EventUtils;
