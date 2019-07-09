import React from 'react'
import styled from 'styled-components'



const Logo = () => {
    const StyledLogo = styled.img`
        width: 200px;
        margin: 16px 0;
    `

    return (
        <StyledLogo src='assets/carPages.jpg' alt='CarPages Logo'></StyledLogo>
    )
}

export default Logo