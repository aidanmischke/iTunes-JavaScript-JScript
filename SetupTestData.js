try {
	var Tracks = WScript.CreateObject("iTunes.Application").SelectedTracks;
	var i = 0;
	var tracksCount = Tracks.Count;
	var currentTrack;

	while (i != tracksCount) {
		i++;
		currentTrack = Tracks.Item(i);
		
		currentTrack.Name = "#" + currentTrack.Name + "#";
		
		if(currentTrack.Artist !== "AA MIX")
			currentTrack.Artist = "#" + currentTrack.Artist + "#";
		
		if(currentTrack.Album !== "AA MIX" || currentTrack.Album !== "Mischke Mix" )
			currentTrack.Album = "#" + currentTrack.Album + "#";
	}
}
catch (err) {
		WScript.Echo(err.description + "\n\Maybe no tracks selected.");
}

WScript.CreateObject("WScript.Shell").AppActivate("iTunes");
WScript.Quit();
