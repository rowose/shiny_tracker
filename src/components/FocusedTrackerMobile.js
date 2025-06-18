import { useLayoutEffect, useRef, useState } from "react";
import { FaGear, FaTrashCan, FaEye, FaEyeSlash } from "react-icons/fa6";
import Dropdown from "./Dropdown";
import MissingPokemon from "../images/missing_pokemon.png"
import { TbPokeball } from "react-icons/tb";
import {v4 as uuidv4} from 'uuid'

function FocusedTrackerMobile({ data, id, addShiny, focusedID, handleFocusClick, handleCloseClick, refreshData}) {
	const [dropdownValue, setDropdownValue] = useState(data.sprite);
	const [count, setCount] = useState(data.count);
	const [increment, setIncrement] = useState(1);
	const [optionsUp, setOptionsUp] = useState(false);

	const ref = useRef();

	useLayoutEffect(() => {
		data.count = count;
		data.sprite = dropdownValue;
		refreshData();

		if (focusedID.indexOf(id) > -1)
			window.addEventListener("keydown", handleKeyPress, true);

		return () => window.removeEventListener("keydown", handleKeyPress, true);
	}, [count, focusedID, dropdownValue])

	const getDropdownOptions = ((data) => {
		let ret = [];

		if (data.data.id <= 151) {
			if (data?.data?.sprites?.versions["generation-i"]["red-blue"]?.front_transparent)
				ret = [...ret, { label: "Red/Blue", value: data?.data?.sprites?.versions["generation-i"]["red-blue"]?.front_transparent }];
			if (data?.data?.sprites?.versions["generation-i"]["yellow"]?.front_transparent)
				ret = [...ret, { label: "Yellow", value: data?.data?.sprites?.versions["generation-i"]["yellow"]?.front_transparent }];
		}
		if (data.data.id <= 251) {
			if (data?.data?.sprites?.versions["generation-ii"]["gold"]?.front_transparent)
				ret = [...ret, { label: "Gold", value: data?.data?.sprites?.versions["generation-ii"]["gold"]?.front_transparent }];
			if (data?.data?.sprites?.versions["generation-ii"]["silver"]?.front_transparent)
				ret = [...ret, { label: "Silver", value: data?.data?.sprites?.versions["generation-ii"]["silver"]?.front_transparent }];
			if (data?.data?.sprites?.versions["generation-ii"]["crystal"]?.front_shiny)
				ret = [...ret, { label: "Crystal", value: data?.data?.sprites?.versions["generation-ii"]["crystal"]?.front_shiny_transparent }];
		}
		if (data.data.id <= 386) {
			if (data?.data?.sprites?.versions["generation-iii"]["ruby-saphire"]?.front_shiny)
				ret = [...ret, { label: "Ruby/Saphire", value: data?.data?.sprites?.versions["generation-iii"]["ruby-saphire"]?.front_shiny }];
			if (data?.data?.sprites?.versions["generation-iii"]["firered-leafgreen"]?.front_shiny)
				ret = [...ret, { label: "Fire Red/Leaf Green", value: data?.data?.sprites?.versions["generation-iii"]["firered-leafgreen"]?.front_shiny }];
			if (data?.data?.sprites?.versions["generation-iii"]["emerald"]?.front_shiny)
				ret = [...ret, { label: "Emerald", value: data?.data?.sprites?.versions["generation-iii"]["emerald"]?.front_shiny }];
		}
		if (data.data.id <= 493) {
			if (data?.data?.sprites?.versions["generation-iv"]["diamond-pearl"]?.front_shiny)
				ret = [...ret, { label: "Diamond/Pearl", value: data?.data?.sprites?.versions["generation-iv"]["diamond-pearl"]?.front_shiny }];
			if (data?.data?.sprites?.versions["generation-iv"]["heartgold-soulsilver"]?.front_shiny)
				ret = [...ret, { label: "Heartgold/Soulsilver", value: data?.data?.sprites?.versions["generation-iv"]["heartgold-soulsilver"]?.front_shiny }];
			if (data?.data?.sprites?.versions["generation-iv"]["platinum"]?.front_shiny)
				ret = [...ret, { label: "Platine", value: data?.data?.sprites?.versions["generation-iv"]["platinum"]?.front_shiny }];
		}
		if (data.data.id <= 649) {
			if (data?.data?.sprites?.versions["generation-v"]["black-white"]?.animated?.front_shiny)
				ret = [...ret, { label: "Black/White", value: data?.data?.sprites?.versions["generation-v"]["black-white"]?.animated?.front_shiny }];
		}
		if (data?.data?.sprites?.other?.showdown.front_shiny)
			ret = [...ret, { label: "Showdown", value: data?.data?.sprites?.other?.showdown.front_shiny }];

		return ret;
	});

	const handleKeyPress = (event) => {
		if (event.keyCode === 187 || event.keyCode === 61)
			handleClick(increment);
		else if (event.keyCode === 189 || event.keyCode === 173)
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

	const onClickCaught = () => {
		const shiny = new Object();

		shiny.name = data.data.name.charAt(0).toUpperCase() + data.data.name.slice(1).split('-')[0];
		shiny.encounters = count;
		shiny.sprite = dropdownValue ? dropdownValue.value : data?.data?.sprites?.other?.showdown.front_shiny;
		shiny.pcsprite = data?.data?.sprites?.versions["generation-viii"]?.icons?.front_default;
		shiny.id = uuidv4();
		addShiny(shiny)
		handleCloseClick(id);
	}

	const handleDropdownChange = (value) => {
		setDropdownValue(value);
	}

	return (
		<div>
			<div className="w-full h-full">
				<div ref={ref} className="h-[90dvh] flex flex-col shadow-2xl">
					<div className="w-full h-[7%] bg-slate-500 rounded-t-lg flex flex-row items-center justify-end">
						<p className="text-white w-full pl-[10px] text-[6vw] pointer-events-none">{(data.data.name.charAt(0).toUpperCase() + data.data.name.slice(1)).split('-')[0] + " - " + data.data.id}</p>
						<FaGear className="text-white h-[30px] w-[30px] mx-[1%] cursor-pointer hover:scale-110 transition-transform duration-100" onClick={handeClickOptions} />
						{focusedID.indexOf(id) > -1 ? <FaEye className="text-white h-[30px] w-[30px] mx-[1%] cursor-pointer hover:scale-110 transition-transform duration-100" onClick={() => handleFocusClick(id)} />
							: <FaEyeSlash className="text-white h-[30px] w-[30px] mx-[1%] cursor-pointer hover:scale-110 transition-transform duration-100" onClick={() => handleFocusClick(id)} />}
						<FaTrashCan className="text-white h-[25px] w-[25px] mr-[2%] ml-[1%] cursor-pointer hover:scale-110 transition-transform duration-100" onClick={() => handleCloseClick(id)} />
					</div>
					<div className="w-full h-[90%] p-[10px] bg-gray-900/80 rounded-b-lg">
						{!optionsUp ?
							<div className="w-full h-full">
								{data.data.sprites["back_default"] ?
									<div className="w-full h-[85%] bg-no-repeat bg-center bg-contain z-0 pointer-events-none origin-bottom" style={{ backgroundImage: `url(${dropdownValue ? dropdownValue.value : data?.data?.sprites?.other?.showdown.front_shiny}` }}></div>
									: <div className="w-full h-[85%] bg-no-repeat bg-center bg-contain z-0  pointer-events-none origin-bottom" style={{ backgroundImage: `url(${MissingPokemon}` }}></div>}
								<div className="w-full flex flex-row text-white">
									<button className="text-[20vw] ml-[2%] z-10 hover:scale-110 transition-transform duration-100" onClick={() => handleClick(increment * -1)}>-</button>
									<p className="text-white w-full text-[20vw] text-center z-10 pointer-events-none">{count}</p>
									<button className="text-[20vw] mr-[2%] z-10 hover:scale-110 transition-transform duration-100" onClick={() => handleClick(increment)}>+</button>
								</div>
							</div> :
							<div className="w-full h-full flex flex-col justify-start items-center">
								<label className="text-white flex flex-row justify-between w-full h-[7%] mb-[4%]">
									<p className="text-[6vw] w-[33%]">Increment :</p>
									<input type="number" value={increment} onChange={handleChangeIncrement} className="ml-[5%] w-[65%] text-[6vw] bg-transparent border-2 border-white rounded-lg text-center outline-none hover:bg-white focus:bg-white hover:text-black focus:text-black transition-color duration-300" />
								</label>
								<label className="text-white flex flex-row justify-between w-full h-[7%] mb-[4%]">
									<p className="text-[6vw] w-[33%]">Count :</p>
									<input type="number" value={count} onChange={handleChangeCountMenuOptions} className="ml-[5%] w-[65%] text-[6vw] bg-transparent border-2 border-white rounded-lg text-center outline-none hover:bg-white focus:bg-white hover:text-black focus:text-black transition-color duration-300" />
								</label>
								{data.data.sprites["back_default"] ? <label className="text-white flex flex-row justify-between w-full h-[7%] mb-[4%]">
									<p className="text-[6vw] w-[33%]">Sprite :</p>
									<div className="w-[65%] ml-[5%] text-[6vw] bg-transparent border-2 border-white rounded-lg">
										<Dropdown options={getDropdownOptions(data)} value={dropdownValue} onChange={handleDropdownChange} />
									</div>
								</label> : null}
								<button className="mt-[5%] text-white border-2 border-white rounded-lg w-[40%] h-[10%] flex flex-row justify-center items-center hover:bg-white focus:bg-white hover:text-black focus:text-black transition-color duration-300" 
										onClick={() => { 
											onClickCaught() 
										handleFocusClick(id)
										}
								}>
									<p>
										CAUGHT !									
									</p>
									<TbPokeball className="text-[5vw] ml-[5%]"/>
								</button>
							</div>
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default FocusedTrackerMobile;