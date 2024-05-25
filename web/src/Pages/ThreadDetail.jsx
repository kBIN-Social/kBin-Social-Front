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
                    return { ...comment, userDetails };
                }));
                console.log(commentsWithUserDetails);
                setComments(commentsWithUserDetails);
            } catch (error) {
                console.error('Error fetching comments or user data:', error);
            }
        };
        fetchCommentData();
    }, [token,id]);

    async function getCommentsData(token ) {
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
        const endPoint = deployUrl +`/api/v1/profile/${userId}`;
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

    if (!comments.length) {
        return <div>Loading...</div>;
    }
     async function handleLike (commentId)  {
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
    };

    const listComments = comments.map((commentInfo) =>
        <li key={commentInfo.id}>
            <Comment
                comment_id = {commentInfo.id}
                author_id={commentInfo.author}
                author={commentInfo.userDetails.username}
                body={commentInfo.body}
                created_at={commentInfo.created_at}
                avatar={commentInfo.userDetails.avatar} // assuming userDetails has an avatar field
                likes={commentInfo.likes.length}
                dislikes={commentInfo.dislikes.length}
                handleLike={handleLike}
                handleDislike={handleDislike}
            />
        </li>
    );

    return (
        <div id="thread_detail">
        <Header/> 
            <ul>
                {listComments}
            </ul>
        </div>
    );
}
