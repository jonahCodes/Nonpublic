import React ,{Component}from 'react'
import axios from 'axios';
import Oneitem from './oneitem';


export default class Items extends Component{
    state={
    post:[]
  }
  componentDidMount(){
  axios.get('http://localhost:3001/api/post/all')
    .then(res=>{
      console.log(res.data);
      this.setState({post:res.data});
    })
    .catch(err=>{
      console.log(err)
    })
  } 
  
   render(){
    var allitems = this.state.post.map(item => {
        return <Oneitem
        key={item._id}
        id={item._id}
        title={item.title}
        image={item.image}
        description={item.description}
        />
    });
  

       return(
            <div>
            {allitems}
            </div>
       )
   }
}
