import React, { useState, useEffect } from 'react';
import { useToken, useUser } from '../Logic/UserContext';

function TokenSmall({ token }){
  return token ? <small>{`ApiKey: Token ${token}`}</small> : null;
}

function ProfileContent({user}) {
  const token = useToken();
  const authUser = useUser();
  const [threads, setThreads] = useState([]);
  const [comments, setComments] = useState([]);
  const [threadsBoosts, setThreadsBoosts] = useState([]);
  const [commentsBoosts, setCommentsBoosts] = useState([]);
  const [filterState, setFilterState] = useState('top');
  const [elementState, setElementState] = useState('threads');
  const [threadState, setThreadState] = useState('all');
  
  useEffect(() => {
    const fetchData = async () => {

        try {
          const threadsData = await getUserThreads(user, token);
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
          const boostsThreadsData = await getUserBoostsThreads(user, token);
          setThreadsBoosts(boostsThreadsData);
        } catch (error) {
          console.error('Error fetching boostsThreadsData:', error);
        }
        try {
          const boostsCommentsData = await getUserBoostsComments(user, token);
          setCommentsBoosts(boostsCommentsData);
        } catch (error) {
          console.error('Error fetching boostsCommentsData:', error);
        }
    }
    if (token) {
        fetchData();
    }
    console.log(user)
    console.log(authUser)
}, [user, token, filterState, elementState, threadState]);

async function getUserThreads(user, token) {
    const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/profile/${user.id}/threads?order_by=${filterState}&filter_by=${threadState}`, {
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
  const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/profile/${user.id}/comments?order_by=${filterState}`, {
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

async function getUserBoostsThreads(user, token) {
  const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/profile/${user.id}/boosts/threads?order_by=${filterState}&filter_by=${threadState}`, {
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

async function getUserBoostsComments(user, token) {
  const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/profile/${user.id}/boosts/comments?order_by=${filterState}`, {
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
<div id="middle" className="page-user page-user-overview">
  <div className="kbin-container">
    <main id="main" data-controller="lightbox timeago" className="view-compact">
      <div className="section section--top">
        <div className="user-box">
          <div className="with-cover with-avatar">
              <img height="220" width="100%" className="cover" src={user.cover}/>
              <div className="user-main" id="content">
                  <div>
                      <div className="row">
                          <figure>
                          <img width="100" height="100" style={{maxWidth: '100px', maxHeight: '100px'}} src={user.avatar}/>
                          </figure>
                          <h1>{user.username}</h1>
                          <TokenSmall/>
                      </div>
                  </div>
              </div>
              <div className="about">
                <div className="content">
                  <p>{user.description}</p>
                </div>
              </div>
          </div>
        </div>
      </div>
      <aside className="options" id="options">
        <div></div>
        <menu className="options__main">
          <li>
            <a href="#" onClick={(e)=>{
              e.preventDefault();
              setElementState("threads")
            }} className={elementState === "threads" ? "active" : ""}>
              {`threads (${threads.length})`}
            </a>
          </li>
          <li>
            <a href="#" onClick={(e)=>{
              e.preventDefault();
              setElementState("comments")
            }} className={elementState === "comments" ? "active" : ""}>
              {`comments (${comments.length})`}
            </a>
          </li>
          { (user.id == authUser.id) ? (
            <li>
            <a href="#" onClick={(e)=>{
              e.preventDefault();
              setElementState("boosts")
            }} className={elementState === "boosts" ? "active" : ""}>
              {`boosts (${threadsBoosts.length + commentsBoosts.length})`}
            </a>
          </li>)
          : 
            null
        }

        </menu>
      </aside>
      <aside className="options options--top" id="options">
        <div></div>
        <menu className="options__main no-scroll">
          <li>
            <a href="#" onClick={(e)=>{
              e.preventDefault();
              setFilterState("top")
            }} className={filterState === "top" ? "active" : ""}>
              top
            </a>
          </li>
          <li>
          <a href="#" onClick={(e)=>{
              e.preventDefault();
              setFilterState("recent")
            }} className={filterState === "recent" ? "active" : ""}>
              recent
            </a>
          </li>
          <li>
          <a href="#" onClick={(e)=>{
              e.preventDefault();
              setFilterState("commented")
            }} className={filterState === "commented" ? "active" : ""}>
              commented
            </a>
          </li>
        </menu>
        <menu className="options__filters">
          <li className="dropdown">
            <button aria-label="Filter by type" title="Filter by type">
              <i className="fa-solid fa-filter"></i> Filter by type
            </button>
            <ul className="dropdown__menu">
              <li>
                <a href="#" onClick={(e)=>{
                  e.preventDefault();
                  setThreadState("all")
                }} className={threadState === "all" ? "active" : ""}>
                  all
                </a>
              </li>
              <li>
                <a href="#" onClick={(e)=>{
                  e.preventDefault();
                  setThreadState("links")
                }} className={threadState === "links" ? "active" : ""}>
                  links
                </a>
              </li>
              <li>
                <a href="#" onClick={(e)=>{
                  e.preventDefault();
                  setThreadState("threads")
                }} className={threadState === "threads" ? "active" : ""}>
                  threads
                </a>
              </li>
            </ul>
          </li>
        </menu>
      </aside>
      <div
        id="content"
        className="overview subjects comments-tree comments show-comment-avatar show-post-avatar">
        <aside className="section section--muted">
          <p>Empty</p>
        </aside>
      </div>
    </main>
  </div>
</div>
  );
}

export default ProfileContent
