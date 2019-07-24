import React,{Component} from 'react'
export default class Oneitem extends Component{
    constructor(props){
        super(props);
           this.state={
                items:this.props

           }
        }
    render(){
        console.log('=====================')
        console.log(this.props.id)
        
        return (
            <div>
            <section key={this.props.id} className='main special'>
  <div className="container fit primary">
      <div className="content">
            <div className="thumbnail">
            <div className="thumbnail__container">
          
               <a href={"/items/"+this.props.id}>
                <div className="thumbnail__img" >
                {/* <img src={this.props.image}/> */}
               </div>
              </a>
            </div>
          </div>
         </div>
    </div>
</section>
 </div>
 )
 }
}
    