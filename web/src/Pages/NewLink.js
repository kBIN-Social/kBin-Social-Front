import NewLinkForm from "../Components/NewLinkForm";
import Header from "../Components/Header";
import React from 'react';

function NewLink() {

    return (
        <div className="theme--dark" data-controller="kbin notifications" data-turbo="false">
            <React.Fragment>
                <Header />
                <NewLinkForm/>
            </React.Fragment>
        </div>
      );
    }

export default NewLink;