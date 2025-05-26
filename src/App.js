import TrackersPage from "./pages/TrackersPage"
import Navbar from "./components/Navbar";
import PCMenu from "./components/PCMenu";
import { useLayoutEffect, useState, useRef } from "react";
import Modal from 'react-modal';

function App() {
	const [trackerDataList, setTrackerDataList] = useState([]);
	const [shiniesDataList, setShiniesDataList] = useState([]);
	const [navbarHeight, setNavbarHeight] = useState(0);
	const [modalIsOpen, setModalIsOpen] = useState(false);

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

	// const fetchRegionData = async (region) => {
	// 	const response = await fetch('https://pokeapi.co/api/v2/region/' + "kanto");
	// 	const data = await response.json();
	// }

	const getData = () => {
		const trackerData = JSON.parse(localStorage.getItem('trackerDataList'));
		const shiniesData = JSON.parse(localStorage.getItem('shiniesDataList'))
		if (trackerData)
			setTrackerDataList(trackerData);
		if (shiniesData)
			setShiniesDataList(shiniesData);
	};

	const setData = (data) => {
		setTrackerDataList(data);
		localStorage.setItem('trackerDataList', JSON.stringify(trackerDataList));
	}

	const addShiny = (shiny) => {
		setShiniesDataList([...shiniesDataList, shiny])
		localStorage.setItem('shiniesDataList', JSON.stringify(shiniesDataList));
	};

	const removeTracker = (id) => {
		setTrackerDataList(trackerDataList.filter((tracker) => {
			if (tracker.data.id !== id)
				return {data: tracker.data, count: tracker.count, poisition: tracker.position};
			return ;
		}
	));
	}

	const onClickPokeball = () => {
		setModalIsOpen(true);
	};

	const onRequestClose = () => {
		setModalIsOpen(false);
	};

	// fetchRegionData();

	const customStyles = {
		content: {
			height: '90%',
			marginLeft: '8%',
			marginTop: '0.5%',
			backgroundColor: "rgba(255, 255, 255, 0)",
			padding: "0%",
			top: "40px",
			left: "40px",
			right: "40px",
			bottom: "40px",
			border: "0px solid #ccc",
		},
		overlay: {
			backgroundColor: "rgba(0, 0, 0, 0)"
		}
	  };

	return (
		<div ref={ref} className="w-screen min-h-screen h-fit bg-gradient-to-tr from-slate-950 to-slate-900 font-VT323">
			<Modal style={customStyles}
				isOpen={modalIsOpen}
				onRequestClose={onRequestClose}
			>
				<PCMenu shiniesData={shiniesDataList}/>
			</Modal>
			<Navbar fetchPokemon={fetchPokemonData} setNavbarHeight={setNavbarHeight} onClickPokeball={onClickPokeball}/>
			<TrackersPage trackersData={trackerDataList} addShiny={addShiny} removeTracker={removeTracker} setData={setData} offsetY={navbarHeight} screenRef={ref}/>
		</div>
	)
}

export default App;