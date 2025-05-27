import shadow from "../images/shadow.png"
import classNames from "classnames";

function PCPokemon ({selectedShiny, data, onSelectShiny, onPreviewShiny}) {
	const className = classNames(
		"w-full h-full bg-contain bg-no-repeat hover:-translate-y-4 transition duration-150 ease-in-out scale-110",
		selectedShiny?.name === data.name && selectedShiny?.encounters === data.encounters ? "-translate-y-4" : ""
	)

	return (
		<div 
			className="size-[5vw] bg-contain bg-no-repeat cursor-pointer bg-bottom"
			style={{ backgroundImage: `url(${shadow}` }}
			onClick={() => {onSelectShiny(data)}}
			onMouseOver={() => {
				onPreviewShiny(data)
			}}
			onMouseLeave={() => {
				onPreviewShiny(null)
			}}
		>
			<div className={className} style={{ backgroundImage: `url(${data.pcsprite}` }} />
		</div>
	)
}

export default PCPokemon;