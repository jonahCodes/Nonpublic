import React ,{Component} from 'react';
import { Button } from "reactstrap";
import { Link } from "react-router-dom"     
import API from "../../utils/API";

export default class Create extends Component{
        constructor(props){
            super(props);
        this.state={
        loggedIn:false,
        user:null,
        loading:true,
        description:"",
        title:"",
        image:[]
    }

        }
        
    
    componentDidMount(){
        this.loading();
        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                this.setState({
                    loggedIn: true,
                    user: user.data.user
                });
            }
        }).catch(err => {
            console.log(err);
        });
        console.log(this.state.user)
        console.log(this.props)
    }
    handleSubmit=()=>{
        
        const data = {
            description:this.state.description,
            title:this.state.title,
            image:this.state.image
        }
        API.filePost(data)
        .then(result=>{
            console.log(result);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    
    loading=()=> {
        setTimeout(()=> {
            this.setState({
                loading: false
            })
        }, 1000)  
    }
    render(){
        return(
            <div className="profilePage">
            {this.state.loggedIn ? (
                    <div className="profileBox">
                        <h1 id="userTitle">{this.state.user.username} New Post</h1>


                        <div className='container' style={{paddingTop:'200px'}}>
                        <form className="login-form" onSubmit={this.handleSubmit} method="post" enctype="multipart/form-data">
                        <input onChange={this.handleChange} name="title" type="text" placeholder="Title" value={this.state.title}/>
                        <input name="image" value={this.state.image} type="file" />
                        <input onChange={this.handleChange} name="description" type="text" value={this.state.description} className="input username"  placeholder="post here" />
                        <button type="submit">add</button>
                        </form>
              </div>

                    </div>
                ) : (
                    <div className="noUser">
                        {!this.state.loading ? (
                            <>
                                <h1>please log in</h1>
                                <Link className="loginLink" to="/login"><Button className="loginBtn" color="info" block>Login</Button></Link>
                            </>
                        ) : (
                            <img id="loadingIcon" src="./assets/images/loading.gif" alt="loading"/>
                        )}
                    </div> 
                )}
                
            </div>
        )
    }
}
