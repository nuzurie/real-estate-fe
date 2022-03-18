import CreateForm from "../../public/components/CreateForm";
import styled from "styled-components";
import {Fragment, useState} from "react";

function CreatePage() {
    const [shownCreate, setShownCreate] = useState(true);

    return (
        <Fragment>
            <button onClick={() => setShownCreate(!shownCreate)}>Show</button>
            <CreateModal isShown={shownCreate} onCancel={() => setShownCreate(false)}/>
        </Fragment>
    )
}

const CreateModal = styled(CreateForm)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 50px;
  z-index: 1000;
`

export default CreatePage;