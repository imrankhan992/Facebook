import React from "react";
import SinglePost from "./SinglePost";
import { useSelector } from "react-redux";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/apis/api";

const ShowPosts = ({
  fetchNextPage,
  hasNextPage,
  isLoading,
  isError,
  error,
  allPosts,
}) => {
  return (
    <div>
      <SinglePost
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        isError={isError}
        error={error}
        allPosts={allPosts}
      />
    </div>
  );
};

export default ShowPosts;
