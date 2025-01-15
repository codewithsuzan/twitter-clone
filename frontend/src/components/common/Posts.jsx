import React, { useEffect, useState } from "react";
import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { POSTS } from "../../utils/db/dummy";

const Posts = () => {
	const [isLoading, setIsLoading] = useState(true);

	// Simulate a loading delay
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000);
		return () => clearTimeout(timer); // Cleanup the timer
	}, []);

	return (
		<>
			{isLoading && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && POSTS?.length === 0 && (
				<p className='text-center my-4'>No posts in this tab. Switch 👻</p>
			)}
			{!isLoading && POSTS && (
				<div>
					{POSTS.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};

export default Posts;
