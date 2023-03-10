import React from 'react'
import Navbar from "../components/Navbar/Navbar";
function Post(props) {
    return (
      <article>
        <h2>{props.title}</h2>
        <div dangerouslySetInnerHTML={{__html: props.content}}></div>
      </article>
    );
  }
  

function DevNote() {
    return (
      <div>
        <Navbar />
        {/* <Header /> */}
        This is a dev note.
        <Post title="Fri Feb 24, 2023" content="Just finished the upload picture without firebase." />
      </div>
    );
  }
  
export default DevNote;