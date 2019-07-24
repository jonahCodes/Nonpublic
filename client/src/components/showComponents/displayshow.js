import React,{Component} from 'react'
export default class DisplayShow extends Component{
   
    render(){
        return(
            <div>
                <img src={this.props.image}/>
            </div>
        )
    }
}