import React from 'react'
import Input from './Input';
import { useStateValue } from '../State/State';
import styled from 'styled-components'
import Button from './Button';
import { clearFormAction, handleInvalidSubmit, playSuccessAnim } from '../Utils';
import axios from 'axios';
import CustomSwitch from './CustomSwitch'
import YearInputs from './YearInputs';

const Form = () => {

    const [{  selected_make, 
        selected_make_slug,
        selected_model_slug, 
        selected_year_start, 
        selected_year_end, 
        selected_single_year, }, dispatch] = useStateValue()

//-------FORM_SUBMIT_HANDLER-------//
    const handleSubmit = (e) => {
        e.preventDefault()
        let userQuery = {
            make_name: selected_make_slug,
            model_name: selected_model_slug,
            year_start: selected_year_start === 'Min Yr.' ? selected_single_year : selected_year_start,
            year_end: selected_year_end === 'Max Yr.' ? selected_single_year : selected_year_end
        }
        if(selected_make === 'Select Make' || selected_make === 'Make Required'){
            handleInvalidSubmit(dispatch)
        }else {
                        
            let proxyURL = 'https://cryptic-plateau-43825.herokuapp.com/'
            let url = 'https://www.carpages.ca/used-cars/search'
            let postConfig = {
                method: 'POST',
                url: proxyURL + url,
                data: JSON.stringify({
                    ...userQuery,
                    year_start: userQuery.year_start === 'Min Yr.' || userQuery.year_start === 'Select Year' ? 1990 : userQuery.year_start,
                    year_end: userQuery.year_end === 'Max Yr.' || userQuery.year_start === 'Select Year' ? new Date().getFullYear() : userQuery.year_end, 
                    model_name: userQuery.model_name === 'Select Model' ? 'ALL' : userQuery.model_name
                }),
                headers: {
                    'content-type': 'application/json'
                }
            }
            axios(postConfig)
                .then( res =>  {
                    playSuccessAnim(dispatch)
                    console.log(res)
                })
                .catch( err => console.log(err) )
        }
    }

    const clearForm = () => {
        clearFormAction(dispatch)
    }

//------FORM STYLES------//
    const StyledForm = styled.form`
        display: flex;
        flex-flow: column;
        align-items: center;
        @media screen and (min-width: 1024px) {
            width: auto;
            height: 30vh;
        }
    `
    const ResponsiveFlex = styled.div`
        display: flex;
        flex-flow: column;
        margin: 8px 0;
        align-items: center;
        @media screen and (min-width: 1024px) {
            flex-flow: row;
        }
    `
    const BtnSection = styled(ResponsiveFlex)`
        @media screen and (min-width: 1024px) {
            flex-flow: column;
            width: 98%;
            align-items: flex-end;
        }
    `

    const Reverse = styled(ResponsiveFlex)`
        @media screen and (min-width: 1024px) {
            flex-flow: row-reverse;
        }
    `

    return (
        <StyledForm onSubmit={ handleSubmit }>
            <ResponsiveFlex>
                <Input name='makeInput' type='makeSelect' />
                <Input name='modelInput' type='modelSelect' />
                <YearInputs />
            </ResponsiveFlex>
            <BtnSection>
                <CustomSwitch />
                <Reverse>
                    <Button type='submit' text='FIND A VEHICLE'/>
                    <Button type='button' onClick={ clearForm } text='CLEAR' theme='invert'/>
                </Reverse>
            </BtnSection>
        </StyledForm>
    )
}

export default Form