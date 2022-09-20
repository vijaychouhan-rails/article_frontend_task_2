import '../styles/article.css'
import {Link } from "react-router-dom";

function Article(props) {
    let {id,heading, content, created_at, updated_at} = props;
    let viewEndPoint = '/article/' + id ;
    function deleteArticleHandler() {
        props.onArticleDelete(props.id);
    }

    
    return <div >
        
        <h2> {id}.<Link to={viewEndPoint}>{heading}</Link>   </h2>
        <p>  {content}</p>
        <p>  Published: {created_at}</p>
        <button  onClick={deleteArticleHandler}>  Delete  </button>
        <p>------------------------------------------------</p>
    </div>
}

export default Article