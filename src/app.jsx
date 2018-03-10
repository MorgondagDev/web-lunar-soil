import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

import Logo from './logotype.jsx'

import experts from './experts.json'
import jobs from './jobs.json'
import sponsors from './sponsors.json'

import Footer from './footer.jsx'
import Register from './register.jsx'


const Apply = function({onOpen}){
	return (
		<a href="./" className="button" title="Apply to Lunar Soil space-program" onClick={onOpen()}>Apply now</a>
	)
}

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			news: false,
			archive: false,
			register: false,
			scroll:0,
			hideSignup: false
		}

		this.hideSignupForm = this.hideSignupForm.bind(this)

		if(typeof window != "undefined"){
			if(localStorage.getItem("hidesignup")){
				this.state.hideSignup = true;
			}
			document.addEventListener('keydown', this.closeRegister)
		}
	}


	hideSignupForm(){
		this.setState({hideSignup: true})
		if(typeof window != 'undefined'){
			localStorage.setItem("hidesignup", true)
		}
	}


	componentDidMount(){

		fetch('https://lunar-soil.com/social.json', {
			method: 'get',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			cors: true
		})
		.then((res) => {
			return res.json()
		}).then((json) => {
			this.setState({
				news: json.blog
			})
		}).catch((ex) => {
			console.log(ex)
		})

		if(typeof window != "undefined"){
			let video = window.document.querySelector('.videoplayer');
			video.addEventListener('canplaythrough', () => { video.play(); })
		}
	}

	renderNews(){
		if(this.state.news){
			return(
				<ul  className="news">
				{this.state.news.map((item, index)=>{
					return(
						<li key={index}>
							<a href={item.url+'?lui=lunarsoil'} className="title" title={item.title}>
								<img src={item.img} alt=""/>
								<div className="meta">
									<h2>{item.title}</h2>
									<p>{item.date}</p>
								</div>
							</a>
						</li>
					)
				})}
				<div className="clear"></div>
				</ul>
			)
		}
	}

	render(){
		return(
			<section>
				<div className={this.state.hideSignup ? "signupCard hidden": "signupCard"}>
	  				<form action="http://send.morgondag.nu/subscribe" method="POST" acceptCharset="utf-8">
					      	<div className="box">
					      		<div className="inputfield">
					      			<p>Free game & news:</p>
					      		</div>
					      		<div className="inputfield">
					      			<input type="text" name="name" id="name" placeholder="Name/Alias" required title="Name/Alias"/>
					      		</div>
					      		<div className="inputfield">
					        		<input type="email" name="email" id="email" placeholder="mail@mail.com" required title="Mail" />
					        	</div>
					        	<input type="hidden" name="list" defaultValue="XgSgS5WieFsaj5aMSyZoKQ" />
					        	<input type="hidden" name="ref" defaultValue="web-lunar-soil" />
					        	<input type="submit" name="submit" id="submit" className="button" value="Sign up" title="Sign up" />
					        	 <a href="#" className="close" onClick={this.hideSignupForm}>x</a>
				        	</div>
				      </form>

				</div>
				<div className="video-background">
					<video className="videoplayer" autoPlay loop muted playsInline poster="./lunar-soil_stairs.jpg?1">
						<source type="video/mp4" src="./clips/background.mp4?2"/>
						<source type="video/webm" src="./clips/background.webm?2"/>
						<img src="lunar-soil_stairs.jpg" alt=""/>
					</video>
				</div>
				<img className="logo" src="./logo.png" alt="Lunar Soil" title="Lunar Soil"/>

				<div className="uppercut-boom">
					<h1>Your interstellar career is now within reach!</h1>
					<h2 className="description-title">Lunar Soil is a 3rd person moon-based management game about you, your AI crew and your corporate sponsorship.</h2>
					<Register/>
				</div>
				<p><br/></p>
				<img src="lunar-soil_the_garden.jpg?1" alt="Lunar Soil - The Garden" title="Lunar Soil - The Garden"/>
				<hr/>

				<article>
					<h1>Welcome to Lunar Soil</h1>
					<p><br/></p>
					<p> Explore a new world, create, build and manage a moonbase. Trade goods, gear up and go on adventures with your trusted AI crew.</p>

				</article>

				<p><br/></p>
				<p><br/></p>
				<p><br/></p>
				<img src="./lunar-soil_gold.jpg?1" alt="Lunar Soil - Water Room" title="Lunar Soil - Water Room"/>
    				<br/>

				<article>
					<h1>Explore a new moon</h1>
					<p>Explore the calm deadly space with nothing but a spacesuit and a pickaxe.</p>
					<p>Hire a small crew of experts and explore the unknown.</p>
					<p><br/></p>
				</article>
				<Register/>

				<p><br/></p>
				<p><br/></p>
				<img src="./lunar-soil-rocket-room.jpg?1" alt="Lunar Soil - The Rocket Room" title="Lunar Soil - The Rocket Room"/>
    				<br/>

				<article>
					<h2>Put on your spacesuit and join us</h2>
					<Register/>
				</article>
				<p><br/></p>
				<hr/>

				<article>
					<h2>DevLog & news</h2>
					{this.renderNews()}
				</article>

				<Footer />
			</section>
		)
	}
}
