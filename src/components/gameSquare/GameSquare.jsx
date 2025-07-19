import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Dice from '../dice/Dice'
import Button from '../button/Button'
import './gamesquare.css'
import GameInfo from '../gameInfo/GameInfo'

const GameSquare = () => {
	const [time, setTime] = useState(0)
	const [timeActive, setTimeActive] = useState(false)

	const [items, setItems] = useState([])

	useEffect(() => {
		localStorage.setItem('time', JSON.stringify(time))
		localStorage.setItem('roll', JSON.stringify(roll))
	}, [time])

	useEffect(() => {
		let interval = null
		if (timeActive === true) {
			interval = setInterval(() => {
				setTime((time) => time + 10)
			}, 10)
		} else {
			clearInterval(interval)
			
		}
		return () => {
			clearInterval(interval)
			
		}
	}, [timeActive])

function handleClick(){
	setTimeActive(true)
	rollDice()
}

	function allNewDice() {
		const newDice = []
		for (let i = 0; i < 10; i++) {
			newDice.push(generateDie())
		}
		return newDice
	}
	function generateDie() {
		return {
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid(),
		}
	}
	const [roll, setRoll] = useState(0)
	function rollDice() {
		if (!tenzies) {
			setDice((oldDice) =>
				oldDice.map((die) => {
					return die.isHeld ? die : generateDie()
				})
			)
			
			setRoll((prevRoll) => prevRoll + 1)
		} else {
			setTenzies(false)
			setDice(allNewDice)
			setRoll(0)
			setTime(0)
		}
	}
	function hold(id) {
		setDice((oldDice) =>
			oldDice.map((die) => {
				return die.id === id ? { ...die, isHeld: !die.isHeld } : die
			})
		)
	}
console.log('https://opentdb.com/api.php?amount=10')
	const [dice, setDice] = useState(allNewDice)
	const [tenzies, setTenzies] = useState(false)
	const diceArray = dice.map((die) => (
		<Dice
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			handleHold={() => hold(die.id)}
		/>
	))

	useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld)
		const firstValue = dice[0].value
		const allSameValue = dice.every((die) => die.value === firstValue)
		
		if (allHeld && allSameValue) {
			setTenzies(true)
			console.log('YOU WON!')
			setTimeActive(false)
			
		}
	}, [dice])

	return (
		<div className="gamesquare">
			{tenzies && <Confetti />}
			<div className="header-text">
				<h1 className="header-title">Tenzies!</h1>
				<p>
					Roll until all dice are the same! Click each dice to freeze it at its
					current value between rolls.
				</p>
			</div>
			<div className="dice-container">{diceArray}</div>
			<Button
				handleWin={tenzies}
				handleClick={handleClick}
				
			/>
			<GameInfo roll={roll} time={time} />
			{/* <h3>{JSON.parse(localStorage.getItem('roll'))}</h3> */}
		</div>
	)
}

export default GameSquare
