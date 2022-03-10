import HouseView, {House} from "../components/House";
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
}

type Props = {
    listingDTOList: Listing[]
}

function ListingComponent({listingDTOList}:Props) {
        console.log(listingDTOList)
        if (listingDTOList) {
            return (
                <Container>
                    {listingDTOList.map(listing => (
                        <Card>
                            <Image src={'https://nypost.com/wp-content/uploads/sites/2/2021/11/veronika-rajek-_30.jpg?quality=90&strip=all'} />
                            <HouseView house={listing.house} />
                            <p>${Number(listing.price).toLocaleString('en-US')}  {listing.listingType}</p>
                            <IconsDiv>
                                {/*<h4>Hii?</h4>*/}
                                {/*<h4>Hello?</h4>*/}
                                <FontAwesomeIcon icon={heartIconDefinition} color={"red"} size={"lg"}/>
                                <FontAwesomeIcon icon={mapIconDefinition}  color={"green"} size={"lg"}/>
                            </IconsDiv>
                        </Card>
                    ))}
                </Container>
            )
        } else {
            return (
                <div>Loading</div>
            )
        }
}

export async function getServerSideProps() {
    try {
        const res = await axios.get('http://localhost:8080/api/listings')
        const data = res.data
        return {
            props: data._embedded,
        }
    } catch (e) {
       console.log(e)
    }
}

const IconsDiv = styled.div`
  display: flex;
  flex-direction: row;
  //place-items: center;
  align-content: space-between;
  margin-bottom: 10px;
  margin-left: 22px;
  margin-right: 20px;
  ////align-content: space-between;
  ////align-items: ;
  gap: 220px;
  flex-wrap: wrap;
  width: 100%;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 20rem);
  justify-content: center;
  grid-gap: 2rem;
`

const Card = styled.div`
  box-shadow: 0px 2px 8px 0px lightgrey;
    background: cyan;
    margin: 0px;
    border-radius: 1rem;
  width: 300px;
  contain: content;
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
  text-align: center;
  position: relative;
`

const Image = styled.img`
  //position: absolute;
  height: 10rem;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  //width: 30rem;
  //background-size: cover;
`



export default ListingComponent;