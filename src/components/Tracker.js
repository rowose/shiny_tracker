import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { FaGear, FaLock, FaLockOpen, FaTrashCan, FaEye, FaEyeSlash } from "react-icons/fa6";

function Tracker ({data, id, focusedID, handleFocusClick, handleCloseClick, refreshData}) {
	const [count, setCount] = useState(data.count);
	const [position, setPosition] = useState(data.position);
	const [increment, setIncrement] = useState(1);
	const [optionsUp, setOptionsUp] = useState(false);
	const [lockPosition, setLockPosition] = useState(false);

	const ref = useRef();

	useLayoutEffect(() => {
		data.position = position;
		data.count = count;
		refreshData();

		if (id == focusedID)
			window.addEventListener("keydown", handleKeyPress, true);

		return () => window.removeEventListener("keydown", handleKeyPress, true);
	}, [count, focusedID, position])

	const handleKeyPress = (event) => {
		if (event.keyCode === 187)
			handleClick(increment);
		else if (event.keyCode === 189)
			handleClick(increment * -1);
	}

	const handleClick = (value) => {
		if (count + value >= 0)
			setCount(count + value);
	}

	const handleChangeCountMenuOptions = (event) => {
		setCount(parseInt(event.target.value));
	}

	const handleChangeIncrement = (event) => {
		if (event.target.value >= 1)
			setIncrement(parseInt(event.target.value));
	}

	const handeClickOptions = () => {
		setOptionsUp(!optionsUp);
	}

	const handleClickLock = () => {
		setPosition(data.position);
		setLockPosition(!lockPosition);
	}

	const handleDrag = () => {
		if (!lockPosition)
			setPosition({ x: ref.current.getBoundingClientRect().x, y: ref.current.getBoundingClientRect().y })
	}

	let draggableProps = {
		defaultPosition: position
	}

	if (lockPosition)
		draggableProps = {...draggableProps, handle:"none"};
	else if (!lockPosition)
		draggableProps = { ...draggableProps, onDrag: handleDrag };

	return (
		<Draggable {...draggableProps}>
			<div ref={ref} className="aspect-[4/5] min-w-[280px] min-h-[310px] w-[12%] absolute flex flex-col">
				<div className="w-full h-[10%] bg-slate-500 rounded-t-lg flex flex-row items-center justify-end">
					<p className="text-white w-full pl-[10px] text-[0.8vw]">{(data.data.name.charAt(0).toUpperCase() + data.data.name.slice(1)).split('-')[0]}</p>
					{lockPosition ? <FaLock className="text-yellow-500 h-[30px] w-[30px] mx-[1%] cursor-pointer" onClick={handleClickLock}/>
						: <FaLockOpen className="text-yellow-500 h-[30px] w-[30px] mx-[1%] cursor-pointer" onClick={handleClickLock} />}
					<FaGear className="text-blue-500 h-[30px] w-[30px] mx-[1%] cursor-pointer" onClick={handeClickOptions}/>
					{id === focusedID ? <FaEye className="text-green-500 h-[30px] w-[30px] mx-[1%] cursor-pointer" onClick={() => handleFocusClick(id)}/>
						: <FaEyeSlash className="text-green-500 h-[30px] w-[30px] mx-[1%] cursor-pointer" onClick={() => handleFocusClick(id)} />}
					<FaTrashCan className="text-red-500 h-[30px] w-[30px] mr-[2%] ml-[1%] cursor-pointer" onClick={() => handleCloseClick(id)}/>
				</div>
				<div className="w-full h-[90%] p-[10px] bg-gray-900/80 rounded-b-lg">
					{!optionsUp ? 
						<div className="w-full h-full">
							<div className="w-full h-[85%] bg-no-repeat bg-center bg-contain z-0 scale-110 pointer-events-none origin-bottom" style={{ backgroundImage: `url(${data.data?.sprites?.other?.showdown?.front_shiny}` }}></div>
							<div className="w-full flex flex-row text-white">
								<button className="text-5xl z-10" onClick={() => handleClick(increment * -1)}>-</button>
								<p className="text-white w-full text-5xl text-center z-10">{count}</p>
								<button className="text-5xl z-10" onClick={() => handleClick(increment)}>+</button>
							</div>
						</div> :
						<div className="w-full h-full flex flex-col">
							<label className="text-white">
								Increment :
								<input type="number" value={increment} onChange={handleChangeIncrement} className="ml-[5%] bg-transparent border-2 border-white rounded-lg text-center"/>
							</label>
							<label className="text-white">
								Count :
								<input type="number" value={count} onChange={handleChangeCountMenuOptions} className="ml-[5%] bg-transparent border-2 border-white rounded-lg text-center" />
							</label>
						</div>
					}
				</div>
			</div>
		</Draggable>
	)
}

export default Tracker;