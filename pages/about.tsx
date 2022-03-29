import styled from "styled-components";
import {Fragment} from "react";
import Navbar from "../public/components/Navbar";

const About = () => {
  return (
      <Fragment>
          <Navbar />
          <Container>
              <h1>About us!</h1>
          </Container>
      </Fragment>
  )
}

const Container = styled.div`
    margin-top: 80px;
`
export default About;