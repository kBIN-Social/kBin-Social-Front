import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToken,useUser } from '../Logic/UserContext';
import Header from '../Components/Header';
import OptionBar from '../Components/OptionBar';
import ThreadTemplate from '../Components/ThreadTemplate'

export default function MagazineDetail() {
    const { id } = useParams();
    //console.log(`token: ${token}`) ;
    const [posts, setPosts] = useState([]);
    const [magazine, setMagazine] = useState([]);
    const deployUrl = "https://asw-kbin.azurewebsites.net"
    const [sub, setSub] = useState(false)
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        async function getMagazineData() {
            const endPoint = deployUrl + `/api/v1/magazines/${id}`;
            const response = await fetch(endPoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.content)
            if (!response.ok) {
                throw new Error('Error fetching magazine data');
            }
            const result = await response.json()
            return result;
        }
    
        async function getMagazinePosts() {
            const endPoint = deployUrl + `/api/v1/magazines/${id}/threads`;
            const response = await fetch(endPoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.content)
            if (!response.ok) {
                throw new Error('Error fetching magazine data');
            }
            return response.json();
        }    
        const fetchCommentData = async () => {
            try {
                const MagazineData = await getMagazineData();
                const MagazinePost = await getMagazinePosts();
                const postlist = []
                MagazinePost.forEach(element => {
                    postlist.push(
                    <ThreadTemplate thread={element} user={null} updateThread={setCounter}/>
    )});
                setMagazine(MagazineData);
                setPosts(postlist)
            } catch (error) {
                console.error('Error fetching comments or user data:', error);
            }
        };
        fetchCommentData();
    }, [id, sub]);
    
   
    return (
        <div className="theme--dark">
            <Header/>
        <div className='section'>
                        <header>
                            <h4><a href={`/magazines/${id}`} >{magazine.title}</a></h4>
                            <p className="magazine__name">
                            {magazine.name}
                            </p>
                        </header> 
                        <div>
                        <p>Threads <span>{magazine.num_threads}</span></p>
                        <p>Comments <span>{magazine.num_comments}</span></p>
                        </div>
                        <div className="action">
                            <i className="fa-solid fa-users"></i><span> 👥{magazine.num_subscriptors}</span>
                        </div>
                        <SubButton magazine={magazine} setSub={setSub}/>
                        <div className="content magazine__description">
                        <h3>About Community</h3>
                        <p>{magazine.description}</p>
                        <h3 className="mt-3">Rules</h3>
                        </div>
                    <div className="content magazine__rules">
                        <p>{magazine.rules}</p>
                    </div>
                    
        </div>
        <OptionBar setOrderState={setCounter} setFilterState={setCounter}/>
        {posts}
        </div>
    );
}
/*<ul>        
            {listComments}
            </ul>*/

function SubButton({ magazine, setSub}) {
    const user = useUser();
    const token = useToken();
    const handleSubscribe = async () => {
        try {
            await fetch(`https://asw-kbin.azurewebsites.net/api/v1/magazines/${magazine.id}/subscribers/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
            
            setSub(prev => !prev);
        } catch (error) {
            console.error('Error subscribing to magazine:', error);
        }
    };

    const handleUnSubscribe = async () => {
        try {
            await fetch(`https://asw-kbin.azurewebsites.net/api/v1/magazines/${magazine.id}/subscribers/me`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
            setSub(prev => !prev);
        } catch (error) {
            console.error('Error unsubscribing from magazine:', error);
        }
    };
    
    const isSubscribed = Array.isArray(magazine.subscribers) && user && magazine.subscribers.includes(user.id);
    console.log(isSubscribed)
    return isSubscribed ? (
        <button className="btn btn__secondary action" onClick={handleUnSubscribe}>
            <i className="fa-sharp fa-solid fa-folder-plus"></i><span>Unsubscribe</span>
        </button>
    ) : (
        <button type="submit" className="btn btn__secondary action" onClick={handleSubscribe}>
            <i className="fa-sharp fa-solid fa-folder-plus"></i><span>Subscribe</span>
        </button>
    );
}
