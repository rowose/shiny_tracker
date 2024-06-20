import { useEffect, useState } from "react";
import Tracker from "../components/Tracker";
import { BrowserView, MobileView } from "react-device-detect";
import TrackerMobile from "../components/TrackerMobile";

function TrackersPage({trackersData, removeTracker, setData}) {
	const [trackerFocused, setTrackerFocused] = useState(1);

	useEffect(() => {
		refreshData();
	}, [trackersData])

	const handleTrackerFocus = (id) => {
		setTrackerFocused(id);
	}

	const refreshData = () => {
		setData(trackersData);
	}

	const trackers = trackersData.map((data) => {
		return <Tracker data={data} id={data.data.id} key={data.data.id} focusedID={trackerFocused} handleFocusClick={handleTrackerFocus} handleCloseClick={removeTracker} refreshData={refreshData}/>
	})

	const trackersMobile = trackersData.map((data) => {
		return <TrackerMobile data={data} id={data.data.id} key={data.data.id} focusedID={trackerFocused} handleFocusClick={handleTrackerFocus} handleCloseClick={removeTracker} refreshData={refreshData} />
	})

	return (
		<div className="w-screen lg:h-[92%] h-[90%]">
			<BrowserView>
				{trackers}
			</BrowserView>
			<MobileView>
				<div className="w-full flex flex-row flex-wrap">
					{trackersMobile}
				</div>
			</MobileView>
		</div>
		
)
}

export default TrackersPage;