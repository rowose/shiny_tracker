import { useState } from "react";

function Navbar({fetchPokemon}) {
	const [value, setValue] = useState("");

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		fetchPokemon(value);
		setValue('');
	};

	return (
		<div className="w-screen h-[8%] fixed flex flex-row justify-center items-center">
			<form onSubmit={handleSubmit} className="w-[20%] h-full flex flex-col items-center mt-[2%]">
				<input value={value} onChange={handleChange} placeholder="Pokemon name or Pokedex ID" className="w-full bg-transparent rounded-lg border-2 border-white text-white text-[1.2vw] text-center mb-[5%] outline-none hover:bg-white focus:bg-white hover:text-black focus:text-black transition-color duration-300"/>
				<button type="submit" onClick={handleSubmit} className="w-[30%] text-[1.2vw] text-white border-2 border-white rounded-lg hover:bg-white hover:text-black transition-color duration-300">Search</button>
			</form>
		</div>
	)
}

export default Navbar;