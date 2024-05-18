import React from 'react';

function ProfileContent() {
  return (
<div id="middle" className="page-user page-user-overview">
  <div className="kbin-container">
    <main id="main" data-controller="lightbox timeago" className="view-compact">
      <div className="section section--top">
        <div className="user-box">
          <div>
            <div className="user-main" id="content">
              <div>
                <div className="row">
                  <h1>papapapapapapapapapap</h1>
                  <small>@papapapapapapapapapap@kbin.social</small>
                </div>
                <aside className="user__actions" data-controller="subs"></aside>
              </div>
            </div>
          </div>
        </div>
      </div>
      <aside className="options" id="options">
        <div></div>
        <menu className="options__main">
          <li>
            <a href="/u/papapapapapapapapapap/threads" className="">
              threads (0)
            </a>
          </li>
          <li>
            <a href="/u/papapapapapapapapapap/comments" className="">
              comments (0)
            </a>
          </li>
          <li>
            <a href="/u/papapapapapapapapapap/boosts" className="">
              boosts (0)
            </a>
          </li>
        </menu>
      </aside>
      <aside className="options options--top" id="options">
        <div></div>
        <menu className="options__main no-scroll">
          <li>
            <a href="/top" className="">
              top
            </a>
          </li>
          <li>
            <a href="/newest" className="">
              newest
            </a>
          </li>
          <li>
            <a href="/commented" className="">
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
                <a href="/hot/%E2%88%9E/all" className="active">
                  all
                </a>
              </li>
              <li>
                <a href="/hot/%E2%88%9E/links" className="">
                  links
                </a>
              </li>
              <li>
                <a href="/hot/%E2%88%9E/articles" className="">
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
