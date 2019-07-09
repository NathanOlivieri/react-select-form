import React from 'react'
import styled from 'styled-components'

const Button = (props) => {

    let { theme } = props

    const HoverWrap = styled.div``

    const StyledButton = styled.button`
        height: 50px;
        width: 200px;
        background-color: ${ theme === 'invert' ? '#fff' : '#29981F' };
        color: ${ theme === 'invert' ? '#29981F' : '#fff' };
        border: none;
        border-radius: 5px;
        font-weight: 600;
        margin: 16px 0 0 0;
        transition: 800ms;
        cursor: pointer;
        ${HoverWrap}:hover & {
            background: ${theme === 'invert' ? '#fff' : '#29981F86'}
            transition: 500ms;
        }
    `

    return (
        <HoverWrap>
            <StyledButton type={ props.type } onClick={props.onClick !== undefined ? props.onClick : null }>
                { props.text }
            </StyledButton>
        </HoverWrap>
    )
}

export default Button