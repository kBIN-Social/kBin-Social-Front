//import ProfileContent from "../Components/ProfileContent";
//import ProfileHead from "../Components/ProfileHead";
import Header from "../Components/Header";
//import { useToken } from '../Logic/UserContext';
import { useUser } from '../Logic/UserContext';
import React, { useState } from 'react';
//import {useEffect } from 'react';
//import { useParams } from 'react-router-dom';


function ListMagazines() {
    //const token = useToken();
    //const { id } = useParams();
    const user= useUser() ;
    const [magazines, setMagazines] = useState([]);
    //const [magazines_order, setMagOrder] = useState(null)

    //useEffect(() => {
        const fetchMagazines =  async () => {
            try {
                const mag = await getMagazines();
                setMagazines(mag);
                console.log('magazines[0]');
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchMagazines();
    //}, [magazines_order]);

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
        return response.json();
    }
    
    fetchMagazines();
    const subbutton = (user, magazine) =>{
        if (user in magazine.subscribers){ 
            return(
            
                <button type="submit" class="btn btn__secondary action">
                    <i class="fa-sharp fa-solid fa-folder-plus"></i><span>Unsubscribe</span>
                </button>
            )}
            else{
            return(
                <button type="submit" class="btn btn__secondary action">
                    <i class="fa-sharp fa-solid fa-folder-plus"></i><span>Subscribe</span>
                </button>
            )}
    }
    const magazinelist = magazines.map((magazine) => (
        <tr key={magazine.id}>
            <td><a href={`/magazines/${magazine.id}`} className="magazine-inline stretched-link">{magazine.title}</a></td>
            <td>{magazine.num_threads}</td>
            <td>{magazine.num_comments}</td>
            <td>
                <aside className="magazine__subscribe">
                    <div class="action">
                        <i className="fa-solid fa-users"></i><span>{magazine.num_subscriptors}</span>
                    </div>
                    {subbutton (user,magazine)}
                </aside>
                     </td>
                 </tr>                   
             ))
    return (
            <div className="theme--dark" >  
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
                    <tbody >
                        {magazinelist}
                    </tbody>
                </table>
            </div>
        );
    }

export default ListMagazines;