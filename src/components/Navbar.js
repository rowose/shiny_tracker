import { useState, useRef, useLayoutEffect } from "react";
import { TbPokeball } from "react-icons/tb";

function Navbar({ fetchPokemon, setNavbarHeight, onClickPokeball}) {
	const [value, setValue] = useState("");

	useLayoutEffect(() => {
		setNavbarHeight(ref.current.getBoundingClientRect().height)
	}, [])

	const ref = useRef();

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (value.length > 0)
			fetchPokemon(value);
		setValue('');
	};

	return (
		<div ref={ref} className="w-screen lg:h-[8%] h-[10%] flex flex-row items-center">
			<TbPokeball className="text-[2.5vw] text-white ml-[1%] mb-[3%] mr-[35%] cursor-pointer" onClick={onClickPokeball}/>
			<form onSubmit={handleSubmit} className="lg:w-[20%] w-[80%] h-full flex flex-col items-center mt-[2%]">
				<input value={value} onChange={handleChange} placeholder="Pokemon name or Pokedex ID" className="w-full bg-transparent rounded-lg border-2 border-white text-white lg:text-[1.2vw] text-[4vw] text-center lg:mb-[5%] mb-[2%] outline-none hover:bg-white focus:bg-white hover:text-black focus:text-black transition-color duration-300" />
				<button type="submit" onClick={handleSubmit} className="w-[30%] lg:text-[1.2vw] text-[4vw] text-white border-2 border-white rounded-lg hover:bg-white hover:text-black transition-color duration-300">Search</button>
			</form>
		</div>
	)
}

export default Navbar;