//Utility, formatting functions

export const getYearList = (min, max) => {
    let yearsArr = []
    for(let i = min; i <= max; i++){
        yearsArr.push(i)    
    }
    return yearsArr
}

//------State-Modifying Actions------//
export const clearFormAction = (dispatch) => {
    dispatch({ type: 'SET_CUR_MAKE', payload: 'Select Make' })
    dispatch({ type: 'SET_CUR_MODEL', payload: 'Select Model' })
    dispatch({ type: 'SET_YR_START', payload: 'Min Yr.' })
    dispatch({ type: 'SET_YR_END', payload: 'Max Yr.' })
    dispatch({ type: 'SET_SINGLE_YR', payload: 'Select Year' })
    dispatch({ type: 'TOGGLE_IMMEDIATE', payload: true })
    dispatch({ type: 'SET_MAX_YEAR_LIST', payload: getYearList(1990, 2019) })
    dispatch({ type: 'SET_MIN_YEAR_LIST', payload: getYearList(1990, 2019) })
    dispatch({ type: 'SET_FORM_VALIDITY', payload: true })
}

export const handleMakeInput = (label, dispatch, value) => {
    dispatch({ type: 'SET_CUR_MAKE', payload: label })
    dispatch({ type: 'SET_MAKE_SLUG', payload: value })
    dispatch({ type: 'TOGGLE_IMMEDIATE', payload: true })
    dispatch({ type: 'SET_CUR_MODEL', payload: 'Select Model' })
    dispatch({ type: 'SET_FORM_VALIDITY', payload: true })
}

export const handleModelInput = (label, dispatch, value) => {
    dispatch({ type: 'SET_CUR_MODEL', payload: label })
    dispatch({ type: 'SET_MODEL_SLUG', payload: value })
}

export const toggleSwitch = (rangeChecked, dispatch) => {
    dispatch({ type: 'TOGGLE_RANGE', payload: !rangeChecked })
    dispatch({ type: 'TOGGLE_IMMEDIATE', payload: false })
    dispatch({ type: 'SET_YR_START', payload: 'Min Yr.' })
    dispatch({ type: 'SET_YR_END', payload: 'Max Yr.' })
}

export const setSingleYear = (value, dispatch) => {
    dispatch({ type:'SET_SINGLE_YR', payload: value })
}

export const setYearStart = (value, dispatch) => {
    let date = new Date()
    let curYear = date.getFullYear()
    dispatch({ type:'SET_YR_START', payload: value}) 
    dispatch({ type:'SET_MAX_YEAR_LIST', payload: getYearList(value, curYear)})
    dispatch({ type:'SET_SINGLE_YR', payload: 'Select Year' })
}

export const setYearEnd = (value, dispatch) => {
    dispatch({ type:'SET_YR_END', payload: value}) 
    dispatch({ type:'SET_MIN_YEAR_LIST', payload: getYearList(1990, value)})
    dispatch({ type:'SET_SINGLE_YR', payload: 'Select Year' })
} 

export const handleInvalidSubmit = (dispatch) => {
    console.log('Form invalid')
    dispatch({ type: 'SET_FORM_VALIDITY', payload: false })
    dispatch({ type: 'SET_CUR_MAKE', payload: 'Make Required' })
    dispatch({ type: 'TOGGLE_IMMEDIATE', payload: true })
}

export const playSuccessAnim = (dispatch) => {
    dispatch({ type:'TOGGLE_POPUP', payload: true })
    setTimeout(() => {
        dispatch({ type:'TOGGLE_POPUP', payload: false })
    }, 4000);
}
