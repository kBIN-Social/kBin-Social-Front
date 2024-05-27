import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comment from "../Components/Comment";
import Header from '../Components/Header';
import { useToken,useUser } from '../Logic/UserContext';

export default function ThreadDetail() {
    const { id } = useParams();
    const user= useUser() ;
    const token =  useToken() ;
    console.log(`token: ${token}`) ;
    const [comments, setComments] = useState([]);
    const localUrl = "http://127.0.0.1:8000"
    const deployUrl = "https://asw-kbin.azurewebsites.net"

    useEffect(() => {
        const fetchCommentData = async () => {
            try {
                const commentsData = await getCommentsData(token);
                const commentsWithUserDetails = await Promise.all(commentsData.map(async (comment) => {
                    const userDetails = await getUserDetails(comment.author);
                    return { ...comment, userId: userDetails.id,username: userDetails.username, avatar: userDetails.avatar  };
                }));
                console.log(commentsWithUserDetails);
                setComments(commentsWithUserDetails);
            } catch (error) {
                console.error('Error fetching comments or user data:', error);
            }
        };
        fetchCommentData();
    }, [token, id]);

    async function getCommentsData(token) {
        const endPoint = deployUrl + `/api/v1/threads/${id}/comments`;
        const response = await fetch(endPoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Error fetching comments data');
        }
        return response.json();
    }

    async function getUserDetails(userId) {
        const endPoint = deployUrl + `/api/v1/profile/${userId}`;
        const response = await fetch(endPoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Error fetching user data');
        }
        return response.json();
    }
    async function remove(commentId) {
        await fetch(`${deployUrl}/api/v1/comments/${commentId}/vote/remove`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            credentials: 'include'
        });
    }
   
    async function like(commentId) {
        await fetch(`${deployUrl}/api/v1/comments/${commentId}/vote/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            credentials: 'include'
        });
    }
     
    async function handleLike (commentId)  {
        try {
            let state = -1 ;
            // Update the likes count in the state
            setComments(comments.map((comment) => {
                if(comment.id === commentId) {
                let user_id =  2 ;
                console.log("entrant");
                for(let i = 0 ; i < comment.dislikes.length ; ++i ) {
                    console.log("Compovant dislikes");
                    if(comment.dislikes[i] === user_id) {
                        comment.dislikes.splice(i,1) ;
                        comment.likes.push(user_id) ;
                        state = 2 ; //remove dislike and make like
                        return {...comment} ;
                }
            }
                if(comment.likes.length === 0) {
                    console.log("Fent like");
                    comment.likes.push(user_id) ;
                    state = 0 ; //make like
                    return {...comment} ;
                }
                else {
                    for(let i = 0 ; i < comment.likes.length ; ++i ) {
                        if(comment.likes[i] === user_id) {
                            console.log("like: "+ comment.likes[i])
                            state = 1 ; //remove like
                            console.log("eliminant");
                            comment.likes.splice(i,1) ;
                            return {...comment} ;
                        }
                        console.log("Fent like");
                        comment.likes.push(user_id) ;
                        state = 0 ;
                        return {...comment} ;
                    }
                }
        } 
        return {...comment} ;
    }
        )) ;
        if(state == 0) await like(commentId);
        else if(state == 1) await remove(commentId) ;
        else if(state == 2) {
            await remove(commentId) ;
            await like(commentId);

        }  
    }
        catch (error) {
            console.error('Error liking comment:', error);
        }
    }
 async function handleDislike (commentId)  {
    console.log("dislike: " + commentId) ;
 }
 async function dislike(commentId) {
    await fetch(`${deployUrl}/api/v1/comments/${commentId}/vote/dislike`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        credentials: 'include'
    });
}

async function handleDislike(commentId) {
    try {
        let state = -1 ;
        // Actualiza el contador de "dislikes" en el estado
        setComments(comments.map((comment) => {
            if (comment.id === commentId) {
                let user_id = 2;
                console.log("Entrando a dislike");
                for (let i = 0; i < comment.likes.length; ++i) {
                    console.log("Comprobando likes");
                    if (comment.likes[i] === user_id) {
                        state = 2 ; //remove like and make dislike 
                        comment.likes.splice(i, 1);
                        comment.dislikes.push(user_id);
                        return { ...comment };
                    }
                }
                if (comment.dislikes.length === 0) {
                    console.log("Haciendo dislike");
                    comment.dislikes.push(user_id);
                    state = 0 //make dislike 
                    return { ...comment };
                } 
                else {
                    for (let i = 0; i < comment.dislikes.length; ++i) {
                        if (comment.dislikes[i] === user_id) {
                            console.log("dislike: " + comment.dislikes[i]);
                            state = 1 //remove dislike
                            console.log("Eliminando dislike");
                            comment.dislikes.splice(i, 1);
                            return { ...comment };
                        }
                        console.log("Haciendo dislike");
                        comment.dislikes.push(user_id);
                        state = 0 ; //make dislike
                        return { ...comment };
                    }
                }
            }
            return { ...comment };
        }));
        if(state == 0) await dislike(commentId);
        else if(state == 1) await remove(commentId) ;
        else if(state == 2) {
            await remove(commentId) ;
            await dislike(commentId);

        }  
    } catch (error) {
        console.error('Error al dar dislike al comentario:', error);
    }
}
async function boost(commentId) {
    await fetch(`${deployUrl}/api/v1/comments/${commentId}/boost`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        credentials: 'include'
    });
}
 
async function unboost(commentId) {
    await fetch(`${deployUrl}/api/v1/comments/${commentId}/unboost`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        credentials: 'include'
    });
}
 
async function handleBoost(commentId) {
    let doBoost = true ;
    const userId = 2 ;
    setComments(comments.map((comment)=>{
        if(comment.id == commentId) {
            if(comment.boosts.length == 0) {
                doBoost = true; //make a boost
                comment.boosts.push(userId) ;
                return {...comment} ;
            }
            for(let i = 0; i < comment.boosts.length ; ++i) {
                if(userId === comment.boosts[i]) {
                    doBoost = false ;
                    console.log("unboost");
                    comment.boosts.splice(i,1) ;
                    return {...comment};
                }
                doBoost = true ;
                comment.boosts.push(userId) ;
                return {...comment}
            }
    }
    return comment;
    }))
    const response = doBoost ? await boost(commentId) : await unboost(commentId);
}

    const listComments = comments.map((commentInfo) => {
        console.log(commentInfo.likes)
        console.log( commentInfo)
        return (
        <li key={commentInfo.id}>
            <Comment
                comment_id = {commentInfo.id}
                author_id={commentInfo.user_id}
                author={commentInfo.username}
                body={commentInfo.body}
                created_at={commentInfo.created_at}
                avatar={commentInfo.avatar} // assuming userDetails has an avatar field
                likes ={commentInfo.likes.length}
                dislikes={commentInfo.dislikes.length}
                boosts = {commentInfo.boosts.length}
                handleLike={handleLike}
                handleDislike={handleDislike}
                handleBoost = {handleBoost}
            />
        </li> ) ;
    }
    );
    if (!comments.length) {
        return <div>Loading...</div>;
    }
    return (
        <div id="thread_detail">
        <Header/> 
            <ul>
                {listComments}
            </ul>
        </div>
    );
}
