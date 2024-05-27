import React, { useState, useEffect } from 'react';
import { useToken, useUser } from '../Logic/UserContext';

function TokenSmall({ token }){
  return token ? <small>{`ApiKey: Token ${token}`}</small> : null;
}

function ThreadContent({user}) {
  const token = useToken();
  const authUser = useUser();
  const [threads, setThreads] = useState([]);
  const [comments, setComments] = useState([]);
  const [boosts, setBoosts] = useState([]);
  const [filterState, setFilterState] = useState('top');
  const [elementState, setElementState] = useState('threads');
  const [threadState, setThreadState] = useState('all');
  
  useEffect(() => {
    const fetchData = async () => {

        try {
          const threadsData = await getThreads(user, token);
          setThreads(threadsData);
        } catch (error) {
          console.error('Error fetching threads:', error);
        }
        try {
          const commentsData = await getUserComments(user, token);
          setComments(commentsData);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
        try {
          const boostsData = await getUserBoosts(user, token);
          setBoosts(boostsData);
        } catch (error) {
          console.error('Error fetching boosts:', error);
        }
    }
    if (token) {
        fetchData();
    }
    console.log(user)
    console.log(authUser)
}, [user, token]);

async function getThreads(user, token) {
    const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/threads?order_by=recent&filter_by=all`, {
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

async function getUserComments(user, token) {
  const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/profile/${user.id}/comments?order_by=top`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Error fetching comments');
  }
  return response.json();
}

async function getUserBoosts(user, token) {
  const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/profile/${user.id}/boosts?order_by=top`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Error fetching comments');
  }
  return response.json();
}

  return (
<div data-controller="subject-list" data-action="notifications:EntryCreatedNotification@window->subject-list#increaseCounter">
  <article className="entry section subject no-image" id="entry-1057466" data-controller="subject preview mentions" data-action="notifications:Notification@window->subject#notification">
        <header>
          <h2>
            <a href="/m/greentext@sh.itjust.works/t/1057466/Anon-figures-out-how-dieting-works">
              Anon figures out how dieting works
            </a>
            <span className="entry__domain">
              (<a rel="nofollow noopener noreferrer" href="https://sh.itjust.works/pictrs/image/8939db52-872d-4685-8460-014ca4f9d6ea.jpeg">
                sh.itjust.works
              </a>)
            </span>
          </h2>
        </header>
        <aside className="meta entry__meta">
          <a href="/u/@Early_To_Risa@sh.itjust.works" data-action="mouseover->mentions#user_popup mouseout->mentions#user_popup_out" data-mentions-username-param="@Early_To_Risa@sh.itjust.works" className="user-inline" title="@Early_To_Risa@sh.itjust.works">
            Early_To_Risa
          </a>,
          <time className="timeago" title="2024-05-27T04:22:27+00:00" dateTime="2024-05-27T04:22:27+00:00" timeago-id="43">
            hace 17 horas
          </time>
          a <a href="/m/greentext@sh.itjust.works" className="magazine-inline" title="@greentext@sh.itjust.works">
            greentext
          </a>
        </aside>
        <aside className="vote">
          <form method="post" action="/ef/1057466?choice=0" className="vote__up">
            <button type="submit" title="Favorito" aria-label="Favorito" data-action="subject#vote">
              <span data-subject-target="favCounter">42</span> 
              <span><i className="fa-solid fa-arrow-up"></i></span>
            </button>
            <input type="hidden" name="token" value="4e9d516.xjzO3ziHQ_WbtO86UexplWz9dMmZSmtvoUaoDi8RGW4.jHORgGrQFYT3gtloNNs78SOSFoDPAiw19w2bSxxSfgqUWoaMa8Z3ps38mA" />
          </form>
          <form method="post" action="/ev/1057466/0" className="vote__down">
            <button type="submit" title="Votos negativos" aria-label="Votos negativos" data-action="subject#vote" className="vote__up">
              <span data-subject-target="downvoteCounter">0</span> 
              <span><i className="fa-solid fa-arrow-down"></i></span>
            </button>
            <input type="hidden" name="token" value="8f2875e2d4.Ca0Rx7fJy6WuNmrkXxb9ls2k08b-GBgMvqZOnbF7f-M.Uf4mjc-5lMf7QAWgMTuc96b0m6KqdG5-6sw36YkCMrFR5H-S0_my7PwGDQ" />
          </form>
        </aside>
        <footer>
          <menu>
            <li>
              <button className="show-preview" data-action="preview#show" aria-label="Vista previa" data-preview-url-param="https://sh.itjust.works/pictrs/image/8939db52-872d-4685-8460-014ca4f9d6ea.jpeg" data-preview-ratio-param="">
                <i className="fa-solid fa-photo-film"></i>
              </button>
            </li>
            <li>
              <a className="stretched-link" href="/m/greentext@sh.itjust.works/t/1057466/Anon-figures-out-how-dieting-works#comments">
                <span data-subject-target="commentsCounter">0</span> comentarios
              </a>
            </li>
            <li>
              <form method="post" action="/eb/1057466">
                <input type="hidden" name="token" value="5c2de98e53068774ff716361c.ODlFB3jE-D0F87Fsof2bi3WVwQSu9PJwxUxOBL8d0ek.QHwSQiKXlnBklcsNjJOowSDMuFXixbEXh3U0SP5wqLgJfhVlCq7JRDXe0g" />
                <button className="boost-link stretched-link" type="submit" data-action="subject#favourite">
                  impulsar <span className="hidden" data-subject-target="upvoteCounter">(0)</span>
                </button>
              </form>
            </li>
            <li className="dropdown">
              <button className="stretched-link" data-subject-target="more">otros</button>
              <ul className="dropdown__menu" data-controller="clipboard">
                <li>
                  <a href="/er/1057466" className="" data-action="subject#getForm">
                    reportar
                  </a>
                </li>
                <li>
                  <a href="/m/greentext@sh.itjust.works/t/1057466/Anon-figures-out-how-dieting-works/votes/up" className="">
                    actividad
                  </a>
                </li>
                <li>
                  <a href="/d/sh.itjust.works">más del dominio</a>
                </li>
                <hr />
                <li>
                  <a data-action="clipboard#copy" href="/m/greentext@sh.itjust.works/t/1057466/Anon-figures-out-how-dieting-works">
                    copia la url de /kbin
                  </a>
                </li>
                <li>
                  <a data-action="clipboard#copy" href="https://sh.itjust.works/post/19945164">
                    copia la url original
                  </a>
                </li>
                <li>
                  <a href="https://sh.itjust.works/post/19945164" target="_blank">
                    open original url
                  </a>
                </li>
              </ul>
            </li>
            <li data-subject-target="loader" style={{ display: "none" }}>
              <div className="loader" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </li>
          </menu>
          <div data-subject-target="container" className="js-container"></div>
        </footer>
      </article>
      </div>
  );
}

export default ThreadContent
