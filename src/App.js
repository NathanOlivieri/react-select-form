import React, { useEffect } from 'react';
import { useStateValue } from './State/State'
import Logo from './Components/Logo';
import Form from './Components/Form';
import SubmitPopUp from './Components/SubmitPopUp'
import axios from 'axios'
import styled from 'styled-components'
//heroku proxy app is at : https://cryptic-plateau-43825.herokuapp.com/
//>>>>>ONLY IN DEV MODE<<<< app needs a proxy to access api and not get blocked by CORS

const App = () => {

  let [{ show_submit_confirm }, dispatch] = useStateValue()

  useEffect(() => {
    const getMakes = async () => {
      let proxyURL = 'https://cryptic-plateau-43825.herokuapp.com/'
      let url = 'https://www.carpages.ca/lookup/makes'
      let res = await axios(proxyURL + url)
      dispatch({ type:'GET_MAKES', payload: res.data })
    }
    getMakes();
  }, [dispatch])
  
  const StyledApp = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin-top: 10vw;
  `

  const WidgetContainer = styled.section`
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    @media screen and (min-width: 1024px) {
      align-items: flex-start;
      height: 350px;
      padding: 24px;
      box-shadow: 4px 4px 20px #55555540;
      border-radius: 5px;
      border-bottom: solid 5px #29981F;
    }
  `

  return (
      <StyledApp role='main'>
        {
          show_submit_confirm ? <SubmitPopUp text='Success!'/> : null
        }
        <WidgetContainer>
          <Logo />
          <Form />
        </WidgetContainer>
      </StyledApp>
  );
}

export default App;

