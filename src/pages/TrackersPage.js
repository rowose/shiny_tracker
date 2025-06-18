import { useEffect, useState } from "react";
import Tracker from "../components/Tracker";
import { BrowserView, MobileView } from "react-device-detect";
import TrackerMobile from "../components/TrackerMobile";
import FocusedTrackerMobile from "../components/FocusedTrackerMobile";

function TrackersPage({trackersData, removeTracker, setData, addShiny, offsetY}) {
	const [trackerFocused, setTrackerFocused] = useState([]);

	useEffect(() => {
		refreshData();
	}, [trackersData])

	const handleTrackerFocus = (id) => {
		if (trackerFocused.indexOf(id) > -1)
		{
			const tmp = [...trackerFocused];
			tmp.splice(trackerFocused.indexOf(id), 1)
			setTrackerFocused(tmp);
		}
		else
			setTrackerFocused([...trackerFocused, id]);
	}

	const handleDeleteClick = (id) => {
		if (id === trackerFocused)
			setTrackerFocused(1);
		removeTracker(id);
	}

	const refreshData = () => {
		setData(trackersData);
	}

	const trackers = trackersData.map((data) => {
		return <Tracker data={data} id={data.data.id} key={data.data.id} addShiny={addShiny} focusedID={trackerFocused} handleFocusClick={handleTrackerFocus} handleCloseClick={handleDeleteClick} refreshData={refreshData} offsetY={offsetY}/>
	})

	const trackersMobile = trackersData.map((data) => {
		return <TrackerMobile data={data} id={data.data.id} key={data.data.id} addShiny={addShiny} focusedID={trackerFocused} handleFocusClick={handleTrackerFocus} handleCloseClick={handleDeleteClick} refreshData={refreshData} />
	})

	const focusedTrackerMobile = trackersData?.map((data) => {
		if (trackerFocused.indexOf(data.data.id) > -1)
			return <FocusedTrackerMobile data={data} id={data.data.id} key={data.data.id} addShiny={addShiny} focusedID={trackerFocused} handleFocusClick={handleTrackerFocus} handleCloseClick={handleDeleteClick} refreshData={refreshData} />
		else 
			return ;
	})

	return (
		<div className="w-screen lg:h-[92%] h-[90%] lg:mt-[0%] mt-[2%]">
			<BrowserView>
				{trackers}
			</BrowserView>
			<MobileView>
				{trackerFocused.length > 0  ?
					<div className="w-full">{focusedTrackerMobile}</div> :
					<div className="w-full flex flex-row flex-wrap">
						{trackersMobile}
					</div>}
			</MobileView>	
		</div>
		
)
}

export default TrackersPage;