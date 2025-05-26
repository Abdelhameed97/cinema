
const INITIAL_STATE = {
    lang: 'EN',
    theme: 'Dark'
}

export default function langReducer(state = INITIAL_STATE, action){
    switch(action.type){
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
        default:
            return state;
    }
}