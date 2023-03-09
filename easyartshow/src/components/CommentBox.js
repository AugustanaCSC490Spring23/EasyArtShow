import React, { useState } from "react";
import { DiscussionEmbed } from 'disqus-react';
import { nanoid } from "nanoid";

const CommentBox = ({post}) => {
  return (
    <DiscussionEmbed
    shortname='easyartshow-2'
    config={
        {
            url: window.location.href,
            identifier: window.location.href,
            title: document.title,
            language: 'en_US' 
        }
    }
/>
  )
};

export default CommentBox;
