const initialState = {
    country: 'France',
    region: '',
    appelation: '',
    vintage: undefined,
    cru: '',
    producer: '',
    type: 'red',
    cuvee: '',
    size: '75cl',
    quantity: 1,
    comments: '',
}

function updateWineAddItem(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'COUNTRY':
            nextState = {
                ...state,
                country: action.value
            }
            return nextState || state
        case 'REGION':
            nextState = {
                ...state,
                region: action.value
            }
            return nextState || state
        case 'APPELATION':
            nextState = {
                ...state,
                appelation: action.value
            }
            return nextState || state
        case 'VINTAGE':
            nextState = {
                ...state,
                vintage: action.value
            }
            return nextState || state
        case 'CRU':
            nextState = {
                ...state,
                cru: action.value
            }
            return nextState || state
        case 'PRODUCER':
            nextState = {
                ...state,
                producer: action.value
            }
            return nextState || state
        case 'TYPE':
            nextState = {
                ...state,
                type: action.value
            }
            return nextState || state
        case 'CUVEE':
            nextState = {
                ...state,
                cuvee: action.value
            }
            return nextState || state
        case 'SIZE':
            nextState = {
                ...state,
                size: action.value
            }
            return nextState || state
        case 'QUANTITY':
            nextState = {
                ...state,
                quantity: action.value
            }
            return nextState || state
        case 'COMMENTS':
            nextState = {
                ...state,
                comments: action.value
            }
            return nextState || state
        default:
            return state
    }
}

export default updateWineAddItem
