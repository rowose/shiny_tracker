import { useLayoutEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { FaGear, FaLock, FaLockOpen, FaTrashCan, FaEye, FaEyeSlash } from "react-icons/fa6";
import Dropdown from "./Dropdown";
import MissingPokemon from "../images/missing_pokemon.png"

function Tracker ({data, id, focusedID, handleFocusClick, handleCloseClick, refreshData}) {
	const [dropdownValue, setDropdownValue] = useState(data.sprite);
	const [count, setCount] = useState(data.count);
	const [position, setPosition] = useState(data.position);
	const [increment, setIncrement] = useState(1);
	const [optionsUp, setOptionsUp] = useState(false);
	const [lockPosition, setLockPosition] = useState(data.locked);

	const ref = useRef();

	useLayoutEffect(() => {
		data.position = position;
		data.count = count;
		data.sprite = dropdownValue;
		data.locked = lockPosition;
		refreshData();

		if (id === focusedID)
			window.addEventListener("keydown", handleKeyPress, true);

		return () => window.removeEventListener("keydown", handleKeyPress, true);
	}, [count, focusedID, position, dropdownValue, lockPosition])

	console.log(data);


	const getDropdownOptions = ((data) => {
		let ret = [];

		if (data.data.id <= 151)
		{
			if (data?.data?.sprites?.versions["generation-i"]["red-blue"]?.front_transparent)
				ret = [...ret, { label: "RB", value: data?.data?.sprites?.versions["generation-i"]["red-blue"]?.front_transparent }];
			if (data?.data?.sprites?.versions["generation-i"]["yellow"]?.front_transparent)
				ret = [...ret, { label: "Y", value: data?.data?.sprites?.versions["generation-i"]["yellow"]?.front_transparent }];
		}
		if (data.data.id <= 251)
		{
			if (data?.data?.sprites?.versions["generation-ii"]["gold"]?.front_transparent)
				ret = [...ret, { label: "G", value: data?.data?.sprites?.versions["generation-ii"]["gold"]?.front_transparent }];
			if (data?.data?.sprites?.versions["generation-ii"]["silver"]?.front_transparent)
				ret = [...ret, { label: "S", value: data?.data?.sprites?.versions["generation-ii"]["silver"]?.front_transparent }];
			if (data?.data?.sprites?.versions["generation-ii"]["crystal"]?.front_shiny)
				ret = [...ret, { label: "C", value: data?.data?.sprites?.versions["generation-ii"]["crystal"]?.front_shiny_transparent }];
		}
		if (data.data.id <= 386)
		{
			if (data?.data?.sprites?.versions["generation-iii"]["ruby-saphire"]?.front_shiny)
				ret = [...ret, { label: "RS", value: data?.data?.sprites?.versions["generation-iii"]["ruby-saphire"]?.front_shiny }];
			if (data?.data?.sprites?.versions["generation-iii"]["firered-leafgreen"]?.front_shiny)
				ret = [...ret, { label: "FRLG", value: data?.data?.sprites?.versions["generation-iii"]["firered-leafgreen"]?.front_shiny }];
			if (data?.data?.sprites?.versions["generation-iii"]["emerald"]?.front_shiny)
				ret = [...ret, { label: "E", value: data?.data?.sprites?.versions["generation-iii"]["emerald"]?.front_shiny }];
		}
		if(data.data.id <= 493)
		{
			if (data?.data?.sprites?.versions["generation-iv"]["diamond-pearl"]?.front_shiny)
				ret = [...ret, { label: "DP", value: data?.data?.sprites?.versions["generation-iv"]["diamond-pearl"]?.front_shiny }];
			if (data?.data?.sprites?.versions["generation-iv"]["heartgold-soulsilver"]?.front_shiny)
				ret = [...ret, { label: "HGSS", value: data?.data?.sprites?.versions["generation-iv"]["heartgold-soulsilver"]?.front_shiny }];
			if (data?.data?.sprites?.versions["generation-iv"]["platinum"]?.front_shiny)
				ret = [...ret, { label: "Pt", value: data?.data?.sprites?.versions["generation-iv"]["platinum"]?.front_shiny }];
		}
		if (data.data.id <= 649)
		{
			if (data?.data?.sprites?.versions["generation-v"]["black-white"]?.animated?.front_shiny)
				ret = [...ret, { label: "BW", value: data?.data?.sprites?.versions["generation-v"]["black-white"]?.animated?.front_shiny }];
		}
		if (data?.data?.sprites?.other?.showdown.front_shiny)
			ret = [...ret, { label: "Showdown", value: data?.data?.sprites?.other?.showdown.front_shiny }];

		return ret;
	});

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

	const handleDropdownChange = (value) => {
		setDropdownValue(value);
	}

	let draggableProps = {
		defaultPosition: position
	}

	if (lockPosition)
		draggableProps = {...draggableProps, handle:"none"};
	else if (!lockPosition)
		draggableProps = { ...draggableProps, onDrag: handleDrag};

	return (
		<Draggable {...draggableProps}>
			<div ref={ref} className="aspect-[4/5] lg:min-w-[280px] lg:min-h-[310px] lg:w-[12%] absolute flex flex-col shadow-2xl">
				<div className="w-full h-[10%] bg-slate-500 rounded-t-lg flex flex-row items-center justify-end">
					<p className="text-white w-full pl-[10px] lg:text-[1vw] text-[3vw] pointer-events-none">{(data.data.name.charAt(0).toUpperCase() + data.data.name.slice(1)).split('-')[0] + " - " + data.data.id}</p>
					{lockPosition ? <FaLock className="text-white h-[30px] w-[30px] mx-[1%] cursor-pointer hover:scale-110 transition-transform duration-100" onClick={handleClickLock}/>
						: <FaLockOpen className="text-white h-[30px] w-[30px] mx-[1%] cursor-pointer hover:scale-110 transition-transform duration-100" onClick={handleClickLock} />}
					<FaGear className="text-white h-[30px] w-[30px] mx-[1%] cursor-pointer hover:scale-110 transition-transform duration-100" onClick={handeClickOptions}/>
					{id === focusedID ? <FaEye className="text-white h-[30px] w-[30px] mx-[1%] cursor-pointer hover:scale-110 transition-transform duration-100" onClick={() => handleFocusClick(id)}/>
						: <FaEyeSlash className="text-white h-[30px] w-[30px] mx-[1%] cursor-pointer hover:scale-110 transition-transform duration-100" onClick={() => handleFocusClick(id)} />}
					<FaTrashCan className="text-white h-[30px] w-[30px] mr-[2%] ml-[1%] cursor-pointer hover:scale-110 transition-transform duration-100" onClick={() => handleCloseClick(id)}/>
				</div>
				<div className="w-full h-[90%] p-[10px] bg-gray-900/80 rounded-b-lg">
					{!optionsUp ? 
						<div className="w-full h-full">
							{data.data.sprites["back_default"] ?
								<div className="w-full h-[85%] bg-no-repeat bg-center bg-contain z-0 scale-110 pointer-events-none origin-bottom" style={{ backgroundImage: `url(${dropdownValue ? dropdownValue.value : data?.data?.sprites?.other?.showdown.front_shiny}` }}></div>
								: <div className="w-full h-[85%] bg-no-repeat bg-center bg-contain z-0 pointer-events-none origin-bottom" style={{ backgroundImage: `url(${MissingPokemon}` }}></div>}
							<div className="w-full flex flex-row text-white">
								<button className="lg:text-5xl text-[6vw] z-10 hover:scale-110 transition-transform duration-100" onClick={() => handleClick(increment * -1)}>-</button>
								<p className="text-white w-full lg:text-5xl text-[6vw] text-center z-10 pointer-events-none">{count}</p>
								<button className="lg:text-5xl text-[6vw] z-10 hover:scale-110 transition-transform duration-100" onClick={() => handleClick(increment)}>+</button>
							</div>
						</div> :
						<div className="w-full h-full flex flex-col justify-start">
							<label className="text-white flex flex-row justify-between w-full h-[10%]">
								<p className="lg:text-[0.7vw] text-[3vw] w-[33%]">Increment :</p>
								<input type="number" value={increment} onChange={handleChangeIncrement} className="ml-[5%] w-[65%] bg-transparent border-2 border-white rounded-lg text-center outline-none hover:bg-white focus:bg-white hover:text-black focus:text-black transition-color duration-300"/>
							</label>
							<label className="text-white flex flex-row justify-between w-full h-[10%]">
								<p className="lg:text-[0.7vw] text-[3vw] w-[33%]">Count :</p>
								<input type="number" value={count} onChange={handleChangeCountMenuOptions} className="ml-[5%] w-[65%] bg-transparent border-2 border-white rounded-lg text-center outline-none hover:bg-white focus:bg-white hover:text-black focus:text-black transition-color duration-300" />
							</label>
							{data.data.sprites["back_default"] ? <label className="text-white flex flex-row justify-between w-full h-[10%]">
								<p className="lg:text-[0.7vw] text-[3vw] w-[33%]">Sprite :</p>
								<div className="w-[65%] ml-[5%] bg-transparent border-2 border-white rounded-lg">
									<Dropdown options={getDropdownOptions(data)} value={dropdownValue} onChange={handleDropdownChange}/>
								</div>
							</label> : null}
						</div>
					}
				</div>
			</div>
		</Draggable>
	)
}

export default Tracker;