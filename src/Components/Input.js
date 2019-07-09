import React from 'react'
import { useStateValue } from '../State/State'
import Select from 'react-select'
import axios from 'axios'
import { handleMakeInput, setSingleYear, setYearStart, setYearEnd, handleModelInput } from '../Utils';

const Input = ( props ) => {
    let input = {}

    let [{ yearList, 
        car_makes, 
        rangeChecked, 
        selected_models, 
        selected_make, 
        selected_year_start,
        selected_year_end,
        selected_single_year,
        max_year_list,
        min_year_list,
        formIsValid,
        selected_model }, dispatch] = useStateValue()

//Custom Styles object passed to react-select component
    const customStyles = {
        menu: (provided) => ({
            ...provided,
            zIndex: 2
        }),
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
          return { ...provided, opacity, transition };
        },
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: props.type === 'makeSelect' ? formIsValid ? '#808080' : '#EE5833' : '#808080',
            transition: 'all .2s ease',
            transform: state.isFocused ? 'rotate(-180deg)' : null
        }),
        placeholder: (provided) => ({
            ...provided,
            color: props.type === 'makeSelect' ? formIsValid ? '#808080' : '#EE5833' : '#808080',
        })
    }

    const customYearsStyles = {
        container: (provided) => ({
            ...provided,
            width: rangeChecked ? 120 : '80vw',
            maxWidth: window.innerWidth >= 1024 ? 240 : 340,
        }),
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
          return { ...provided, opacity, transition };
        },
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: '#808080',
            transition: 'all .2s ease',
            transform: state.isFocused ? 'rotate(-180deg)' : null
        })
    }


//-------INPUT CHANGE HANDLERS----------//
//handle make input, use user selection to make api call for model list.
    const handleMakeChange = (e) => {
        let value = e.value
        let label = e.label
        handleMakeInput(label, dispatch, value)
        let proxyURL = 'https://cryptic-plateau-43825.herokuapp.com/'
        let url = `https://www.carpages.ca/lookup/models/?make_name=${ value }`
        axios(proxyURL + url)
            .then(res => {
                dispatch({ type: 'SET_MODELS', payload: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

//handle Model input change 
    const handleModelChange = (e) => {
        let value = e.value
        let label = e.label
        handleModelInput(label, dispatch, value)
    }

//handle year change and formating when seperate
    const handleYearChange = (e) => {
        dispatch({ type: 'TOGGLE_IMMEDIATE', payload: true })
        let value = e.value
        if(props.rangeType !== 'singleInput'){
            props.rangeType === 'Min Year' 
                ? setYearStart(value, dispatch) 
                : setYearEnd(value, dispatch)
        }else {
            setSingleYear(value, dispatch)
        }
    }

//--------INPUT TYPE SWITCH-----------//
//switch between custom input types 
    switch (props.type) {
        case 'yearSelect':
            let yearMap = yearList.map( item => { return { value: item, label: item } })
            if(rangeChecked){
                if(props.rangeType === 'Min Year' && min_year_list.length > 0){
                    yearMap = min_year_list.map( item => { return { value: item, label: item }})
                }else if(props.rangeType === 'Max Year' && max_year_list.length > 0) {
                    yearMap = max_year_list.map( item => { return { value: item, label: item }})
                }
            }
            input = 
                <Select 
                    name={ props.name } 
                    className='input' 
                    options={ yearMap } 
                    styles={ customYearsStyles }
                    placeholder={ rangeChecked 
                        ? props.rangeType === 'Min Year' 
                        ? selected_year_start 
                        : props.rangeType === 'Max Year' 
                        ? selected_year_end 
                        : 'Impossible...'
                        : selected_single_year } 

                    onChange={ handleYearChange }
                    theme={ theme => ({
                        ...theme,
                        borderRadius: 5,
                        colors: {
                          ...theme.colors,
                          primary50: '#29981F10',
                          primary25: '#29981F20',
                          primary: '#29981F'
                        },
                    })}
                />
            break;
        case 'makeSelect':
            let makesMap = car_makes.map(item => { return { value: item.slug, label: `${ item.name } (${ item.doc_count })` } })
            input = 
                <Select 
                    name={ props.name } 
                    className='input' 
                    options={ makesMap } 
                    placeholder={ selected_make } 
                    onChange={ handleMakeChange }
                    styles={ customStyles }
                    theme={ theme => ({
                        ...theme,
                        borderRadius: 5,
                        zIndex: 2,
                        colors: {
                            ...theme.colors,   
                            primary50: '#29981F10',
                            primary25: '#29981F20',
                            primary: formIsValid ? '#29981F' : '#EE5833',
                        },
                    })}
                />
            break;
        case 'modelSelect':
            let modelsMap = selected_models.map(item => { return { value: item.slug, label: `${ item.name } (${ item.doc_count })` }})
            modelsMap.unshift({ value: 'all-models', label: 'All Models' })
            input = 
                <Select 
                    name={ props.name } 
                    className='input' 
                    options={ modelsMap } 
                    placeholder={ selected_model }
                    isClearable={ true }
                    onChange={ handleModelChange }
                    styles={ customStyles }
                    theme={ theme => ({
                        ...theme,
                        borderRadius: 5,
                        zIndex: 2,
                        colors: {
                          ...theme.colors,
                          primary50: '#29981F10',
                          primary25: '#29981F20',
                          primary: '#29981F',
                        },
                    })} 
                />
            break;
        case 'baseSelect':
            break;
        case 'optSpeed':
            break;
        default:
            break;
    }

    return (
        <>
            <label>{ input }</label>
        </>
    )
}

export default Input
