import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import { useToken,useUser } from '../Logic/UserContext';
import subbutton from '../Pages/ListMagazines'

export default function MagazineDetail() {
    const { id } = useParams();
    const user= useUser() ;
    const token =  useToken() ;
    //console.log(`token: ${token}`) ;
    const [posts, setPosts] = useState([]);
    const [magazine, setMagazine] = useState([]);
    const deployUrl = "https://asw-kbin.azurewebsites.net"

    //useEffect(() => {
        const fetchCommentData = async () => {
            try {
                const MagazineData = await getMagazineData();
                const MagazinePost = await getMagazinePosts();
                setMagazine(MagazineData);
                setPosts(MagazinePost)
            } catch (error) {
                console.error('Error fetching comments or user data:', error);
            }
        };
        fetchCommentData();
    //}, [id]);

    async function getMagazineData() {
        const endPoint = deployUrl + `/api/v1/magazines/${id}`;
        const response = await fetch(endPoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.content)
        if (!response.ok) {
            throw new Error('Error fetching magazine data');
        }
        return response.json();
    }

    async function getMagazinePosts() {
        const endPoint = deployUrl + `/api/v1/magazines/${id}/threads`;
        const response = await fetch(endPoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.content)
        if (!response.ok) {
            throw new Error('Error fetching magazine data');
        }
        return response.json();
    }    
     /*async function handleLike (commentId)  {
        try {
            const response = await fetch(`${deployUrl}/api/v1/comments/${commentId}/vote/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                credentials: 'include'
            });
             if(response.status == 409 ) {
                setComments(comments.map(comment => comment.id === commentId ? { ...comment, likes: comment.likes - 1 } : comment));
            }
            else if(response.ok)
            // Update the likes count in the state
            setComments(comments.map(comment => comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment));
        } catch (error) {
            console.error('Error liking comment:', error);
        }
    };
 async function handleDislike (commentId)  {
        try {
            const response = await fetch(`${deployUrl}/api/v1/comments/${commentId}/vote/dislike`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token c390f5a512514367ed16e52f7851b554c888a0ca`,
                },
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Error disliking comment');
            }
            // Update the dislikes count in the state
            setComments(comments.map(comment => comment.id === commentId ? { ...comment, dislikes: comment.dislikes + 1 } : comment));
        } catch (error) {
            console.error('Error disliking comment:', error);
        }
    };*/
    
    /*const listComments = posts[1].map((postInfo) =>
        <li key={postInfo.id}>
            <Comment
                comment_id = {postInfo.id}
                author_id={postInfo.author}
                author={postInfo.userDetails.username}
                body={postInfo.body}
                created_at={postInfo.created_at}
                avatar={postInfo.userDetails.avatar} // assuming userDetails has an avatar field
                likes={postInfo.likes.length}
                dislikes={postInfo.dislikes.length}
            />
        </li>
    );*/

    return (
        <div id="magazine_detail">
        <Header/>
                        <header>
                            <h4><a href={`/magazines/${id}`} class="">{magazine.title}</a></h4>
                            <p class="magazine__name">
                            {magazine.name}
                            </p>
                        </header> 
                        <div class="action">
                            <i class="fa-solid fa-users"></i><span>{magazine.num_subscriptors}</span>
                        </div>
                        {subbutton(magazine, user, token)}
                        <div class="content magazine__description">
                        <h3>About Community</h3>
                        <p>{magazine.description}</p>
                        <h3 class="mt-3">Rules</h3>
                    <div class="content magazine__rules">
                        <p>{magazine.rules}</p>
                    </div>
                        
                    </div>
                    <ul class="meta">
                        <li>Threads <span>{magazine.num_threads}</span></li>
                        <li>Comments <span>{magazine.num_comments}</span></li>
                    </ul>
        </div>
    );
}
/*<ul>        
            {listComments}
            </ul>*/