import ProfileContent from "../Components/ProfileContent";
import ProfileHead from "../Components/ProfileHead";
import ProfileHeader from "../Components/ProfileHeader";
import { useToken } from './TokenContext';

function Profile() {
    const { token } = useToken();

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