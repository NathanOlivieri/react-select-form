import { getYearList } from '../Utils'

const initialYrList = getYearList(1990, 2019)

export const initialState = {
    car_makes: [],
    selected_make: 'Select Make',
    selected_make_slug: '',
    selected_models: [],
    selected_model: 'Select Model',
    selected_model_slug: 'all-models',
    selected_year_start: 'Min Yr.',
    selected_year_end: 'Max Yr.',
    selected_single_year: 'Select Year',
    rangeChecked: false,
    rangeImmediate: true, //animation
    yearList: initialYrList,
    max_year_list:[],
    min_year_list: [],
    formIsValid: true,
    show_submit_confirm: false
}