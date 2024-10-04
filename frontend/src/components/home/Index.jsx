import React, {
  useRef,
  useState,
  useEffect,
  createContext,
  useCallback,
} from "react";
import Index from "./../Header/Index";
import LeftLink from "./LeftLink";
import { left } from "@/data/home";
import { useSelector } from "react-redux";
import ArrowDown1 from "../../svg/arrowDow1";
import Stories from "./Stories/Index";
import CreatePost from "./Posts/CreatePost";
import ResendEmailVerification from "./Activate/ResendEmailVerification";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/apis/api";
import SinglePost from "./ShowPosts/SinglePost";
import { FixedSizeList, VariableSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
export const DynamicListContext = createContext({});

const Home = () => {
  const listRef = useRef(null);
  const sizeMap = useRef({});
  const user = useSelector((state) => state.user);
  const [showMore, setShowMore] = useState(false);
  const visibleLinks = showMore ? left : left.slice(0, 6);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam = 1 }) =>
        getPosts({ pageParam, token: user.token }),
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextPage : undefined,
      staleTime: 1000 * 60 * 5,
    });

  const allPosts = data?.pages.flatMap((page) => page.posts) || [];

  const parentRef = useRef();
  const currentRef = parentRef.current;

  // Handle infinite scrolling by fetching next page when nearing the bottom
  useEffect(() => {
    const onScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } = parentRef.current;
      console.log(
        scrollHeight,
        clientHeight,
        scrollTop,
        "this is scrollHeight"
      );
      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        hasNextPage &&
        !isLoading
      ) {
        fetchNextPage();
      }
    };

    if (currentRef) {
      currentRef.addEventListener("scroll", onScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", onScroll);
      }
    };
  }, [hasNextPage, fetchNextPage, isLoading]);

  const setSize = useCallback((index, size) => {
    if (sizeMap.current[index] !== size) {
      sizeMap.current = { ...sizeMap.current, [index]: size };
      if (listRef.current) {
        listRef.current.resetAfterIndex(0);
      }
    }
  }, []);

  const getSize = useCallback((index) => {
    return sizeMap.current[index];
  }, []);
  return (
    <DynamicListContext.Provider value={{ setSize }}>
      <Index>
        <div className="flex w-full max-w-[1600px]">
          {/* Left Section */}
          <div className="sticky top-0 h-screen w-1/4 overflow-y-auto scroll-bar-thin bg-[#F0F2F5] p-4 hidden lg:block pt-20">
            <div className="flex flex-col gap-1 cursor-pointer">
              <div className="flex items-center justify-start gap-3 hover:bg-hover2 p-2 rounded-md">
                <img
                  src="https://res.cloudinary.com/dbcopekhr/image/upload/v1724406930/5b305fca208d6162872c715f4c7643e1_bcpefg.jpg"
                  className="bg-white rounded-full"
                  width={30}
                  alt=""
                />
                <span className="font-semibold text-[14.5px]">
                  {user?.first_name + " " + user?.last_name}
                </span>
              </div>
              {visibleLinks.map((link, i) => (
                <LeftLink
                  key={i}
                  img={link.img}
                  text={link.text}
                  notification={link.notification}
                />
              ))}
              <button
                onClick={toggleShowMore}
                className="mt-2 flex items-center gap-3 hover:bg-hover2 p-2 rounded-md"
              >
                <div
                  className={`bg-[#D8DADF] w-8 h-8 rounded-full items-center justify-center flex ${
                    showMore ? "rotate-180" : ""
                  }`}
                >
                  <ArrowDown1 />
                </div>
                <span className="flex items-center text-black font-semibold text-[16px]">
                  {showMore ? "See Less" : "See More"}
                </span>
              </button>
            </div>
          </div>

          {/* Middle Section */}
          <div
            className="flex-1  md:px-16 px-4 shadow-none overflow-y-auto pt-16 bg-[#F0F2F5] scrollbar-hide h-screen"
            ref={parentRef}
          >
            {!user?.verified && <ResendEmailVerification />}
            <CreatePost />
            <Stories />
            {allPosts.length > 0 ? (
              <AutoSizer>
                {({ height, width }) => (
                  <VariableSizeList
                    ref={listRef}
                    height={height}
                    width={width}
                    itemData={allPosts}
                    itemCount={allPosts.length } // Assuming 2 additional items
                    itemSize={getSize} // Keep it consistent
                    
                  style={{ overflowX: "hidden" , overflowY: "auto", backgroundColor: "white", height: "100vh"}}
                    
                  >
                    {({ index, style }) => {
                      const post = allPosts[index]; // Adjusting index for posts
                      return post ? (
                        <SinglePost
                        
                          key={index}
                          post={post}
                          style={style}
                          index={index}
                        />
                      ) : null; // Handle undefined post
                    }}
                  </VariableSizeList>
                )}
              </AutoSizer>
            ) : (
              <div>No posts available</div>
            )}
          </div>

          {/* Right Section */}
          <div className="sticky top-0 h-screen w-1/4 bg-[#F0F2F5] p-4 hidden lg:block">
            <div className="pt-20">Right Sidebar Content</div>
          </div>
        </div>
      </Index>
    </DynamicListContext.Provider>
  );
};

export default Home;

// import React, { useRef, createContext, useCallback } from "react";
// import AutoSizer from "react-virtualized-auto-sizer";
// import { VariableSizeList } from "react-window";
// import { faker } from "@faker-js/faker";
// import ListRow from "./ListRow";

// export const DynamicListContext = createContext({});

// const genItems = (size) => {
//   return new Array(size)
//     .fill("")
//     .map(() => faker.lorem.sentence());
// };

// const Home = () => {
//   const mockListItems = genItems(100);
//   const listRef = useRef(null);
//   const sizeMap = useRef({});

//   const setSize = useCallback((index, size) => {
//     if (sizeMap.current[index] !== size) {
//       sizeMap.current = { ...sizeMap.current, [index]: size };
//       if (listRef.current) {
//         listRef.current.resetAfterIndex(0);
//       }
//     }
//   }, []);

//   const getSize = useCallback((index) => {
//     return sizeMap.current[index] || 100; // Default height
//   }, []);

//   return (
//     <DynamicListContext.Provider value={{ setSize }}>
//       <AutoSizer>
//         {({ height, width }) => (
//           <VariableSizeList
//             ref={listRef}
//             width={width}
//             height={height}
//             itemData={mockListItems}
//             itemCount={mockListItems.length}
//             itemSize={getSize}
//            overscanCount={5}
//           >
//             {({ index, style }) => <ListRow index={index} style={style} data={mockListItems} />}
//           </VariableSizeList>
//         )}
//       </AutoSizer>
//     </DynamicListContext.Provider>
//   );
// };

// export default Home;
