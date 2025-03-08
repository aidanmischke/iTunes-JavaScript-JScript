try {
	var Tracks = WScript.CreateObject("iTunes.Application").SelectedTracks;
	var i = 0;
	var tracksCount = Tracks.Count;
	var currentTrack;

	while (i != tracksCount) {
		i++;
		currentTrack = Tracks.Item(i);

		var obj = { "name":"John", "age":30, "city":"New York"};
		// WScript.Echo("JSON.stringify(): " + JSON.stringify());
		// WScript.Echo("JSON.parse(): " + JSON.parse(currentTrack));
		// WScript.Echo("JSON.parse().stringify(): " + JSON.parse(currentTrack).stringify());
	}
}

catch (err) {
	WScript.Echo(err.description + "\n\nOr maybe no tracks selected.");
}

WScript.CreateObject("WScript.Shell").AppActivate("iTunes");
WScript.Quit();