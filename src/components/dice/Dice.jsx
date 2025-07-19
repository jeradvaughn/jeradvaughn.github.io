import './dice.css'

const Dice = ({ value, isHeld, handleHold }) => {
	const styles = {
		backgroundColor: isHeld ? '#59E391' : 'white',
	}
	return (
		<div className="dice" style={styles} onClick={handleHold}>
			<h2>{value}</h2>
		</div>
	)
}

export default Dice
