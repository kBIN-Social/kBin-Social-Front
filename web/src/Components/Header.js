import { useUser } from '../Logic/UserContext';

function Header() {
  const user = useUser();
  function isUser() {
    if(user == null ) return null ;
    else {
      return (
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
              <li>
                <a href="/logout">Log out</a>
              </li>
            </ul>
      ) ;
    }
  }
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
            <a
              href="/search"
              className="icon"
              aria-label="Search"
              title="Search"
            >
              <i className="fa-solid fa-magnifying-glass"></i> Search
            </a>
          </li>
          <li className="dropdown">
            <a href="/new" className="icon" aria-label="Add" title="Add">
              <i className="fa-solid fa-plus"></i> Add
            </a>
            <ul className="dropdown__menu">
              <li>
                <a href="/threads/newLink" className="">
                  Add new link
                </a>
              </li>
              <li>
                <a href="/threads/newThread" className="">
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
            <a className=" login" href=  {user? `/profile/${user.id}`: "/login"} >
              <span className="user-name">{user? user.username:"Login"}</span>
            </a>
           {isUser}
          </li>
        </menu>
      </div>
    </header>
  );
}

export default Header;
