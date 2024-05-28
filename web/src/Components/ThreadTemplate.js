import React from 'react';
import { useState, useEffect } from 'react';
import { useToken, useUser } from '../Logic/UserContext';

function Thread({ thread }, {user}) {
const token = useToken();
  const authUser = useUser();
  const [userData, setUserData] = useState([]);
  const [magazineData, setMagazineData] = useState([]);
  const [commentsData, setCommentsData] = useState([])

  useEffect(() => {
    const fetchData = async () => {

        try {
          const userData = await getUser(user, token);
          setUserData(userData);
        } catch (error) {
          console.error('Error fetching threads:', error);
        }
        try {
            const magazineData = await getMagazine(user, token);
            setMagazineData(magazineData);
          } catch (error) {
            console.error('Error fetching threads:', error);
          }
        try {
        const commentsData = await getComments(user, token);
        setCommentsData(commentsData);
        } catch (error) {
        console.error('Error fetching threads:', error);
        }
    }
    if (token) {
        fetchData();
    }
    console.log(user)
    console.log(authUser)
}, [user, token]);


async function getUser(user, token) {
    const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/profile/${thread.author}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error fetching threads');
    }
    return response.json();
}

async function getMagazine(user, token) {
    const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/magazines/${thread.magazine}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error fetching threads');
    }
    return response.json();
}

async function getComments(user, token) {
    const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/threads/${thread.id}/comments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error fetching threads');
    }
    return response.json();
}

async function doLike(user, token) {
    const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/threads/${thread.id}/like_thread/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error fetching threads');
    }
    return response.json();
}

async function doDislike(user, token) {
    const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/threads/${thread.id}/dislike_thread/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error fetching threads');
    }
    return response.json();
}

async function doBoost(user, token) {
    try{
        const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/threads/${thread.id}/boost_thread/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        });
        if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error('Error fetching threads');
        }
        return response.json();
    }
    catch(error){
        console.error('Error in doBoost:', error);
        throw error;
    }
}


  return (
    <article className="entry section subject no-image">
      <header>
        <h2>
          <a href={`/threads/${thread.id}/`}>
            {thread.titol}
          </a>
          {thread.isLink && (
            <span className="entry__domain">
              (<a rel="nofollow noopener noreferrer" href={thread.url}>
                {thread.url}
              </a>)
            </span>
          )}
        </h2>
      </header>
      <aside className="meta entry__meta">
        <a href={`/profile/${thread.author}`} className="user-inline" title={userData.username}>
          {userData.username}
        </a>,
        <time className="timeago" dateTime={thread.created_at}>
          {new Date(thread.created_at).toLocaleString()}
        </time>
        a <a href={`/magazines/${thread.magazine}`} className="magazine-inline" title={magazineData.nom}>
          {magazineData.nom}
        </a>
      </aside>
      <aside className="vote">
        <div className="vote__up">
                <button
                onClick={() => doLike()}
                title="Favorito"
                aria-label="Favorito"
                data-action="subject#vote"
                >
                <span>{thread.likes.length}</span> <span><i className="fa-solid fa-arrow-up"></i></span>
                </button>
            </div>
            <div className="vote__down">
                <button
                onClick={() => doDislike()}
                title="Dislike"
                aria-label="Dislike"
                data-action="subject#vote"
                >
                <span>{thread.dislikes.length}</span> <span><i className="fa-solid fa-arrow-down"></i></span>
                </button>
            </div>
      </aside>
      <footer>
        <menu>
          <li>
            <a href={`/threads/${thread.id}`}>
              <span>{commentsData.length}</span> comentarios
            </a>
          </li>
          <li>   
            <button onClick={doBoost} type="submit" className="boost-link">
            impulsar ({thread.boost.length})
            </button>
          </li>
        </menu>
      </footer>
    </article>
  );
}

export default Thread;
