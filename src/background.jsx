import React, { Component } from 'react'
import ReactDOM from 'react-dom'



export default function(){
    return(
    		<div className="video-background">
			<video autoPlay loop >
				<source type="video/webm" src="./clips/background.webm?2"/>
				<source type="video/mp4" src="./clips/background.mp4?2"/>
			</video>
    		</div>
    )
  }
