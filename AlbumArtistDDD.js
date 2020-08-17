try {
	var Tracks = WScript.CreateObject("iTunes.Application").SelectedTracks;
	var i = 0;
	var tracksCount = Tracks.Count;
	var currentTrack;

	while (i != tracksCount) {
		i++;
		currentTrack = Tracks.Item(i);

		currentTrack.AlbumArtist = "DDD";
	}
}

catch (err) {
		WScript.Echo(err.description + "\n\nOr maybe no tracks selected.");
}

WScript.CreateObject("WScript.Shell").AppActivate("iTunes");
WScript.Quit();