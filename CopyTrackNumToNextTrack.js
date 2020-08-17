try {
	// TrackNumToStarRating 50-500
	var Tracks = WScript.CreateObject("iTunes.Application").SelectedTracks;
	var i = 0;
	var tracksCount = Tracks.Count;
	var currentTrack;

	var firstTrackNumber = 50;

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
				case getTrackNumber(9):
					currentTrack.Rating = 10;
					break;
				default:
					// Intentionally empty.
					break;
		}
	}
	
	// CopyTrackNumToNextTrack
	i = 0;
	currentTrack = null;
	var previousTrackRating;

	if (tracksCount % 2 !== 0) {
		throw ("Odd number of tracks selected.");
	}

	while (i != tracksCount) {
		i++;
		currentTrack = Tracks.Item(i);

		if (i % 2 === 1) {
			previousTrackRating = currentTrack.Rating;
		}
		else {
			currentTrack.Rating = previousTrackRating;
			previousTrackRating = null;
		}
	}
	
	// a50-500 HalfStarRatingToTrackNum
	i = 0;
	var currentTrack = null;

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
		WScript.Echo(err.description + "\n\nOr maybe odd number of tracks selected.\n\nOr maybe no tracks selected.");
}

WScript.CreateObject("WScript.Shell").AppActivate("iTunes");
WScript.Quit();

function getTrackNumber(multiplier) {
	return firstTrackNumber + (multiplier * 50);
};
