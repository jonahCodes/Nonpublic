import React,{Component} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'


export default class OneFormUpdate extends Component{
   state={
       title:'',
       description:'',
       locading:false,
       redirectToReferrer:false
   }
   componentDidMount(){
    axios.get('http://localhost:3001/api/post/all/'+this.props.match.params.id)
    .then(res=>{
      console.log(res.data);
      this.setState({title:res.data.title,description:res.data.description});
    })
  }
 handleChange=(e)=>{
    this.setState({
    [e.target.name]:e.target.value
    
    })
  }
  handleUpdate=()=>{
      const obj = {
          title:this.state.title,
          description:this.state.description
      }
      axios.post('http://localhost:3001/api/post/update/'+this.props.match.params.id,obj)
    .then(res=>{
      console.log(res);
    })
    .catch(err=>{
      console.log(err);
    })
   this.props.history.push('/');
  }

 
    render(){
                var redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer === true) {
            return <Redirect to="/"/>
        }

        return(
            <div className='container' style={{paddingTop:'200px'}}>
                    <h1>UPDATE form</h1>
                    <p>Can't change post image!(Delete It)</p>
            <form className="login-form" onSubmit={this.handleUpdate}>
                   
                    <input 
                    name='title'
                    type="text"  
                    value={this.state.title} 
                    onChange={this.handleChange} 
                    className="input " 
                    placeholder='Title'/>

                    <input 
                    name='description'
                    type="text" 
                    className="input " 
                    value={this.state.description} 
                    onChange={e=>this.setState({description:this.state.post.description})} 
                    placeholder="Description" />
                    <button>add</button>
                </form>
              </div>
            
        )
    }
}