import { useState, useContext } from 'react';
import { useUser, useUserId } from '../Logic/UserContext';
import { UserContext } from '../Logic/UserContext'

function Header() {
  const user = useUser();
  console.log(user)

  const currUserId = useUserId();
  console.log(currUserId)

  const { setCurrUser } = useContext(UserContext);

  useState() 

  

  if(!user) return <h1>loading</h1>

  return (
    <header id="header" className="header">
      <div className="kbin-container">
        <div className="sr-nav">
          <a href="#content">Go to content</a>
          <a href="#options">Go to filters</a>
          <a href="/search">Go to search</a>
          <a href="#footer">Go to footer</a>
        </div>
        <nav className="head-nav">
          <div className="brand">
            <div data-action="click->kbin#handleNavToggleClick">
            </div>
            <a href="/">
              <img
                id="logo"
                src="https://kbin.social/kbin_logo.svg"
                alt="Homepage"
                title="Homepage"
              />
            </a>
          </div>
          <menu className="head-nav__menu">
            <li></li>
            <li>
              <a href="/" className="">
                Threads
              </a>
            </li>
            <li>
              <a href="/magazines" className="">
                Magazines
              </a>
            </li>
          </menu>
        </nav>
        <menu>
          <li>
          <a href="" className="text" aria-label="" title=""><p style={{paddingTop: '15px'}}>🔍</p></a>
          </li>
          
          <li className="dropdown">
            <a href="/new" className="icon" aria-label="Add" title="Add">
              <i className="fa-solid fa-plus"></i> Add
            </a>
            <ul className="dropdown__menu">
              <li>
                <a href="/newLink" className="">
                  Add new link
                </a>
              </li>
              <li>
                <a href="/newThread" className="">
                  Add new thread
                </a>
              </li>
              <li>
                <a className="" href="/newMagazine">
                  Create new magazine
                </a>
              </li>
            </ul>
          </li>


          <li className="dropdown">
          <a href="" className="text" aria-label="" title=""><p style={{paddingTop: '15px'}}>Profile</p></a>
            <ul className="dropdown__menu">
              <li>
                <a href={`/profile/${user.id}`} className="">
                  Profile
                </a>
              </li>
              <li>
                <a href="/profile/settings" className="">
                  Settings
                </a>
              </li>
            </ul>
          </li>



          <li className="dropdown">
            <a href="" className="text" aria-label="" title=""><p style={{paddingTop: '15px'}}>{`User ${currUserId}`}</p></a>
            <ul className="dropdown__menu">
              <li>
                <a href="#" onClick={(e)=>{
                  e.preventDefault();
                  setCurrUser(1)
                }} className={currUserId === 1 ? "active" : ""}>
                  User 1
                </a>
              </li>
              <li>
                <a href="#" onClick={(e)=>{
                  e.preventDefault();
                  setCurrUser(2)
                }} className={currUserId === 2 ? "active" : ""}>
                  User 2
                </a>
              </li>
              <li>
                <a href="#" onClick={(e)=>{
                  e.preventDefault();
                  setCurrUser(3)
                }} className={currUserId === 3 ? "active" : ""}>
                  User 3
                </a>
              </li>
            </ul>
          </li>


        </menu>
      </div>
    </header>
  );
}

export default Header;
