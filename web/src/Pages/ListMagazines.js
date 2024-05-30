//import ProfileContent from "../Components/ProfileContent";
//import ProfileHead from "../Components/ProfileHead";
import Header from "../Components/Header";
import { useToken } from '../Logic/UserContext';
import { useUser } from '../Logic/UserContext';
import React, { useState } from 'react';
import {useEffect } from 'react';
//import { useParams } from 'react-router-dom';


function ListMagazines() {
    
    //const { id } = useParams();
    const [magazines, setMagazines] = useState([]);
    const [magazines_order, setMagOrder] = useState(null)

    useEffect(() => {
        const fetchMagazines =  async () => {
            try { 
                const mag = await getMagazines();
                console.log(mag)
                setMagazines(mag);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchMagazines();
    }, [magazines_order]);

    async function getMagazines(magazines_order) {
        const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/magazines`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (!response.ok) {
          throw new Error('Error fetching magazines');
        }
        const result = await response.json()
        return result;
    }
    
    const magazinelist = []
    magazines.forEach((magazine, index) =>{
        console.log(magazine)
        magazinelist.push(
        <tr key={magazine.id}>
            <td><a href={`/magazines/${magazine.id}`} className="magazine-inline stretched-link">{magazine.title}</a></td>
            <td>{magazine.num_threads}</td>
            <td>{magazine.num_comments}</td>
            <td>
                <aside className="magazine__subscribe">
                    <div className="action">
                        <i className="fa-solid fa-users"></i><span>{magazine.num_subscriptors}</span>
                    </div>
                    <SubButton magazine={magazine} />
                </aside>
            </td>
        </tr>                  
    )});
    return (
            <div>  
                <Header/>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>
                                <a href="/magazines/?threads">
                                    Threads
                                </a>
                            </th>
                            <th>
                                <a href="/magazines/?comments">
                                    Comments
                                </a>
                            </th>
                            <th>
                                <a href="/magazines/?subscriptors">
                                Subscriptions</a>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {magazinelist}
                    </tbody>
                </table>
            </div>
        );
    }
export default ListMagazines;

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
