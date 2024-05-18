import ProfileContent from "../Components/ProfileContent";
import ProfileHead from "../Components/ProfileHead";
import ProfileHeader from "../Components/ProfileHeader";

function Profile() {
    return (
        <div>
            <body class="theme--dark" data-controller="kbin notifications" data-turbo="false">  
                <ProfileHeader/>
                <ProfileContent/>
            </body>
        </div>
      );
    }

export default Profile;