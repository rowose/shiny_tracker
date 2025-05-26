import shadow from "../images/shadow.png"
import classNames from "classnames";

function PCPokemon ({selectedShiny, sprite, pcsprite, encounters, name, onSelectShiny, onPreviewShiny}) {
	
	const shiny = new Object();

	shiny.name = name
	shiny.encounters = encounters;
	shiny.sprite = sprite;
	shiny.pcsprite = pcsprite;

	const className = classNames(
		"w-full h-full bg-contain bg-no-repeat hover:-translate-y-4 transition duration-150 ease-in-out scale-110",
		selectedShiny?.name == name && selectedShiny?.encounters == encounters ? "-translate-y-4" : ""
	)

	return (
		<div 
			className="size-[5vw] bg-contain bg-no-repeat cursor-pointer bg-bottom"
			style={{ backgroundImage: `url(${shadow}` }}
			onClick={() => {onSelectShiny(shiny)}}
			onMouseOver={() => {
				onPreviewShiny(shiny)
				if (selectedShiny?.name == name && selectedShiny?.encounters == encounters)
					console.log("caca")
			}}
			onMouseLeave={() => {
				onPreviewShiny(null)
			}}
		>
			<div className={className} style={{ backgroundImage: `url(${pcsprite}` }} />
		</div>
	)
}

export default PCPokemon;