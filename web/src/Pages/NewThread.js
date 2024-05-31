import NewThreadForm from "../Components/NewThreadForm";
import Header from "../Components/Header";
import React from 'react';

function NewThread() {

    return (
        <div className="theme--dark" data-controller="kbin notifications" data-turbo="false">
            <React.Fragment>
                <Header />
                <NewThreadForm/>
            </React.Fragment>
        </div>
      );
    }

export default NewThread;