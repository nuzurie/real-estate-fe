import Link from 'next/link'
import HouseView, {House} from "../../public/components/House";
import axios from "axios";
import styled from 'styled-components';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {
    IconLookup,
    IconDefinition,
    findIconDefinition
} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Fragment, useEffect, useState} from "react";
import Navbar from "../../public/components/Navbar";

library.add(fas)
config.autoAddCss = false

const heartLookup: IconLookup = { prefix: 'fas', iconName: 'heart' }
const heartIconDefinition: IconDefinition = findIconDefinition(heartLookup)

const mapLookup: IconLookup = { prefix: 'fas', iconName: 'map' }
const mapIconDefinition: IconDefinition = findIconDefinition(mapLookup)

interface Listing {
    id: string
    house: House
    price: bigint
    listingType: string;
    imageUrl?: string
}

function ListingComponent() {

    const [listingDTOList, setListingDtoList] = useState<Listing[] | undefined>([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/listings')
            .then(res => setListingDtoList(res.data._embedded.listingDTOList))
            .catch(err => console.log(err))
    }, [])

    function handleFavourite(id: string) {
        alert(`favourited ${id}`)
    }

    return (
        <Fragment>
            <Navbar />
                <Container>
                    {listingDTOList?.map(listing => (
                        <Link href={`/listings/${listing.id}`} key={listing.id}>
                            <Card >
                                <Image src={ listing.imageUrl ? listing.imageUrl : 'https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg'} />
                                <Price>${Number(listing.price).toLocaleString('en-US')}</Price>
                                <HouseView house={listing.house} />
                                <IconsDiv>
                                    <FontAwesomeIcon onClick={() => handleFavourite(listing.id)} icon={heartIconDefinition} color={"pink"} size={"lg"}/>
                                    <FontAwesomeIcon icon={mapIconDefinition}  color={"lightblue"} size={"lg"}/>
                                </IconsDiv>
                            </Card>
                        </Link>
                    ))}
                </Container>
        </Fragment>
    )
}

// export async function getServerSideProps() {
//     try {
//         const res = await axios.get('http://localhost:8080/api/listings')
//         const data = res.data
//         return {
//             props: data._embedded,
//         }
//     } catch (e) {
//        console.log(e)
//     }
// }

const IconsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 22px 10px 22px;
  flex-wrap: wrap;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 20rem);
  justify-content: center;
  grid-gap: 2rem;
  margin: 95px 15px 15px 15px;
  border: 10px greenyellow;
`

const Price = styled.h3`
  margin-left: 15px;
`

const Card = styled.div`
  box-shadow: 0px 2px 8px 0px lightgrey;
  background: #FFF8E8;
  margin: 0px;
  border-radius: 1rem;
  width: 300px;
  contain: content;
  font-family: "Open Sans", sans-serif;
  position: relative;
  &:hover {
    //background-color: rgb(62, 62, 62);
    //color: white;
    cursor: pointer;
    transform: scale(1.03);
    transition: all 0.5s ease;
  }
`

const Image = styled.img`
  height: 10rem;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export default ListingComponent;