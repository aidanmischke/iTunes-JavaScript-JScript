try {
	var Tracks = WScript.CreateObject("iTunes.Application").SelectedTracks;
	var i = 0;
	var tracksCount = Tracks.Count;
	var currentTrack;
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
}

catch (err) {
	WScript.Echo(err + "\n\nOr maybe no tracks selected.");
}

WScript.CreateObject("WScript.Shell").AppActivate("iTunes");
WScript.Quit();