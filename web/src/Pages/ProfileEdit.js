import ProfileForm from "../Components/ProfileForm";
import ProfileHeader from "../Components/ProfileHeader";
import React from 'react';

function ProfileEdit() {

    return (
        <div className="theme--dark" data-controller="kbin notifications" data-turbo="false">
            <React.Fragment>
                <ProfileHeader />
                <ProfileForm  />
            </React.Fragment>
        </div>
      );
    }

export default ProfileEdit;