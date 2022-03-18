import {Fragment} from "react";
import styled from "styled-components";

import {
    IconLookup,
    IconDefinition,
    findIconDefinition
} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export interface House {
    id: string
    rooms: bigint
    bathrooms: bigint
    civicAddress: string
    area: string
    city: string
    province: string
    postalCode: string
}

type Props = {
    house: House
}

const bathLookup: IconLookup = { prefix: 'fas', iconName: 'bath' }
const bathIconDefinition: IconDefinition = findIconDefinition(bathLookup)

const bedroomLookup: IconLookup = { prefix: 'fas', iconName: 'bed' }
const bedIconDefinition: IconDefinition = findIconDefinition(bedroomLookup)

function HouseView({ house }: Props) {
    return (
        <Container>
            <Header>{house.civicAddress}, {house.area}</Header>
            <Header>{house.province}. {house.postalCode}</Header>
            <RoomInfo><Text>{house.rooms}</Text><FontAwesomeIcon icon={bedIconDefinition} size={"2x"}/> &nbsp;&nbsp;<Text>{house.bathrooms}</Text><FontAwesomeIcon icon={bathIconDefinition} size={"2x"}/></RoomInfo>
        </Container>
    )
}

const Container = styled.div`
  text-align: left;
`

const RoomInfo = styled.h5`
  margin-left: 15px;
`

const Header = styled.p`
  margin-left: 15px;
  padding: 0px;
`

const Text = styled.span`
  font-size: large;
  margin-right: 10px;
`


export default HouseView;