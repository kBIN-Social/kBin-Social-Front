import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comment from "../Components/Comment";
import Header from '../Components/Header';

export default function ThreadDetail() {
    const { id } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchCommentData = async () => {
            try {
                const commentsData = await getCommentsData();
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
    }, [id]);

    async function getCommentsData() {
        const endPoint = `http://127.0.0.1:8000/api/v1/threads/${id}/comments`;
        const response = await fetch(endPoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token f26738bf293dc08f2af9c67ee62b46867fad2860`,
            },
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Error fetching comments data');
        }
        return response.json();
    }

    async function getUserDetails(userId) {
        const endPoint = `http://127.0.0.1:8000/api/v1/profile/${userId}`;
        const response = await fetch(endPoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token f26738bf293dc08f2af9c67ee62b46867fad2860`,
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

    const listComments = comments.map((commentInfo) =>
        <li key={commentInfo.id}>
            <Comment
                author_id={commentInfo.author}
                author={commentInfo.userDetails.username}
                body={commentInfo.body}
                created_at={commentInfo.created_at}
                avatar={commentInfo.userDetails.avatar} // assuming userDetails has an avatar field
                likes={commentInfo.likes.length}
                dislikes={commentInfo.dislikes.length}
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
