import ProfileForm from "../Components/ProfileForm";
import ProfileHeader from "../Components/ProfileHeader";

function ProfileEdit() {
    const { token } = useToken();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserData(token);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        if (token) {
            fetchUserData();
        }
    }, [token]);

    async function getUserData(token) {
        const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/profile/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Error fetching user data');
        }
        return response.json();
    }
    
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