import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Article } from "./styles";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import Modal from "../Modal";

function PostItem({ post }) {
  const inputElm = useRef(null);
  const [modal, setModal] = useState(false);
  const listItemModal = [
    { name: "Report Inappropirate", color: "#ed4956" },
    { name: "Unfollow", color: "#ed4956" },
    { name: "Go to post", link: `p/${post._id}` },
    { name: "Share" },
    { name: "Copy Link" },
    { name: "Embed" },
    { name: "Cancel" },
  ];

  const toggle = () => setModal(!modal);

  return (
    <Article className="post-item">
      <Header author={post.author} toggle={toggle} />
      <div className="media">
        <img style={{ width: "100%" }} src={post.media} alt="media" />
      </div>
      <Content
        id={post._id}
        caption={post.caption}
        totalLikes={post.totalLikes}
        totalComments={post.totalComments}
        author={post.author}
        comments={post.limitComments}
        createdAt={post.createdAt}
        inputElm={inputElm}
      />
      <Footer inputElm={inputElm} id={post._id} />
      <Modal modal={modal} toggle={toggle} listItemModal={listItemModal}>
        {listItemModal.map((item, index) => (
          <div
            className="item"
            key={index}
            role="button"
            tabIndex={0}
            onClick={toggle}
          >
            {item.link ? (
              <Link to={item.link}>
                <p style={item.color && { color: item.color }}>{item.name}</p>
              </Link>
            ) : (
              <p style={item.color && { color: item.color }}>{item.name}</p>
            )}
          </div>
        ))}
      </Modal>
    </Article>
  );
}

PostItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    author: PropTypes.array,
    media: PropTypes.string,
    caption: PropTypes.string,
    totalLikes: PropTypes.number,
    totalComments: PropTypes.number,
    limitComments: PropTypes.array,
    createdAt: PropTypes.string,
  }),
};

export default PostItem;
