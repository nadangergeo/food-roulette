import DB from 'mishmash-db/';

const initialState = {
  postalCode: "112 20",
	postalCity: null,
	restaurants: [],
	spinRestaurants: false,
	spinMenu: false
};

let state = new DB(initialState);
        
let actions = {
	setPostalCode: (postalCode) => {
		state.mutate({ postalCode });
	},

	setPostalCity: (postalCity) => {
		state.mutate({ postalCity });
	},

	setRestaurants: (restaurants) => {
		state.mutate({ restaurants });
	},

	toggleRestaurantSpinner: () => {
		state.mutate(({spinRestaurants}) => ({ spinRestaurants: !spinRestaurants }));
	},

	toggleMenuSpinner: () => {
		state.mutate(({spinMenu}) => ({ spinMenu: !spinMenu }));
	}
};

export {
	state,
	actions
};