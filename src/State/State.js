import React, {createContext, useContext, useReducer} from 'react'

export const StateContext = createContext()

//Create stateProviding HOC to wrap entire app in src/index.js
export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={ useReducer(reducer, initialState) }>
        {children}
    </StateContext.Provider>
)

//Function used to access state throughout the App
export const useStateValue = () => useContext(StateContext)

//MainReducer passed as reducer prop to StateProvider in src/index.js
//all state modifications must have a determined case in this reducer.
export const mainReducer = (state, action) => {
    switch (action.type) {
        case 'GET_MAKES':
            return {
                ...state,
                car_makes: action.payload
            }
        case 'SET_MODELS':
            return {
                ...state, 
                selected_models: action.payload
            }        
        case 'SET_MAX_YEAR_LIST':
            return {
                ...state,
                max_year_list: action.payload
            }
        case 'SET_MIN_YEAR_LIST':
            return {
                ...state,
                min_year_list: action.payload
            }
        case 'SET_CUR_MAKE':
            return {
                ...state,
                selected_make: action.payload
            }
        case 'SET_MAKE_SLUG':
            return {
                ...state,
                selected_make_slug: action.payload
            }
        case 'TOGGLE_RANGE':
            return {
                ...state,
                rangeChecked: action.payload
            }
        case 'TOGGLE_IMMEDIATE':
            return {
                ...state,
                rangeImmediate: action.payload
            }
        case 'SET_CUR_MODEL':
            return {
                ...state,
                selected_model: action.payload
            }
        case 'SET_MODEL_SLUG':
            return {
                ...state,
                selected_model_slug: action.payload
            }
        case 'SET_YR_START':
            return {
                ...state,
                selected_year_start: action.payload
            }
        case 'SET_YR_END':
            return {
                ...state,
                selected_year_end: action.payload
            }
        case 'SET_SINGLE_YR':
            return {
                ...state,
                selected_single_year: action.payload
            }
        case 'SET_FORM_VALIDITY':
            return {
                ...state,
                formIsValid: action.payload
            }
        case 'TOGGLE_POPUP': {
            return {
                ...state,
                show_submit_confirm: action.payload
            }
        }
        default:
            return {
                ...state
            }
    }
}