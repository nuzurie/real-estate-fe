import React, {useCallback, useEffect} from "react";
import styled, {css} from "styled-components";
import {useForm} from "../../public/hooks/form";
import {Listing, House, Summary} from "../../public/domain/listing";
import axios from "axios";

interface Values {
    rooms: number;
    bathrooms: number;
    civicAddress: string;
    area: string;
    city: string;
    province: string;
    postalCode: string;
    title: string;
    builtYear: number;
    storeys: number;
    neighbourhoodName: string;
    propertyType: string;
    buildingType: string;
    price: number;
    listingType: string;
    description: string;
}

interface Props {
    isShown: boolean
    onCancel: () => void
}

function CreateForm({ isShown, onCancel }: Props ) {
    const initialValues: Values = {
        description: "",
        area: "",
        bathrooms: 0,
        city: "",
        civicAddress: "",
        postalCode: "",
        province: "",
        rooms: 0,
        listingType: "FOR_SALE",
        price: 0,
        buildingType: "CONDO",
        builtYear: 0,
        neighbourhoodName: "",
        propertyType: "MULTIPLE_FAMILY",
        storeys: 0,
        title: ""
    }

    const {onChange, onSubmit, values} = useForm(
        handleSubmit,
        initialValues
    );

    async function handleSubmit() {
        const house: House = {
            area: values.area,
            bathrooms: values.bathrooms,
            city: values.city,
            civicAddress: values.civicAddress,
            postalCode: values.postalCode,
            province: values.province,
            rooms: values.rooms
        }
        const summary: Summary = {
            buildingType: values.buildingType,
            builtYear: values.builtYear,
            neighbourhoodName: values.neighbourhoodName,
            propertyType: values.propertyType,
            storeys: values.storeys,
            title: values.title
        }
        const listing: Listing = {
            description: values.description,
            house: house,
            id: "",
            listingType: values.listingType,
            price: values.price,
            summary: summary
        }
        onCancel();
        console.log(listing)
        axios.post('http://localhost:8080/api/listings', listing)
            .then(res => console.log(res))
            .catch(err => console.log(err.response.data))
    }

    const escFunction = useCallback((event) => {
        if (event.key === "Escape") {
            onCancel();
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, []);

    if (!isShown) {return null}

    return (
        <FormWrapper onClick={onCancel}>
            <Form onSubmit={onSubmit} onClick={e => e.stopPropagation()}>
                <label htmlFor={"title"}>
                    Title:
                    <StyledInput onChange={onChange} required type={"text"} name={'title'} id={'title'}/>
                </label>
                <label htmlFor={"price"}>
                    Price:
                    <StyledInput onChange={onChange} required type={'number'} name={'price'} id={'price'}/>
                </label>
                <label htmlFor={'description'}>
                    Description
                    <StyledTextArea onChange={onChange} required name={'description'} id={'description'}/>
                </label>
                <StyledFlexBox>
                    <label htmlFor={"rooms"}>
                        Rooms:
                        <StyledInput onChange={onChange} required type={"number"} name={'rooms'} id={'rooms'}/>
                    </label>
                    <label htmlFor={"bathrooms"}>
                        Bathrooms:
                        <StyledInput onChange={onChange} required type={"number"} name={'bathrooms'} id={'bathrooms'}/>
                    </label>
                </StyledFlexBox>
                <StyledFieldSet>
                    <legend>Address</legend>
                    <label htmlFor={'civicAddress'}>
                        Civic Address
                        <StyledInput onChange={onChange} type={"text"} name={'civicAddress'} id={'civicAddress'}
                                     required={true}/>
                    </label>
                    <label htmlFor={"street"}>
                        Street:
                        <StyledInput onChange={onChange} type={"text"} name={'area'} id={'area'}/>
                    </label>
                    <label htmlFor={'city'}>
                        City
                        <StyledInput onChange={onChange} required type={"text"} name={'city'} id={'city'}/>
                    </label>
                    <label htmlFor={'postalCode'}>
                        Postal Code
                        <StyledInput onChange={onChange} required type={"text"} name={'postalCode'} id={'postalCode'}/>
                    </label>
                    <label htmlFor={'province'}>
                        Province
                        <StyledSelect onChange={onChange} required name={'province'} id={'province'}>
                            <StyledOption value={'ALBERTA'}>
                                &nbsp;Alberta
                            </StyledOption>
                            <StyledOption value={'BRITISH_COLUMBIA'}>
                                &nbsp;British Columbia
                            </StyledOption>
                            <StyledOption value={'MANITOBA'}>
                                &nbsp;Manitoba
                            </StyledOption>
                            <StyledOption value={'NEW_BRUNSWICK'}>
                                &nbsp;New Brunswick
                            </StyledOption>
                            <StyledOption value={'NEWFOUNDLAND_AND_LABRADOR'}>
                                &nbsp;Newfoundland and Labrador
                            </StyledOption>
                            <StyledOption value={'NORTHWEST_TERRITORIES'}>
                                &nbsp;Northwestern Territories
                            </StyledOption>
                            <StyledOption value={'NOVA_SCOTIA'}>
                                &nbsp;Nova Scotia
                            </StyledOption>
                            <StyledOption value={'ONTARIO'}>
                                &nbsp;Ontario
                            </StyledOption>
                            <StyledOption value={'QUEBEC'}>
                                &nbsp;Quebec
                            </StyledOption>
                        </StyledSelect>
                    </label>
                </StyledFieldSet>
                <StyledFieldSet>
                    <legend>Type:</legend>
                    <input type={'radio'} name={'listingType'} value={'FOR_SALE'} onChange={onChange}/>
                    For Sale
                    <input type={'radio'} name={'listingType'} value={'FOR_RENT'} onChange={onChange}/>
                    For Rent
                </StyledFieldSet>
                <StyledFieldSet>
                    <legend>Building Type:</legend>
                    <input type={'radio'} name={'buildingType'} value={'CONDO'} onChange={onChange}/>
                    Condo
                    <input type={'radio'} name={'buildingType'} value={'OFFICE'} onChange={onChange}/>
                    Office
                </StyledFieldSet>
                <StyledFieldSet>
                    <legend>Property Type:</legend>
                    <input type={'radio'} name={'propertyType'} value={'SINGLE_FAMILY'} onChange={onChange}/>
                    SINGLE_FAMILY
                    <input type={'radio'} name={'propertyType'} value={'MULTIPLE_FAMILY'} onChange={onChange}/>
                    MULTIPLE_FAMILY
                </StyledFieldSet>
                <label htmlFor={"builtYear"}>
                    Built Year:
                    <StyledInput onChange={onChange} type={'number'} name={'builtYear'} id={'builtYear'}/>
                </label>
                <label htmlFor={"storeys"}>
                    Storeys:
                    <StyledInput onChange={onChange} required type={'number'} name={'storeys'} id={'storeys'}/>
                </label>
                <label htmlFor={"neighbourhoodName"}>
                    Neighbourhood Name:
                    <StyledInput onChange={onChange} required type={'text'} name={'neighbourhoodName'} id={'neighbourhoodName'}/>
                </label>
                <ButtonBox>
                    <StyledButton type={"submit"}>Submit</StyledButton>
                    <StyledButton onClick={onCancel}>Cancel</StyledButton>
                </ButtonBox>
            </Form>
        </FormWrapper>
    )
}

const sharedStyle = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
`

const FormWrapper = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
`

const Form = styled.form`
  max-height: 90vh;
  width: 100%;
  max-width: 700px;
  padding: 40px;
  background-color: white;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
  margin: 120px 20px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none; 
`

const StyledFieldSet = styled.fieldset`
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 20px 0;
  padding: 10px;

  legend {
    padding: 0 10px;
  }

  label {
    padding-right: 20px;
  }

  input {
    margin-right: 10px;
  }
`

const StyledInput = styled.input`
  width: 100%;
  display: block;
  ${sharedStyle}
`

const StyledTextArea = styled.textarea`
  width: 100%;
  display: block;
  resize: none;
  ${sharedStyle};
  min-height: 100px;
`

const StyledFlexBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20%;
  label {
    width: 40%;
  }
`

const StyledOption = styled.option`
`

const StyledSelect = styled.select`
  display: block;
  width: 100%;
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  // padding: 20px;
  //box-sizing: border-box;
  //-webkit-appearance: none;
  //-moz-appearance: none;
  //appearance: none;
  //padding: 5px;
`

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  //align-content: space-between;
  justify-content: space-between;
`

const StyledButton = styled.button`
  //display: block;
  background-color: darkslategray;
  color: white;
  border: 0px;
  border-radius: 5px;
  height: 40px;
  width: 30%;
  box-sizing: border-box;
  cursor: pointer;
`

export default CreateForm;