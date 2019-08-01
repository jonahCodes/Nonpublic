import React,{Component} from 'react'
// import createForm from './Form'
import { Link } from 'react-router-dom'
import Items from './items';


export default class Home extends Component{
  
  render(){
    return(
      <div>
         <section id="header">  
      <header className="major" style={{marginTop:'250px',color:"black"}}>
        <Link to="/"><h1 style={{color:"black"}}>PROGUE</h1></Link>
       
      </header>
      
    </section>

     <section id="one" className="main special">
      <div className="container">
        <span className="image fit primary"><img src="images/pic01.jpg" alt="" /></span>
        <div className="content">
          <header className="major">
            <h2>simplBlog app</h2>
          </header>
          <p>
          This App is a blog web mobile using responsive practice and React js combined with a Backend making it called the MERN stack.
           </p>
           <a className="button primary" href='//localhost:3001/api/post/create'>Add blog</a> 
        </div>
      </div>
    </section> 
    <section>
    <Items />
    </section>
        </div>
    )
  }
}