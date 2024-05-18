import React from 'react';

function ProfileForm() {
  return (
    <div id="middle" className="page-settings page-settings-profile">
        <div className="kbin-container">
            <main id="main" data-controller="lightbox timeago" className="view-compact">
                <div className="section">
                    <div className="user-box">
                        <div className="">
                            <div className="user-main" id="content">
                                <div>
                                    <div className="row">
                                        <h1>papapapapapapapapapap</h1>
                                        <small>@papapapapapapapapapap@kbin.social</small>
                                    </div>
                                    <aside className="user__actions" data-controller="subs">
                                        <div className="action">
                                            <i className="fa-solid fa-users"></i><span>0</span>
                                        </div>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="content" className="section">
                    <div className="container">
                        <h1 hidden="">Profile</h1>
                        <form name="user_basic" method="post" encType="multipart/form-data">
                            <div><textarea id="user_basic_about" name="user_basic[about]" placeholder="About"
                                    data-controller="input-length rich-textarea autogrow"
                                    data-entry-link-create-target="user_about" data-action="input-length#updateDisplay"
                                    data-input-length-max-value="512"
                                    style={{ overflow: 'hidden', height: '68px' }}></textarea>
                                <div id="user_basic_about_max_length" className="length-indicator">0/512</div>
                            </div>
                            <div><label htmlFor="user_basic_username">Username</label><input type="text"
                                    id="user_basic_username" name="user_basic[username]"
                                    data-controller="input-length autogrow" data-entry-link-create-target="user_about"
                                    data-action="input-length#updateDisplay" data-input-length-max-value="30"
                                    value="papapapapapapapapapap" style={{ overflow: 'hidden', height: '50px' }}/>
                                <div id="user_basic_username_max_length" className="length-indicator">21/30</div>
                            </div>
                            <div><label htmlFor="user_basic_avatar">Avatar</label><input type="file" id="user_basic_avatar"
                                    name="user_basic[avatar]"/></div>
                            <div><label htmlFor="user_basic_cover">Cover</label><input type="file" id="user_basic_cover"
                                    name="user_basic[cover]"/></div>
                            <div className="row actions">
                                <div><button type="submit" id="user_basic_submit" name="user_basic[submit]"
                                        className="btn btn__primary">Save</button></div>
                            </div>
                            <input type="hidden" id="user_basic__token" name="user_basic[_token]"
                                value="08c13f00d.aO8Brdrfk7YzMIUNESjyRxZpyEVZ6C5-M1ZRcvUm-s8.UaI015-F9-dUQcRrVUSBalIHkg4hjXkQaTVkNoJLzLcqg0ie44mr8UUA1A"/>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    </div>
  );
}

export default ProfileForm;
