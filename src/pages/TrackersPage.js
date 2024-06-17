import { useEffect, useState } from "react";
import Tracker from "../components/Tracker";

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

	return (
		<div className="bg-gradient-to-tr from-slate-950 to-slate-900 w-screen h-screen overflow-y-hidden">
			{trackers}
		</div>
	)
}

export default TrackersPage;