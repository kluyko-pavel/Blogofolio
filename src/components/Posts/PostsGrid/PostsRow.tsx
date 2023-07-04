import { IPostInfo } from "../../../types";
import { POST_VIEWS } from "../../../constants/posts-constants";
import { Post } from "../Post";
import { useState } from "react";

const PostsRow = ({ arr }: { arr: IPostInfo[] }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  window.addEventListener("resize", () => setWindowSize(window.innerWidth));

  if (arr.length === 1) {
    return <Post key={arr[0].id} view={POST_VIEWS.VIEW1} postInfo={arr[0]} />;
  } else if (arr.length === 2) {
    return (
      <div className="posts-row-2">
        {arr.map((el: IPostInfo) => (
          <Post key={el.id} view={POST_VIEWS.VIEW2} postInfo={el} />
        ))}
      </div>
    );
  } else if (arr.length === 3) {
    return (
      <div className="posts-row-3">
        {arr.map((el: IPostInfo) => {
          if (windowSize > 540) {
            if (el === arr[0]) {
              return (
                <div key={el.id} className="posts-row-3__el-1">
                  <Post
                    view={
                      windowSize > 768 ? POST_VIEWS.VIEW1 : POST_VIEWS.VIEW2
                    }
                    postInfo={el}
                  />
                </div>
              );
            }
            return (
              <div
                key={el.id}
                className={
                  el === arr[1] ? "posts-row-3__el-2" : "posts-row-3__el-3"
                }
              >
                <Post view={POST_VIEWS.VIEW3} postInfo={el} />
              </div>
            );
          } else {
            return <Post key={el.id} view={POST_VIEWS.VIEW2} postInfo={el} />;
          }
        })}
      </div>
    );
  } else {
    return (
      <div className="posts-row-4">
        {arr.map((el: IPostInfo) => {
          if (windowSize > 768) {
            if (el === arr[0] || el === arr[1]) {
              return (
                <div
                  key={el.id}
                  className={
                    el === arr[0] ? "posts-row-4__el-1" : "posts-row-4__el-2"
                  }
                >
                  <Post view={POST_VIEWS.VIEW2} postInfo={el} />
                </div>
              );
            }
            return (
              <div
                key={el.id}
                className={
                  el === arr[2] ? "posts-row-4__el-3" : "posts-row-4__el-4"
                }
              >
                <Post view={POST_VIEWS.VIEW3} postInfo={el} />
              </div>
            );
          } else {
            return <Post key={el.id} view={POST_VIEWS.VIEW2} postInfo={el} />;
          }
        })}
      </div>
    );
  }
};

export default PostsRow;
