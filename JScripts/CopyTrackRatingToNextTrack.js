try {
    var Tracks = WScript.CreateObject("iTunes.Application").SelectedTracks;
    if (!Tracks) {
        throw ("No tracks selected.");
    }

    var i = 0;
    var tracksCount = Tracks.Count;
    var previousTrack;    
    var currentTrack;

    if (tracksCount % 2 !== 0) {
        throw ("Odd number of tracks selected.");
    }

    while (i != tracksCount) {
        i++;        
		previousTrack = Tracks.Item(i);
		i++;        
		currentTrack = Tracks.Item(i);
        currentTrack.Rating = previousTrack.Rating;
        
    }
} catch (err) {
    WScript.Echo(err + "\n\nOr maybe no tracks selected.");
}

WScript.CreateObject("WScript.Shell").AppActivate("iTunes");
WScript.Quit();
