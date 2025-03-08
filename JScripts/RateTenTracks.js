try {
	var Tracks = WScript.CreateObject("iTunes.Application").SelectedTracks;
	var i = 0;
	var tracksCount = Tracks.Count;
	var CurrentTrack;

	while (i != tracksCount) {
		var subtractionFromRating = i * 10;

		if (subtractionFromRating === 100) {
			break;
		}

		CurrentTrack = Tracks.Item(i + 1);

		CurrentTrack.Rating = 100 - subtractionFromRating;
		i++;
	}
}

catch (err) {
		WScript.Echo(err.description + "\n\nOr maybe no tracks selected.");
}

WScript.CreateObject("WScript.Shell").AppActivate("iTunes");
WScript.Quit();