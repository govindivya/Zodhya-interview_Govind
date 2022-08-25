import { useEffect, useState } from "react";

const Tweet = ({ tweet }) => {
  let href = `https://twitter.com/${tweet.author_id}/status/${tweet.id}`;
  return (
    <div className="relative w-full md:w-1/4 p-5 md:p-10 shadow-xl m-5 md:m-10">
      <div className="w-full relative p-5 m-5 ">
        <h1 className="text-2xl text-gray-500">
          <a
           rel="noreferrer"
            href={href}
            target="_blank"
            className="hover:underline hover:text-blue-400"
          >
            Go To Tweet
          </a>
        </h1>
      </div>
      <div className="w-full relative p-5 m-5 ">{tweet.text}</div>
    </div>
  );
};

export default Tweet;
