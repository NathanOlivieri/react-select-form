import React from 'react'
import styled from 'styled-components'
import { useStateValue } from '../State/State'
import { Spring, config } from 'react-spring/renderprops'
import Input from './Input'

const YearInputs = () => {

    let [{ rangeChecked, rangeImmediate }] = useStateValue()

    const YearContainer = styled.div`
        width: 80vw;
        max-width: 340px;
        display: flex;
        justify-content: space-between;
        @media screen and (min-width:1024px) {
            max-width: 286px;
        }
    `

    return (
        <YearContainer>
            {rangeChecked ?
                <Spring
                    from={{ transform: 'translateX(32px)', opacity: 0.2 }}
                    to={{ transform: 'translateY(0)', opacity: 1, zIndex: 1 }}
                    immediate={rangeImmediate}
                    config={config.gentle}
                >
                    {props => (
                        <div style={props}>
                            <Input style={props} name='minYear' type='yearSelect' rangeType='Min Year' />
                        </div>
                    )}
                </Spring>
                : null
            }
            <Spring
                    from={{ transform: 'translateX(-32px)', opacity: 0.2 }}
                    to={{ transform: 'translateY(0)', opacity: 1, zIndex: 1 }}
                    immediate={rangeImmediate}
                    config={config.gentle}
                >
                    { props => (
                        <div style={props}>
                            <Input name='maxYear' type='yearSelect' rangeType={rangeChecked ? 'Max Year' : 'singleInput'} />
                        </div>
                    )}
                </Spring>
        </YearContainer>
    )
}

export default YearInputs