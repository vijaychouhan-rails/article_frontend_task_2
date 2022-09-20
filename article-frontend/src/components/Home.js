import {Link } from "react-router-dom";
import Article from './Article';
import axios from 'axios';
import React from "react";

function Home() {
  const [articles, setArticles] = React.useState([]);
  const [article, setArticle] = React.useState([]); 

  const handleChange = (e) => {
		let name = e?.target?.name;
		let value = e?.target?.value;
		setArticle({ ...article, [name]: value });
	};
  
  function handleCreateArticle(e){
    e.preventDefault();
    axios.post(`http://localhost:3000/api/articles/`,article).then((response) => {
      let arr = articles
      arr.unshift(response.data);
      setArticles(arr);
      setArticle({});
    });
    

  }

  function articleDeleteHandler(articleId) {
    axios.delete(`http://localhost:3000/api/articles/${articleId}`).then((response) => {
      let tempArticles = articles.filter(article => {return article.id != articleId} );
      setArticles(tempArticles);
    });
  }

  React.useEffect(() => {
    axios.get('http://localhost:3000/api/articles').then((response) => {
      setArticles(response.data);
    });
  }, []);

  return (
    <div>
    <div >
    <button><Link to="/">Home</Link></button>
        <form onSubmit = {handleCreateArticle}>
          <br />
          <input type="text" placeholder="Heading" name="heading" onChange= {(e) => handleChange(e)}  /><br />
          <input type="text" placeholder="Write content here.." name="content" onChange= {(e) => handleChange(e)} /><br />
          <button type = 'submit'> Create Article </button>
        </form>
        <p>------------------------------------------------</p>
        {articles.map(art => (
          
          <Article key={art.id} 
          id={art.id}
          heading={art.heading}
          content={art.content}
          created_at={art.created_at}
          updated_at={art.updated_at}
          onArticleDelete={articleDeleteHandler}>
          
          </Article>
          ))}
          
      </div> 
      
    </div>
  );
}

export default Home;
