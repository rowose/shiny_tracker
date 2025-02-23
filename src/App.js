import TrackersPage from "./pages/TrackersPage"
import Navbar from "./components/Navbar";
import { useLayoutEffect, useState, useRef } from "react";

function App() {
	const [trackerDataList, setTrackerDataList] = useState([]);
	const [navbarHeight, setNavbarHeight] = useState(0);

	useLayoutEffect(() => {
		getData();
	}, [])

	const ref = useRef();

	const fetchPokemonData = async (pokemon) => {
		pokemon = pokemon.toLowerCase();
		
		if (pokemon === "shaymin")
			pokemon = "shaymin-land";
		else if (pokemon === "giratina")
			pokemon = "giratina-altered"
		else if (pokemon === "meloetta")
			pokemon = "meloetta-aria"
		else if (pokemon === "darmanitan")
			pokemon = "darmanitan-standard"
		const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
		const data = await response.json();

		setTrackerDataList([...trackerDataList, {data: data, count: 0, position: {x: 0, y: 0}, sprite: null, locked: false}]);
	}

	const fetchRegionData = async (region) => {
		const response = await fetch('https://pokeapi.co/api/v2/region/' + "kanto");
		const data = await response.json();

		console.log(data);
	}

	const getData = () => {
		const data = JSON.parse(localStorage.getItem('trackerDataList'));
		if (data)
			setTrackerDataList(data);
	};

	const setData = (data) => {
		setTrackerDataList(data);
		localStorage.setItem('trackerDataList', JSON.stringify(trackerDataList));
	}

	const removeTracker = (id) => {
		setTrackerDataList(trackerDataList.filter((tracker) => {
			if (tracker.data.id !== id)
				return {data: tracker.data, count: tracker.count, poisition: tracker.position};
			return ;
		}
	));
	}

	fetchRegionData();

	return (
		<div ref={ref} className="w-screen min-h-screen h-fit bg-gradient-to-tr from-slate-950 to-slate-900 font-VT323">
			<Navbar fetchPokemon={fetchPokemonData} setNavbarHeight={setNavbarHeight}/>
			<TrackersPage trackersData={trackerDataList} removeTracker={removeTracker} setData={setData} offsetY={navbarHeight} screenRef={ref}/>
		</div>
	)
}

export default App;