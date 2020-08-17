try {

	// put your playlist name here
	var 	PlaylistName = "zzOtherComposers";

	var	iTunesApp = WScript.CreateObject("iTunes.Application");

	var	mainLibrary = iTunesApp.LibraryPlaylist;
	// if you want to use some other playlist as the base to look through, uncomment this next line
	// and change the "-All Songs" to the base playlist you want to use.:
	//var	mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("-All Songs");
	//var	mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("zzTestScripts");

	var whitelist = [
		"StandUpComedy",
		"AudioBook",
		"VideoGameMusic",
		"BestBitRateFound",
		"ReplayGainToDo",
		"Edited",
		"StopTime",
		"HasLyrics",
		"SkipLyrics",
		"zzTestScripts"
	];

	// --- no need to change anything below this line ---
	var	tracks = mainLibrary.Tracks;
	var	numTracks = tracks.Count;

	OHWPlaylist = iTunesApp.CreatePlaylist(PlaylistName);

	for (var i = 1; i <= numTracks; i++)
	{
		var	currTrack = tracks.Item(i);

		if(currTrack.Composer !== "" && !findWhitelistMatch(currTrack.Composer))
		{
			OHWPlaylist.AddTrack(currTrack);
		}
	}

	WScript.Echo("Done!");

}
catch (err) {
		WScript.Echo(err.description + '\n\Maybe generic error.');
}

WScript.CreateObject('WScript.Shell').AppActivate('iTunes');
WScript.Quit();

function findWhitelistMatch(spaceDelimitedValues) {
	var values = spaceDelimitedValues.split(" ");
	
	for(var i = 0; i < values.length; i++) {
		for(var j = 0; j < whitelist.length; j++) {
			if(values[i] === whitelist[j])
				return true;
		}
	}	
	return false;
}