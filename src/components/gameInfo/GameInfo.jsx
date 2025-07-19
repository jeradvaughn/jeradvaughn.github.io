import React from 'react'
import './gameinfo.css'

const GameInfo = ({ roll, time}) => {
	return (
		<div className="gameinfo-text">
			<h3>Total Rolls: {roll} </h3>
			<h3>Time: {time}</h3>
		</div>
	)
}

export default GameInfo
