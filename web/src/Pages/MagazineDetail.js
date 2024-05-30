import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToken,useUser } from '../Logic/UserContext';

export default function MagazineDetail() {
    const { id } = useParams();
    //console.log(`token: ${token}`) ;
    const [posts, setPosts] = useState([]);
    const [magazine, setMagazine] = useState([]);
    const deployUrl = "https://asw-kbin.azurewebsites.net"

    useEffect(() => {
        const fetchCommentData = async () => {
            try {
                const MagazineData = await getMagazineData();
                const MagazinePost = await getMagazinePosts();
                setMagazine(MagazineData);
                setPosts(MagazinePost)
            } catch (error) {
                console.error('Error fetching comments or user data:', error);
            }
        };
        fetchCommentData();
    }, [id]);

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
    return (
        <div id="magazine_detail">
                        <header>
                            <h4><a href={`/magazines/${id}`} >{magazine.title}</a></h4>
                            <p className="magazine__name">
                            {magazine.name}
                            </p>
                        </header> 
                        <div className="action">
                            <i className="fa-solid fa-users"></i><span>{magazine.num_subscriptors}</span>
                        </div>
                        <SubButton magazine={magazine} />
                        <div className="content magazine__description">
                        <h3>About Community</h3>
                        <p>{magazine.description}</p>
                        <h3 className="mt-3">Rules</h3>
                    <div className="content magazine__rules">
                        <p>{magazine.rules}</p>
                    </div>
                        
                    </div>
                        <p>Threads <span>{magazine.num_threads}</span></p>
                        <p>Comments <span>{magazine.num_comments}</span></p>
        </div>
    );
}
/*<ul>        
            {listComments}
            </ul>*/
function SubButton({ magazine }) {
    const user = useUser();
    const token = useToken();

    const handleSubscribe = async () => {
        try {
            await fetch(`https://asw-kbin.azurewebsites.net/api/v1/magazines/${magazine.id}/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
            // Optionally update state here to reflect subscription
        } catch (error) {
            console.error('Error subscribing to magazine:', error);
        }
    };

    const handleUnSubscribe = async () => {
        try {
            await fetch(`https://asw-kbin.azurewebsites.net/api/v1/magazines/${magazine.id}/subscribe/me`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
            // Optionally update state here to reflect unsubscription
        } catch (error) {
            console.error('Error unsubscribing from magazine:', error);
        }
    };

    const isSubscribed = Array.isArray(magazine.subscribers) && magazine.subscribers.includes(user);

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

