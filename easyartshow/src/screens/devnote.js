import React from 'react'
import Header from '../components/header';
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
        <Header />
        This is a dev note.
        <Post title="Fri Feb 24, 2023" content="Just finished the upload picture without firebase.\n Remember to @ before firebase/auth" />
      </div>
    );
  }
  
export default DevNote;