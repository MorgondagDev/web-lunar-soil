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

		// success  f("https://53oasuypu9.execute-api.eu-west-1.amazonaws.com/production/signup", {mail:"hello3@morgondag.nu", company: "yes", name:"gandalf", agree:"yes"})
		/*
		setTimeout(()=> {
			this.setState({loading:false, hasSent:true})
		}, 5000);
		*/




		/*
		setTimeout(()=> {
			this.setState({loading:false, hasSent:false, hasError:"some shit went down!"})
		}, 5000);

		*/
	}

	render(){
		return(<section className="signup">
			<div className="center">
				<p><br/></p>
			      <form action="http://send.morgondag.nu/subscribe" method="POST" acceptCharset="utf-8">
			        <input type="email" name="email" id="email" placeholder="fantastic@mail.com" />
			        <br />
			        <input type="hidden" name="list" defaultValue="XgSgS5WieFsaj5aMSyZoKQ" />
			        <input type="submit" name="submit" id="submit" className="button" value="Subscribe for updates" />
			      </form>
			</div>
		</section>)


		if(this.state.loading){
			return(
				<aside className={`register ${this.props.visible ? "active" : "inactives"}`}>
	    				<p><br/></p>
	    				<p><br/></p>
	    				<h1>Loading....</h1>
	    				<p>Thanks for your patience...</p>
	    			</aside>
			)
		}

		if(this.state.hasSent){
			return (
				<aside className={`register ${this.props.visible ? "active" : "inactives"}`}>
	    				<a href="./" className="close" onClick={this.props.toggle()}>close</a>
	    				<p><br/></p>
	    				<p><br/></p>
	    				<h1>Thank you for giving us the opportunity to consider you.</h1>
	    				<p>Thank you very much for your expression of interest.</p>
	    				<p>Thank you for your application for our advertised position.</p>
	    				<p><br/></p>
	    				<input type="submit" value="OK Thanks!" className="button" onClick={this.props.toggle()}/>
	    			</aside>
			)
			return;
		}

    		return(
	    		<aside className={`register ${this.props.visible ? "active" : "inactives"}`}>
	    			<a href="./" className="close" onClick={this.props.toggle()}>close</a>
	    			{this.state.hasError ? (
			    				<div className="error">{this.state.hasError}</div>
			    			) : null}
	    			<h1>Please register your corporate working information:</h1>

	    			<p>Fill out this TPS-report</p>
	    			<form action="" onSubmit={this.sendMessage}>
	    				<p>
	    					<label htmlFor="">Name: </label>
	    					<input type="text"  name="name" placeholder="Office guy 1337" onChange={this.handleChange} value={this.state.name}/>
	    				</p>
	    				<p>
	    					<label htmlFor="">Company: </label>
	    					<input type="text"  name="companyName" placeholder="DiscoBase9" onChange={this.handleChange} value={this.state.companyName}/>
	    				</p>
	    				<p>
	    					<label htmlFor="">Mail: </label>
	    					<input type="text" required name="mail" placeholder="mail@mail.com" onChange={this.handleChange} value={this.state.mail}/>
	    				</p>

	    				<p>
	    					<label htmlFor="">Message: </label>
	    					<input type="text"  name="message" placeholder="I really like the developers!" onChange={this.handleChange} value={this.state.message}/>
	    				</p>
	    				<p>
	    					<input type="checkbox" name="agree" checked={this.state.agree} onChange={this.handleCheckbox} /> I agree to everything.
	    				</p>
	    				<hr/>
		    				<div className="msg">
				    			<p>Dear Corporate!</p>

				    			{this.state.name ? (
				    				<p>My name is <b>{this.state.name}</b> and I am here to apply for the position as moon manager.</p>
				    			) : null}

				    			<p><br/></p>

				    			{this.state.companyName ? (
				    				<p>I think this is a brilliant opportunity for all of us and under my leadership I will make sure our new company <b>{this.state.companyName}</b> will succeed.</p>
				    			) : null}

				    			<p><br/></p>

				    			{this.state.mail ? (
				    				<p>Please send more information and news about the progress of Lunar Soil to <br/><b className="mail">{this.state.mail}</b>.</p>
				    			) : (
				    				<p>I forgot to fill in my mail...</p>
				    			)}

				    			<p><br/></p>

				    			{this.state.message ? (
				    				<p>I love the moon! As a last message I would like to say thank you and <b>{this.state.message}</b></p>
				    			) : null}
				    			<p><br/></p>
				    			{this.state.name && this.state.companyName ? (
				    				<p>Yours sincerely {this.state.name} - {this.state.companyName}</p>
				    			) : null}

				    			{this.state.agree ? (
				    				<p><em>P.S! I don't care what you do to me, please send me to the moon!</em></p>
				    			) : null}
			    			</div>

			    			{this.state.hasError ? (
			    				<div className="error">{this.state.hasError}</div>
			    			) : null}
			    			<p><br/></p>
			    			{
			    				this.state.mail ? (
			    					<input type="submit" value="submit" className="button"/>
			    				) : null
			    			}
			    			<a href="./" className="close" onClick={this.props.toggle()}>close</a>


	    			</form>
	    		</aside>
    		)
	}
  }
