import ProfileForm from "../Components/ProfileForm";
import Header from "../Components/Header";
import React from 'react';

function ProfileEdit() {

    return (
        <div className="theme--dark" data-controller="kbin notifications" data-turbo="false">
            <React.Fragment>
                <Header />
                <ProfileForm  />
            </React.Fragment>
        </div>
      );
    }

export default ProfileEdit;