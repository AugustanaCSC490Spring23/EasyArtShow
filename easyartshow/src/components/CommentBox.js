import React from "react";
import { DiscussionEmbed } from "disqus-react";

const CommentBox = ({ post }) => {
  return (
    <DiscussionEmbed
      shortname="easyartshow-2"
      config={{
        url: window.location.href,
        identifier: window.location.href,
        title: document.title,
        language: "en_US",
      }}
    />
  );
};

export default CommentBox;
