
import './button.css'

const Button = ({ handleClick, handleWin }) => {
	return (
		<>
			<button onClick={handleClick}  className="btn">
				{handleWin ? 'New Game' : 'Roll'}
			</button>
		</>
	)
}

export default Button