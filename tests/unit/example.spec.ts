import { mount, shallowMount } from '@vue/test-utils';
import Home from '@/views/home/Home.vue';

describe('Home.vue', () => {
	it('renders lists properly', () => {
		const wrapper = shallowMount(Home);
		expect(wrapper.find('.home').exists()).toBe(true);
	});
});
