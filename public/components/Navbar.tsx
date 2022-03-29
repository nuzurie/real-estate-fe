import Link from "next/link";
import styled from "styled-components";
import logo from "../static/Amna-logos/Amna-logos_transparent.png";
import {
    IconLookup,
    IconDefinition,
    findIconDefinition
} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useState} from "react";
import Image from "next/image";

const menuLookup: IconLookup = {prefix: 'fas', iconName: 'bars'}
const menuIconDefinition: IconDefinition = findIconDefinition(menuLookup)

export type SidebarProps = {
    // LogoClick: () => void
    isShown: boolean
}

function Navbar() {
    {console.log(logo)}
    const [sidebarShown, setSidebarShown] = useState(false);
    return (
        <Container>
            <Link href={'/listings'}>
                <ImageContainer>
                    <Image src={logo} height={'80px'} width={'80px'} />
                    <Title>Amna Real Estate</Title>
                </ImageContainer>
            </Link>
            <Menu>
                <Routes>
                    <Link href={'/listings/create'}>
                        <Span>CREATE</Span>
                    </Link>
                    <Link href={'/listings'}>
                        <Span>LISTINGS</Span>
                    </Link>
                    <Link href={'/about'}>
                        <Span>ABOUT</Span>
                    </Link>
                    <Select name={'language'}>
                        <option value={'EN'}>&nbsp;EN</option>
                        <option value={'FR'}>&nbsp;FR</option>
                    </Select>
                </Routes>
                <StyledBar onClick={() => setSidebarShown(!sidebarShown)} icon={menuIconDefinition} size={"2x"}/>
            </Menu>
            <SideBar isShown={sidebarShown}>
                <Link href={'/listings/create'}>
                    <Span>CREATE</Span>
                </Link>
                <Link href={'/listings'}>
                    <Span>LISTINGS</Span>
                </Link>
                <Link href={'/about'}>
                    <Span>ABOUT</Span>
                </Link>
                <Select name={'language'}>
                    <option value={'EN'}>&nbsp;EN</option>
                    <option value={'FR'}>&nbsp;FR</option>
                </Select>
            </SideBar>
        </Container>
    )
}

export default Navbar;

const Container = styled.div`
  background-color: #990D35;
  width: 100vw;
  height: 80px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 9000;
`

const ImageContainer = styled.div`
  //background-image: url("../static/logo.png");
  display: flex;
  align-items: center;
  margin-left: 60px;
  //border-radius: 30px;
  cursor: pointer;
`

const Title = styled.span`
  align-items: center;
  font-weight: 700;
  font-family: "Comic Sans MS";
  font-size: 20px;
`

const Routes = styled.div`
  display: none;
  @media screen and (min-width: 738px) {
    display: flex;
    gap: 4em;
    align-items: center;
  }
`

const Span = styled.span`
  font-weight: 700;
  cursor: pointer;
`

const Select = styled.select`
  width: 60px;
  height: 30px;
  background-color: #D52941;
  border: none;
`

const StyledBar = styled(FontAwesomeIcon)`
  display: none;
  @media screen and (max-width: 738px) {
    display: block;
    align-items: center;
  }
`

const Menu = styled.div`
  margin-right: 10%;
  cursor: pointer;
`

const SideBar = styled.div<SidebarProps>`
  display: none;
  @media screen and (max-width: 738px) {
    height: 110vh;
    width: 30%;
    min-width: 300px;
    display: ${(props) => (props.isShown ? 'flex' : 'none')};
    flex-direction: column;
    position: fixed;
    right: 0;
    top: 0;
    margin-top: 80px;
    //margin: -20px;
    padding: 0;
    //inset: 0 0 0 70%;
    //background: hsla(0, 100%);
    background: hsl(343 84% 33% / 0.4);
    backdrop-filter: blur(1rem);
    //filter: blur(8px);
    //-webkit-filter: blur(8px);
    gap: 30px;
    padding: 40px;
    z-index: 9000;
  }
`