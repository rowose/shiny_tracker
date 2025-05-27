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
		<div className="w-full h-full flex flex-row items-center justify-center bg-contain">
			<div className="h-full w-[30%] mr-[4%] rounded-lg border-4 border-gray-300 flex flex-col items-center bg-cover" style={{ backgroundImage: `url(${BG}` }}>
				<div className="text-[2.5vw] text-gray-300 font-VT323">
					INFO
				</div>
				<div className="size-[18vw] rounded-lg border-gray-300 bg-no-repeat bg-center bg-contain z-0 scale-100 pointer-events-none origin-bottom" style={{ backgroundImage: `url(${shinyPreview ? shinyPreview.sprite : shinySelected ? shinySelected.sprite : missing}` }}>

				</div>
				<div className="pl-[5%] pt-[5%] w-full h-[48%] mt-[6%] bg-black/50 border-t-4 border-gray-300 flex flex-col text-gray-300 text-[1.8vw] font-VT323">
					<p className="w-full">
						Name: {shinyPreview ? shinyPreview.name : shinySelected ? shinySelected.name : ""}	
					</p>
					{/* <p className="w-full">
						Encounter Type: Random Encounters
					</p> */}
					<p className="w-full">
						Encounters: {shinyPreview ? shinyPreview.encounters : shinySelected ? shinySelected.encounters : 0}
					</p>
					{/* <p className="w-full">
						Game: BW2
					</p> */}
					{shinySelected ? <button className="mt-[40%] ml-[30%] text-white border-2 border-white rounded-lg w-[35%] h-[10%] flex flex-row justify-center items-center hover:bg-white focus:bg-white hover:text-black focus:text-black transition-color duration-300" onClick={() => {onClickDelete(shinySelected)}}>
						<p>
							DELETE									
						</p>
					</button> : null}
				</div>
			</div>
			<div className="flex flex-col items-center w-[58%] h-full">
				<div className="flex w-[50%] h-[12%] mt-[2%] mb-[2%] border-4 border-gray-300 text-gray-300 rounded-lg justify-center items-center text-[2.5vw] font-VT323 bg-no-repeat bg-top" style={{ backgroundImage: `url(${BG}` }}>
					SHINIES
				</div>
				<div className="text-white w-full h-[84%] bg-center bg-cover rounded-lg grid grid-cols-10 auto-rows-min border-4 border-gray-300 overflow-auto" style={{ backgroundImage: `url(${BG}` }}>
					{shinies}
				</div>
			</div>
		</div>
	)
}

export default PCMenu;