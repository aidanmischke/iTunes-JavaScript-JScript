try {
	var Tracks = WScript.CreateObject("iTunes.Application").SelectedTracks;
	var i = 0;
	var tracksCount = Tracks.Count;
	var currentTrack;

	var firstTrackNumber = 550;

	while (i != tracksCount) {
		i++;
		currentTrack = Tracks.Item(i);

		switch (currentTrack.TrackNumber) {
			case getTrackNumber(0):
				currentTrack.Rating = 100;
				break;
			case getTrackNumber(1):
				currentTrack.Rating = 90;
				break;
			case getTrackNumber(2):
				currentTrack.Rating = 80;
				break;
			case getTrackNumber(3):
				currentTrack.Rating = 70;
				break;
			case getTrackNumber(4):
				currentTrack.Rating = 60;
				break;
			case getTrackNumber(5):
				currentTrack.Rating = 50;
				break;
			case getTrackNumber(6):
				currentTrack.Rating = 40;
				break;
			case getTrackNumber(7):
				currentTrack.Rating = 30;
				break;
			case getTrackNumber(8):
				currentTrack.Rating = 20;
				break;
			case (getTrackNumber(9) -1) /*999*/:
				currentTrack.Rating = 10;
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
