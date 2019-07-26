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
        post:"",
        title:"",
        file:[]

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
    handleSubmit(e){
        e.preventDefault();
        const data = {
            post:this.state.post,
            title:this.state.title,
            file:this.state.file
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
                        <form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
                        <input onChange={this.handleChange.bind(this)}name="title" type="text" placeholder="Title"value={this.state.title}/>
                        <input name="file" type="file" multiple/>
                        <input onChange={this.handleChange.bind(this)} name="post" type="text" value={this.state.post} className="input username"  placeholder="post here" />
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
