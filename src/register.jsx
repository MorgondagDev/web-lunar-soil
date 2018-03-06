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
			      <form action="http://send.morgondag.nu/subscribe" method="POST" acceptCharset="utf-8">
				      	<div className="box">
				      		<div className="inputfield">
				      		<label htmlFor="name">Name </label>
				      			<input type="text" name="name" id="name" placeholder="Name/Alias" required title="Name/Alias"/>
				      		</div>
				      		<div className="inputfield">
				      			<label htmlFor="email">Mail </label>
				        		<input type="email" name="email" id="email" placeholder="mail@mail.com" required title="Mail" />
				        	</div>
				        </div>
			        	<input type="hidden" name="list" defaultValue="XgSgS5WieFsaj5aMSyZoKQ" />
			        	<input type="hidden" name="ref" defaultValue="web-lunar-soil" />
			        	<p><br/></p>
			        	<input type="submit" name="submit" id="submit" className="button" value="Sign up" title="Sign up" />
			        	<em>Right now we are giving away the free game "Spacebase19" to all our subscribers!</em>
			        	<em> Join now to get free fun stuff, beta invites and information about the development.</em>
			      </form>
			</div>
		</section>)
	}
  }
