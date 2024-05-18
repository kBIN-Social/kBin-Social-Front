import ProfileForm from "../Components/ProfileForm";
import ProfileHeader from "../Components/ProfileHeader";

function ProfileEdit() {
    return (
        <div>
            <body class="theme--dark" data-controller="kbin notifications" data-turbo="false">
                <ProfileHeader/>
                <ProfileForm/>
            </body>
        </div>
      );
    }

export default ProfileEdit;