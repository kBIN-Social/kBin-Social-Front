import React, { useState, useEffect } from 'react';
import { useToken, useUser } from '../Logic/UserContext';

function ThreadTemplate({ thread, user, updateThread }) {
  const token = useToken();
  const authUser = useUser();
  const [userData, setUserData] = useState({});
  const [magazineData, setMagazineData] = useState({});
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser(token);
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      try {
        const magazineData = await getMagazine(token);
        setMagazineData(magazineData);
      } catch (error) {
        console.error('Error fetching magazine data:', error);
      }
      try {
        const commentsData = await getComments(token);
        setCommentsData(commentsData);
      } catch (error) {
        console.error('Error fetching comments data:', error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  async function getUser(token) {
    const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/profile/${thread.author}`, {
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

  async function getMagazine(token) {
    const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/magazines/${thread.magazine}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error fetching magazine data');
    }
    return response.json();
  }

  async function getComments(token) {
    const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/threads/${thread.id}/comments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error fetching comments data');
    }
    return response.json();
  }

  async function doLike() {
    try {
      const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/threads/${thread.id}/like_thread/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error liking thread');
      }
      const updatedThread = await response.json();
      updateThread(updatedThread);
    } catch (error) {
      console.error('Error in doLike:', error);
    }
  }

  async function doDislike() {
    try {
      const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/threads/${thread.id}/dislike_thread/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error disliking thread');
      }
      const updatedThread = await response.json();
      updateThread(updatedThread);
    } catch (error) {
      console.error('Error in doDislike:', error);
    }
  }

  async function doBoost() {
    try {
      const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/threads/${thread.id}/boost_thread/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error boosting thread');
      }
      const updatedThread = await response.json();
      updateThread(updatedThread);
    } catch (error) {
      console.error('Error in doBoost:', error);
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
            onClick={doLike}
            title="Favorito"
            aria-label="Favorito"
            data-action="subject#vote"
          >
            <span>{thread.likes.length}</span> <span>👍</span>
          </button>
        </div>
        <div className="vote__down">
          <button
            onClick={doDislike}
            title="Dislike"
            aria-label="Dislike"
            data-action="subject#vote"
          >
            <span>{thread.dislikes.length}</span> <span>👎</span>
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

export default ThreadTemplate;
