const INITIAL_STATE = {
    lang: 'EN',
    theme: 'Dark',
    wishlist: []  // Add wishlist array to store movies
}

export default function langReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'CHANGE_LANGUAGE':
            return {
                ...state,
                lang: action.payload
            }
        case 'CHANGE_THEME':
            return {
                ...state,
                theme: action.payload
            }
        case 'ADD_TO_WISHLIST':
            // Check if movie already exists in wishlist
            const exists = state.wishlist.some(movie => movie.id === action.payload.id);
            if (exists) {
                return state; // Don't add duplicates
            }
            return {
                ...state,
                wishlist: [...state.wishlist, action.payload]
            }
        case 'REMOVE_FROM_WISHLIST':
            return {
                ...state,
                wishlist: state.wishlist.filter(movie => movie.id !== action.payload)
            }
        default:
            return state;
    }
}