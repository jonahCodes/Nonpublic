import React,{Component} from 'react'
import axios from 'axios'

export default class OneFormUpdate extends Component{
   state={
       image:[],
       description:[],
       locading:false,
       redirectToReferrer:false
   }
   componentDidMount(){
    axios.get('http://localhost:3001/'+this.props.match.params.id)
    .then(res=>{
      console.log('llllllllllllllll')
      console.log(res.data);
      this.setState({image:res.data.image,description:res.data.description});
    })
  }
 handleChange=(e)=>{
    this.setState({
    [e.target.name]:e.target.value
    
    })
  }
  handleUpdate=()=>{
      const obj = {
          image:this.state.image,
          description:this.state.description
      }
      axios.post('http://localhost:3001/update/'+this.props.match.params.id,obj)
    .then(res=>{
      console.log(res);
    })
   this.props.history.push('/');
  }

 
    render(){
        //         var redirectToReferrer = this.state.redirectToReferrer;
        // if (redirectToReferrer === true) {
        //     return <Redirect to="/"/>
        // }

        return(
            <div className='container' style={{paddingTop:'200px'}}>
                    <h1>UPDATE form</h1>
            <form className="login-form" onSubmit={this.handleUpdate}>
                    <input name='image' 
                    type="text"  
                    value={this.state.image} 
                    onChange={this.handleChange} 
                    className="input username" 
                    placeholder=''/>
                    <input name='description' 
                    type="textbox" 
                    className="input password" 
                    value={this.state.description} 
                    onChange={this.handleChange} 
                    placeholder="Description" />
                    <button>add</button>
                </form>
              </div>
            
        )
    }
}