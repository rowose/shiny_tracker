import { useState, useEffect, useRef } from "react";
import { GoChevronLeft } from "react-icons/go";
import classNames from "classnames";

function Dropdown({options, value, onChange}) {
	const [isOpen, setIsOpen] = useState(false);
	const divEl = useRef();

	useEffect(() => {
		const handler = (event) => {
			if (!divEl.current)
				return ;
			
			if (!divEl.current.contains(event.target))
				setIsOpen(false);
		};

		document.addEventListener('click', handler, true);

		return () => document.removeEventListener('click', handler);
	}, []);

	const handleClick = (currentIsOpen) => {
		setIsOpen((currentIsOpen) => !currentIsOpen);
	};

	const handleOptionClick = (option) => {
		setIsOpen(false);
		onChange(option);
	};

	const mappedList = options?.map((option) => {
		return (
			<div className="hover:bg-black/30 rounded cursor-pointer p-1" onClick={() => handleOptionClick(option)} key={option.value}>
				{option.label}
			</div>);
	});

	const chevronClasses = classNames(
		"lg:text-[1vw] text-[8vw] transition-transform duration-300",
		isOpen &&  "rotate-[-90deg]"
	)

	const dropdownClasses = classNames(
		"absolute top-full border-[1px] border-white w-[100%] ml-[-4%] bg-white overflow-hidden transition-all duration-500 ease-in-out text-black z-20",
		isOpen ? "opacity-100 max-h-[9999px]" : "opacity-0 max-h-0"
	)

	return <div ref={divEl} className="w-full relative px-1 outline-none hover:bg-white focus:bg-white hover:text-black focus:text-black transition-color duration-300">
		<div 
			className="flex justify-between items-center cursor-pointer" 
			onClick={() => handleClick(isOpen)}
		>
			{value?.label || "Select"}
			<GoChevronLeft className={chevronClasses}/>
		</div>
		<div className={dropdownClasses}>
			{mappedList}
		</div>
	</div>;
}

export default Dropdown;