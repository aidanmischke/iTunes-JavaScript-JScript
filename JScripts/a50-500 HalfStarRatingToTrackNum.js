try {
	var Tracks = WScript.CreateObject("iTunes.Application").SelectedTracks;
	var i = 0;
	var tracksCount = Tracks.Count;
	var currentTrack;

	var firstTrackNumber = 50;

	while (i != tracksCount) {
		i++;
		currentTrack = Tracks.Item(i);

		switch (currentTrack.Rating) {
			case 100:
				currentTrack.TrackNumber = getTrackNumber(0);
				break;
			case 90:
				currentTrack.TrackNumber = getTrackNumber(1);
				break;
			case 80:
				currentTrack.TrackNumber = getTrackNumber(2);
				break;
			case 70:
				currentTrack.TrackNumber = getTrackNumber(3);
				break;
			case 60:
				currentTrack.TrackNumber = getTrackNumber(4);
				break;
			case 50:
				currentTrack.TrackNumber = getTrackNumber(5);
				break;
			case 40:
				currentTrack.TrackNumber = getTrackNumber(6);
				break;
			case 30:
				currentTrack.TrackNumber = getTrackNumber(7);
				break;
			case 20:
				currentTrack.TrackNumber = getTrackNumber(8);
				break;
			case 10:
				currentTrack.TrackNumber = getTrackNumber(9);
				break;			
			default:
				// Intentionally empty.
				break;		
		}
	}
}
catch (err) {
		WScript.Echo(err.description + "\n\nOr maybe no tracks selected.");
}

WScript.CreateObject("WScript.Shell").AppActivate("iTunes");
WScript.Quit();

function getTrackNumber(multiplier) {
	return firstTrackNumber + (multiplier * 50);
};
