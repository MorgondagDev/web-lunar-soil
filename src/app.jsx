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
			scroll:0
		}
		this.toggleRegister = this.toggleRegister.bind(this);
		this.closeRegister = this.closeRegister.bind(this)
		if(typeof window != "undefined"){
			document.addEventListener('keydown', this.closeRegister)
		}

	}

	closeRegister(e){
		if(e.key == "Escape" && this.state.register){
			this.toggleRegister();
			//this.setState({register:false})
		}
	}

	componentDidMount(){
		/*
		fetch('http://static.morgondag.nu/social.json', {
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
				news: json.news[0],
				archive: json.news[1]
			})
		}).catch((ex) => {
			console.log(ex)
		})
		*/

		if(typeof window != "undefined"){
			try {
				if(window.location.search.indexOf('signup') > -1){
					this.toggleRegister();
				}
			} catch(e){

			}

			let video = window.document.querySelector('.videoplayer');
			video.addEventListener('canplaythrough', () => { video.play(); })
		}
	}

	renderNews(){
		if(this.state.news){
			return (
				<div>
					<a href={this.state.news.url} title={this.state.news.title}><h2>{this.state.news.title}</h2></a>
					<a href={this.state.news.url} title={this.state.news.title}><p><em>{moment(this.state.news.date).format('MMMM DD, YYYY')}</em></p></a>
					<p>{this.state.news.description} </p>
				</div>
			)
		}
	}

	renderArchive(){
		if(this.state.archive){
			return (
				<div>
					<p><br/></p>
					<a href={this.state.archive.url}  title={this.state.archive.title}><h3>{moment(this.state.archive.date).format('MMMM DD, YYYY')} - {this.state.archive.title}</h3></a>
					<p><br/></p><p><br/></p>
				</div>
			)
		}
	}

	toggleRegister(e){
		if(e){
			e.preventDefault();
		}
		if(typeof window != "undefined"){
			if(!this.state.register){
				this.setState({scroll:window.pageYOffset})
			}
			this.setState({register: !this.state.register})

				document.querySelector('html').classList.toggle("noscroll")

			if(this.state.register){
				window.scrollTo(0, this.state.scroll);
			}
		}
	}

	render(){
		return(
			<section>

				<div className="video-background">
					<video className="videoplayer" autoPlay loop muted playsInline poster="./lunar-soil_stairs.jpg?1">
						<source type="video/mp4" src="./clips/background.mp4?2"/>
						<source type="video/webm" src="./clips/background.webm?2"/>
						<img src="lunar-soil_stairs.jpg" alt=""/>
					</video>
				</div>
				<img className="logo" src="./logo.png" alt="Lunar Soil" title="Lunar Soil"/>

				<p><br/></p>

				<h1>Your interstellar career is now within reach!</h1>
				<p>Welcome to Lunar Soil. Your aspiration as a builder, entrepreneur and space explorer has been heard! Pick a sponsor and get ready to claim that rock!</p>

				<p><br/></p>

				<h2 className="description-title">Lunar Soil is a 3rd person moon-based management game about you, your crew and your corporate sponsorship.</h2>
				<p><br/></p>
				<Apply onOpen={()=> this.toggleRegister}/>
				<p><br/></p>

				<hr/>

				<article>
					<h1>Setting up your new company</h1>
					<p>Before beginning managing your moonbase you need to set up a company and pick a sponsor! Choose between a handful of mysterious conglomerates that have been monopolized the supply of space fuel for decades. Each come with its own unique opportunities, requests, threats and ideas.</p>
				</article>

				<article>
					<img src="./lunar-soil_water_room.jpg?1" alt="Lunar Soil - Water Room" title="Lunar Soil - Water Room"/>
    				<br/>
					<h1>Working onboard your new Moonbase</h1>
					<p>A steady income will help you pay your employees salaries, food and trading goods or let you get andvanced machinery. You choose how you want to run your base, as well as staying alive. Here are some basic ways to keep your company busy:</p>
					<p><br/></p>
					<ul className="jobs">
						{jobs.map((job, index)=>{
							return(
								<li key={index}>
									<h2>{job.type}</h2>
									<p>{job.description}</p>
								</li>
							)
						})}
					</ul>
					<p><br/></p>

				</article>
				<Apply onOpen={()=> this.toggleRegister}/>

				<article>
					<hr/>
					<h1>Expand and decorate your base</h1>
					<p>Decorate your base with crafted items or traded goods to feel at home. Expand your base as your company grows.</p>
				</article>

				<article>
					<h1>The crew of Lunar Soil</h1>

					<p>Managing, maintaining and recruiting a diverse and effective crew is an important step to a successful moonbase operation.</p>
					<p>Meet some of the preselected example "experts" available for hire:</p>
					<p><em>* The sponsor removes itself from any responsibilities regarding the crew, their abilities and consequences of the unlikely event that the consultants may or may not be actual experts at anything, or capable of doing anything or any damage related to the daily work on your moonbase. The experts below might just be fictional characters.</em></p>
					<p><br/></p>
					<Apply onOpen={()=> this.toggleRegister}/>
					<p><br/></p>
					<p><br/></p>

					<ul className="crew">
						{
							experts.map((character, index) => {
								return(
									<li key={index}>
										<video width="300"  autoPlay loop muted playsInline>
											<source src={`./clips/${character.video}.webm`} type="video/webm" />
											<source src={`./clips/${character.video}.mp4`} type="video/mp4" />
										</video>
										<p>{character.name}</p>
										<p>{character.title}</p>
										<p></p>
										<p className="description">{character.description}</p>
									</li>
								)
							})
						}
					</ul>
				</article>

				<article>
					<img src="./lunar-soil_character.jpg?1" alt="Lunar Soil - Character" title="Lunar Soil - Character"/>
    				<br/>
					<h1>Crew cooperation</h1>
					<p>You manage your crew by switching between playing as yourself and as your employees. Crew cooperation is the key to reach your goals. Your crew is the fuel for your organization. Keep them happy and sound to create a good work enviroment. If you ignore their wishes and needs they may get depressed or mad. Remember that you are on a very isolated place where you only have each other...</p>
				</article>

				<article>
				<img src="./lunar-soil_statue.jpg?1" alt="Lunar Soil - Statue" title="Lunar Soil - Statue"/>
    				<br/>
					<h1>Put on your spacesuit and explore the unkown</h1>
					<p>Enjoy the rocky landscape, hang out with your coworkers, burn a body, throw someone into a meat grinder or lock them into an airlock. Explore the moon with your spacesuit and make new discoveries.</p>
					<p><em>* Visiting the outside of your moonbase without your spacesuit will turn you into a corpse within seconds.</em></p>
				</article>

				<article>
					<h1>Apply as a manager today!</h1>
					<p><br/></p>
					<Apply onOpen={()=> this.toggleRegister}/>
				</article>
				<Register visible={this.state.register} toggle={()=> this.toggleRegister} />
				<p><br/></p>
				<hr/>

				<article>
					{this.renderNews()}
					{/*this.renderArchive()*/}
				</article>

				<Footer />
			</section>
		)
	}
}
