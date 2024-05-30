//import ProfileContent from "../Components/ProfileContent";
//import ProfileHead from "../Components/ProfileHead";
import Header from "../Components/Header";
import { useToken } from '../Logic/UserContext';
import { useUser } from '../Logic/UserContext';
import React, { useState} from 'react';
import {useContext, useEffect } from 'react';
//import { useParams } from 'react-router-dom';


function ListMagazines() {
    
    const [magazines, setMagazines] = useState([]);
    const [magazinesOrder, setMagOrder] = useState(null)
    const [sub, setSub] = useState(false)
    useEffect(() => {
        async function getMagazines() {
            var addr = `https://asw-kbin.azurewebsites.net/api/v1/magazines`;
            if(magazinesOrder) {
                addr=addr.concat(`?order_by=${magazinesOrder}`)
            }
            const response = await fetch(addr, {
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

        const fetchMagazines =  async () => {
            try { 
                const mag = await getMagazines();
                setMagazines(mag);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchMagazines();
    }, [magazinesOrder, sub]);

   
    
    const magazinelist = []
    magazines.forEach((magazine, index) =>{
        magazinelist.push(
        <tr key={magazine.id}>
            <td><a href={`/magazines/${magazine.id}`} className="magazine-inline stretched-button">{magazine.title}</a></td>
            <td>{magazine.num_threads}</td>
            <td>{magazine.num_comments}</td>
            <td>
                <aside className="magazine__subscribe">
                    <div className="action">
                      <span> 👥{magazine.num_subscriptors}</span>
                    </div>
                    <SubButton magazine={magazine} setSub={setSub} />
                </aside>
            </td>
        </tr>                  
    )});
    return (
        <div className="theme--dark">
        <React.Fragment>
        <Header/>
        </React.Fragment>
            <div className="section">  
                
                <table >
                    <thead>
                        <tr>
                            <th><button className='button-link' onClick={(e)=>{
                                    e.preventDefault()
                                    if(magazinesOrder )
                                    setMagOrder(null)
                                }}>
                                    Name </button></th>
                            <th>
                                <button className={magazinesOrder === 'threads' ? 'highlightClass' : 'button-link'} onClick={(e)=>{
                                    e.preventDefault()
                                    if(magazinesOrder !== 'threads')
                                    setMagOrder('threads')
                                }}>
                                    Threads
                                </button>
                            </th>
                            <th>
                            <button className={magazinesOrder === 'comments' ? 'highlightClass' : 'button-link'} onClick={(e)=>{
                                    e.preventDefault()
                                    if(magazinesOrder !== 'comments')
                                    setMagOrder('comments')
                                }}>
                                    Comments
                                </button>
                            </th>
                            <th>
                            <button className={magazinesOrder === 'suscriptors' ? 'highlightClass' : 'button-link'} onClick={(e)=>{
                                    e.preventDefault()
                                    if(magazinesOrder !== 'suscriptors')
                                    setMagOrder('suscriptors')
                                }}>
                                Subscriptions</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {magazinelist}
                    </tbody>
                </table>
            </div>
            </div>
        );
    }
export default ListMagazines;

function SubButton({ magazine, setSub}) {
    const user = useUser();
    const token = useToken();
    //const [loading, setLoading] = useState(false);
    const handleSubscribe = async () => {
        try {
            /*if(loading) return;
            setLoading(true);*/
            
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
        /*finally {
            setLoading(false);
        }*/
    };

    const handleUnSubscribe = async () => {
        try {
            /*if(loading) return;
            setLoading(true);*/
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
        /*finally {
            setLoading(false);
        }*/
    };
    
    const isSubscribed = Array.isArray(magazine.subscribers) && user && magazine.subscribers.includes(user.id);
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
