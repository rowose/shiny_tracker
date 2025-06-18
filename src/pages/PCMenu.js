import BG from "../images/1719829.png"
import PCPokemon from "../components/PCPokemon"
import missing from "../images/missing_pokemon.png"
import { useState, useEffect } from "react";

function PCMenu ({shiniesData, removeShiny, setData}) {
	const [shinySelected, setShinySelected] = useState(null);
	const [shinyPreview, setShinyPreview] = useState(null);
	
	useEffect(() => {
		refreshData();
	}, [shiniesData])

	const refreshData = () => {
		setData(shiniesData);
		}

	const onSelectShiny = (shiny) => {
		setShinySelected(shiny);
	};

	const onPreviewShiny = (shiny) => {
		setShinyPreview(shiny);
	}

	const onClickDelete = (shiny) => {
		setShinySelected(null);
		setShinyPreview(null);
		removeShiny(shiny)
	}

	const shinies = shiniesData.map((data) => {
		return <PCPokemon key={data.id} selectedShiny={shinySelected} data={data} onSelectShiny={onSelectShiny} onPreviewShiny={onPreviewShiny}/>
	});

	return (
		<div className="w-full h-[98%] flex lg:flex-row flex-col items-center justify-center bg-contain">
			<div className="lg:h-full h-[30%] lg:w-[30%] w-[100%] lg:mr-[4%] mr-[0%] lg:mb-[0%] mb-[5%] rounded-lg border-4 border-gray-300 flex lg:flex-col flex-row items-center bg-cover" style={{ backgroundImage: `url(${BG}` }}>
				<div className="w-[50%] flex flex-col justify-center items-center">
					<div className="lg:text-[2.5vw] text-[0%] text-gray-300 font-VT323">
						INFO
					</div>
					<div className="lg:size-[18vw] size-[30vw] rounded-lg border-gray-300 bg-no-repeat bg-center bg-contain z-0 scale-100 pointer-events-none origin-bottom" style={{ backgroundImage: `url(${shinyPreview ? shinyPreview.sprite : shinySelected ? shinySelected.sprite : missing}` }}/>
				</div>
				<div className="pt-[3%] lg:w-full w-[50%] lg:h-[48%] h-full lg:mt-[6%] mt-[0%] lg:rounded-b-lg rounded-b-none lg:rounded-r-none rounded-r-lg bg-black/50 lg:border-t-4 lg:border-l-0 border-l-4 border-gray-300 flex flex-col items-center text-gray-300 lg:text-[1.8vw] text-[5vw] font-VT323">
					<p className="w-full pl-[5%]">
						Name: {shinyPreview ? shinyPreview.name : shinySelected ? shinySelected.name : ""}	
					</p>
					{/* <p className="w-full">
						Encounter Type: Random Encounters
					</p> */}
					<p className="w-full pl-[5%]">
						Encounters: {shinyPreview ? shinyPreview.encounters : shinySelected ? shinySelected.encounters : 0}
					</p>
					{/* <p className="w-full">
						Game: BW2
					</p> */}
					{shinySelected ? <button className="mt-[40%] text-white border-2 border-white rounded-lg lg:w-[35%] w-[50%] lg:h-[10%] h-[15%] flex flex-row justify-center items-center hover:bg-white focus:bg-white hover:text-black focus:text-black transition-color duration-300" onClick={() => {onClickDelete(shinySelected)}}>
						<p>
							DELETE									
						</p>
					</button> : null}
				</div>
			</div>
			<div className="flex flex-col items-center lg:w-[58%] w-[100%] lg:h-full h-[60%]">
				<div className="flex lg:w-[50%] w-[0%] lg:h-[12%] h-[0%] lg:mt-[2%] lg:mb-[2%] lg:border-4 border-0 border-gray-300 text-gray-300 rounded-lg justify-center items-center lg:text-[2.5vw] text-[0vw] font-VT323 bg-no-repeat bg-top" style={{ backgroundImage: `url(${BG}` }}>
					SHINIES
				</div>
				<div className="text-white w-full h-[84%] bg-center bg-cover rounded-lg grid lg:grid-cols-10 grid-cols-5 auto-rows-min border-4 border-gray-300 overflow-auto" style={{ backgroundImage: `url(${BG}` }}>
					{shinies}
				</div>
			</div>
		</div>
	)
}

export default PCMenu;