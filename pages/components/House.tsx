import {Fragment} from "react";
import styled from "styled-components";

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

function HouseView({ house }: Props) {
    return (
        <Fragment>
            <h3>rooms: {house.rooms}   {"\t"}     bathrooms: {house.bathrooms}</h3>
            <h3>{house.civicAddress}, {house.area}</h3>
            <h3>{house.province}. {house.postalCode}</h3>
        </Fragment>
    )
}


export default HouseView;