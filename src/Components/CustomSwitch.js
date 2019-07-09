import React from 'react'
import styled from 'styled-components'
import { useStateValue } from '../State/State'
import Switch from 'react-switch'
import { Spring, config } from 'react-spring/renderprops'
import { toggleSwitch } from '../Utils'

const CustomSwitch = () => {
    let [{ rangeChecked, rangeImmediate }, dispatch] = useStateValue()

    const handleChange = () => {
        toggleSwitch(rangeChecked, dispatch)
    }

    const StyledFlex = styled.label`
        height: 50px;
        width: 80vw;
        max-width: 338px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 4px 4px 20px #55555540;
        padding: 16px;
        border-radius: 5px;
        border-left: solid 3px #29981F;
        span {
            margin: 0 16px;
        }
        @media screen and (min-width: 1024px) {
            width: auto;
            align-self: flex-start;
        }
    `
    return (
        <StyledFlex>
            <Switch
                height={25}
                width={45}
                onChange={handleChange}
                checked={rangeChecked}
                checkedIcon={false}
                uncheckedIcon={false}
                onColor='#888'
            />
            <Spring
                from={{ transform: 'translateX(32px)', opacity: 0.1 }}
                to={{ transform: 'translateY(0)', opacity: 1 }}
                config={ config.wobbly }
                immediate={ rangeImmediate }
            >
                {springProps => (
                    <div style={springProps}>
                        <span>{rangeChecked ? 'Select Single Year' : 'Select Year Range'}</span>
                    </div>
                )}
            </Spring>
        </StyledFlex>
    )
}

export default CustomSwitch