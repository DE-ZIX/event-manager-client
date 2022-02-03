import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/home/Home.vue'),
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('@/views/About.vue'),
	},
	{
		path: '/classes',
		name: 'classesIndex',
		component: () => import('@/views/classes/index.vue'),
	},
	{
		name: 'addClass',
		path: '/classes/add',
		component: () => import('@/views/classes/add.vue'),
	},
	{
		name: 'editClass',
		path: '/classes/:id/edit',
		component: () => import('@/views/classes/edit.vue'),
	},
	{
		name: 'detailsClass',
		path: '/classes/:id',
		component: () => import('@/views/classes/details.vue'),
	},
	{
		path: '/events',
		name: 'eventsIndex',
		component: () => import('@/views/events/index.vue'),
	},
	{
		name: 'addEvent',
		path: '/events/add',
		component: () => import('@/views/events/add.vue'),
	},
	{
		name: 'editEvent',
		path: '/events/:id/edit',
		component: () => import('@/views/events/edit.vue'),
	},
	{
		name: 'detailsEvent',
		path: '/events/:id',
		component: () => import('@/views/events/details.vue'),
	},
	{
		path: '/resources',
		name: 'resourcesIndex',
		component: () => import('@/views/resources/index.vue'),
	},
	{
		name: 'addResource',
		path: '/resources/add',
		component: () => import('@/views/resources/add.vue'),
	},
	{
		name: 'editResource',
		path: '/resources/:id/edit',
		component: () => import('@/views/resources/edit.vue'),
	},
	{
		name: 'detailsResource',
		path: '/resources/:id',
		component: () => import('@/views/resources/details.vue'),
		children: [
			{
				name: 'addResourceToEvent',
				path: 'add-to-event',
				component: () => import('@/views/resources/AddResourceToEvent.vue'),
			},
			{
				name: 'addResourceToClass',
				path: 'add-to-class',
				component: () => import('@/views/resources/AddResourceToClass.vue'),
			},
		],
	},
	{
		path: '/authors',
		name: 'authorsIndex',
		component: () => import('@/views/authors/index.vue'),
	},
	{
		name: 'addAuthor',
		path: '/authors/add',
		component: () => import('@/views/authors/add.vue'),
	},
	{
		name: 'editAuthor',
		path: '/authors/:id/edit',
		component: () => import('@/views/authors/edit.vue'),
	},
	{
		name: 'detailsAuthor',
		path: '/authors/:id',
		component: () => import('@/views/authors/details.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
