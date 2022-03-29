import type { NextPage } from 'next'
import {Fragment} from "react";
import Navbar from "../public/components/Navbar";
import styled from "styled-components";

const Home: NextPage = () => {
  return (
      <Fragment>
        <Navbar />
        <H1>Hello!</H1>
      </Fragment>
  )
}

const H1 = styled.h1`
  margin-top: 80px;
`

export default Home
