import { useEffect, useState } from "react";
import Tracker from "../components/Tracker";
import { BrowserView, MobileView } from "react-device-detect";
import TrackerMobile from "../components/TrackerMobile";
import FocusedTrackerMobile from "../components/FocusedTrackerMobile";

function TrackersPage({trackersData, removeTracker, setData}) {
	const [trackerFocused, setTrackerFocused] = useState(1);

	useEffect(() => {
		refreshData();
	}, [trackersData])

	const handleTrackerFocus = (id) => {
		if (id === trackerFocused)
			setTrackerFocused(1);
		else
			setTrackerFocused(id);
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
		return <Tracker data={data} id={data.data.id} key={data.data.id} focusedID={trackerFocused} handleFocusClick={handleTrackerFocus} handleCloseClick={handleDeleteClick} refreshData={refreshData}/>
	})

	const trackersMobile = trackersData.map((data) => {
		return <TrackerMobile data={data} id={data.data.id} key={data.data.id} focusedID={trackerFocused} handleFocusClick={handleTrackerFocus} handleCloseClick={handleDeleteClick} refreshData={refreshData} />
	})

	const focusedTrackerMobile = trackersData?.map((data) => {
		if (data.data.id === trackerFocused)
			return <FocusedTrackerMobile data={data} id={data.data.id} focusedID={trackerFocused} handleFocusClick={handleTrackerFocus} handleCloseClick={handleDeleteClick} refreshData={refreshData} />
		else 
			return ;
	})

	return (
		<div className="w-screen lg:h-[92%] h-[90%]">
			<BrowserView>
				{trackers}
			</BrowserView>
			<MobileView>
				{trackerFocused !== 1 ?
					<div className="w-full">{focusedTrackerMobile}</div> :
					<div className="w-full flex flex-row flex-wrap">
						{trackersMobile}
					</div>}
			</MobileView>
		</div>
		
)
}

export default TrackersPage;