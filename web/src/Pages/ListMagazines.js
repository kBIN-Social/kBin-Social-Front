//import ProfileContent from "../Components/ProfileContent";
//import ProfileHead from "../Components/ProfileHead";
import Header from "../Components/Header";
import { useToken } from '../Logic/UserContext';
import { useUser } from '../Logic/UserContext';
import React, { useState } from 'react';
import {useEffect } from 'react';
//import { useParams } from 'react-router-dom';


function ListMagazines() {
    const user = useUser();
    const token = useToken();
    //const { id } = useParams();
    const [magazines, setMagazines] = useState([]);
    const [magazines_order, setMagOrder] = useState(null)

    useEffect(() => {
        const fetchMagazines =  async () => {
            try { 
                const mag = await getMagazines();
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
                    <div class="action">
                        <i className="fa-solid fa-users"></i><span>{magazine.num_subscriptors}</span>
                    </div>
                    {subbutton (magazine, user, token)}
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
                    {{magazinelist}}
                    </tbody>
                </table>
            </div>
        );
    }
export default ListMagazines;

async function subbutton (magazine, user, token) {
    const subscribe = ()=>{
        const response = fetch(`https://asw-kbin.azurewebsites.net/api/v1/magazines/${magazine.id}/subscribe`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
              },
            });
            if (!response.ok) {
              throw new Error('Error fetching magazines');
            }
            return response.json();
    }
    const unSubscribe = ()=>{
        const response = fetch(`https://asw-kbin.azurewebsites.net/api/v1/magazines/${magazine.id}/subscribe/me`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
              },
            });
            if (!response.ok) {
              throw new Error('Error fetching magazines');
            }
            return response.json();
    }
    if (user in magazine.subscribers){ 
        return(
            
            <button className="btn btn__secondary action" onClick={(e)=>{
                e.preventDefault()
                unSubscribe()
            }}>
                <i class="fa-sharp fa-solid fa-folder-plus"></i><span>Unsubscribe</span>
            </button>
        )}
        else{
        return(
            <button type="submit" class="btn btn__secondary action"onClick={(e)=>{
                e.preventDefault()
                subscribe()
            }}>
                <i class="fa-sharp fa-solid fa-folder-plus"></i><span>Subscribe</span>
            </button>
        )}
}