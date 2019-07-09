import React from 'react'
import styled from 'styled-components'
import { Spring, config } from 'react-spring/renderprops'

const SubmitPopUp = (props) => {

    const StyledPopUp = styled.div`
        position: fixed;
        top: 0;
        padding: 8px 16px;
        left: 0;
        background: #29981F;
        color: #fff;
    `

    return (
        <Spring
            from={{ transform: 'translateX(-64px)', opacity: 0.1 }}
            to={{ transform: 'translateX(0)', opacity: 1, zIndex: 1  }}
            config={ config.wobbly }
        >
                { springProps => (
                        <StyledPopUp style={ springProps }>
                            <span>{ props.text }</span>
                        </StyledPopUp>
                )}
        </Spring>
    )
}

export default SubmitPopUp

                        
                        