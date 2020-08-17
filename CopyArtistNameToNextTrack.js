// Requires tracks to be in an unsorted playlist.
try {
	var Tracks = WScript.CreateObject("iTunes.Application").SelectedTracks;
	var i = 0;
	var tracksCount = Tracks.Count;
	var currentTrack;
	var previousTrackArtist;

	if (tracksCount % 2 !== 0) {
		throw ("Odd number of tracks selected.");
	}

	while (i != tracksCount) {
		i++;
		currentTrack = Tracks.Item(i);

		if (i % 2 === 1) {
			previousTrackArtist = currentTrack.Artist;
		}
		else {
			currentTrack.Artist = previousTrackArtist;
			previousTrackArtist = null;
		}
	}
}

catch (err) {
	WScript.Echo(err + "\n\nOr maybe no tracks selected.");
}

WScript.CreateObject("WScript.Shell").AppActivate("iTunes");
WScript.Quit();