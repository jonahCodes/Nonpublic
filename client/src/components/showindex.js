import React, {Component} from 'react'
import axios from 'axios'
import OneFormUpdate from './showComponents/formupdate.js'
import { Redirect } from 'react-router-dom'

import DisplayShow from './showComponents/displayshow'


class Show extends Component {
 
 
    state = {
        show:[],
        redirectToReferrer:false,
        redirectToReferrer2:false,
        loading:false
    };
   


componentDidMount=()=>{
    axios.get('http://localhost:3001/api/post/all/'+this.props.match.params.id)
    .then(res=>{
      console.log('======****AXIOS RES.data***=========')
      console.log(res);
      this.setState({show:res.data});
    })
  }
  
  handleDelete=(e)=>{
   axios.delete('http://localhost:3001/api/post/remove/'+this.props.match.params.id)
  .then(res=>{
    console.log('delete success');
    console.log(res);
    })

  .catch(err=>{
    console.log(err);  
    

  })

  this.setState({
    loading:true
  })
  setTimeout(()=>this.setState({loading:false,redirectToReferrer:true}),1000);

  
}
 handleForm2=()=>{
   return <OneFormUpdate
        key={this.state.show._id}
        id={this.state.show._id}
        image={this.state.show.image}
        title={this.state.show.title}
  />
 }
 handleForm=()=>{
   this.setState({
    loading:true
  })
  setTimeout(()=>this.setState({loading:false,redirectToReferrer2:true}),1000);
 }
  


render() {

  console.log('=======RENDER=========')
  
 
  var redirectToReferrer = this.state.redirectToReferrer;
  if (redirectToReferrer === true) {
      return <Redirect to="/"/>
  }
  var redirectToReferrer2 = this.state.redirectToReferrer2;
  if (redirectToReferrer2 === true) {
      return <Redirect to={`/update/${this.props.match.params.id}`}/>
  }
  

   return (
        <div className="Projects" >
        
        <div>
             <div className="Projects">
        <h1>
	        {this.state.show.title} 
        </h1>
      </div>
          <DisplayShow image={this.state.show.image}/>
          <div>{this.state.show.description}</div>
            </div>
            <button onClick={this.handleDelete} disabled={this.state.loading}>delete</button>
             
            <button onClick={this.handleForm} disabled={this.state.loading}>update</button>
            
            
       </div>
     );
    }
   }

export default Show;
