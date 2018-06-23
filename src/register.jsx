import React, { Component } from 'react'
import ReactDOM from 'react-dom'

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const post = (endpoint, data) => {
    return new Promise((resolve,reject)=>{
	fetch(endpoint, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) => {
            return res.json()
        }).then((json)=> {
        	resolve(json)
        }).catch((error) => {
            reject(error)
        })
    })
};


export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			companyName: '',
			mail: '',
			message: '',
			agree: false,
			hasSent: false,
			loading:false,
			hasError:false
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleCheckbox = this.handleCheckbox.bind(this)
		this.sendMessage = this.sendMessage.bind(this)
	}

	handleChange(e){
		let change = {}
		change[e.target.name] = e.target.value.substring(0, 140);
		this.setState(change);
	}

	handleCheckbox(e){
		this.setState({agree:!this.state.agree})
	}

	sendMessage(e){
		e.preventDefault();

		if(!validateEmail(this.state.mail)){
			this.setState({loading:false, hasSent:false, hasError:"Warning!!! Invalid mail!"})
			return;
		}

		this.setState({loading:true});

		const data = {
			mail: this.state.mail,
		    	name: this.state.name,
		    	company: this.state.companyName,
		    	message: this.state.message,
		    	agreed: this.state.agreed
		}

		post("https://53oasuypu9.execute-api.eu-west-1.amazonaws.com/production/signup",data).then((data)=>{
			if(data.errorMessage){
				this.setState({loading:false,hasSent:false, hasError:data.errorMessage, mail:""})
			} else {
				this.setState({loading:false,hasSent:true})
			}
		}).catch((error)=>{
			this.setState({loading:false,hasSent:false, hasError:error})
		})
	}

	render(){
		return(<section className="signup">
			<div className="center">
				<p><br/></p>
				<p>Sign up to get news and updates about Lunar Soil.</p>
				<p><br/></p>
				<a href="https://morgondag.io/register?refeerer=lunar-web" title="Register Now">
			      <input type="submit" name="submit" id="submit" className="button" value="Register Now" title="Register Now" />
			    </a>
			    <p><br/></p>
			</div>
		</section>)
	}
  }
