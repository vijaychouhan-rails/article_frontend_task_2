
import React from "react";
import {useNavigate,Link,useParams } from "react-router-dom";
import axios from "axios";

const ViewArticle = (props) => {
    const navigate = useNavigate();
    const [article, setArticle] = React.useState({});
    const [editArticle, setEditArticle] = React.useState({});
    const [isEdit, setIsEdit] = React.useState(false);
    const {id} = useParams();
    const handleChange = (e) => {
		let name = e?.target?.name;
		let value = e?.target?.value;
		setEditArticle({ ...article, [name]: value });
	};
    function handleEditArticle(e){
        e.preventDefault();
        axios.patch(`http://localhost:3000/api/articles/${id}`,editArticle).then((response) => {
          setArticle(response.data);
          setEditArticle({});
          setIsEdit(false);
    })
    }

    function deleteArticleHandler() {
        axios.delete(`http://localhost:3000/api/articles/${id}`).then((response) => {
            setArticle({});
            navigate('/');
          });
    }


    React.useEffect(() => {
        axios.get('http://localhost:3000/api/articles/'+id).then((response) => {
          setArticle(response.data);
        });
      }, []);

  return (
    <div>
      <button><Link to="/articles">Back</Link></button>
      <h1 > {article.id}. {article.heading}  </h1>
        <p>  {article.content}</p>
        <p>  Published: {article.created_at}</p>
        {article.updated_at && <p>  Last Edit: {article.updated_at}</p>}
        <button  onClick={deleteArticleHandler}>  Delete  </button>
        <button disabled={isEdit}  onClick={()=>{setIsEdit(true); setEditArticle(article);}}>  Edit  </button>
        
        { isEdit && <form onSubmit = {handleEditArticle}>
          <input type="text" value={editArticle.heading} name="heading" onChange= {(e) => handleChange(e)}  />
          <input type="text" value={editArticle.content} name="content" onChange= {(e) => handleChange(e)} />
          <button type = 'submit'> Done </button>
        </form>}
    </div>
  );
};
  
export default ViewArticle;