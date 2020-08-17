try {

	// put your playlist name here
	var 	PlaylistName = "zzCompilationParts";

	var	iTunesApp = WScript.CreateObject("iTunes.Application");

	var	mainLibrary = iTunesApp.LibraryPlaylist;
	// if you want to use some other playlist as the base to look through, uncomment this next line
	// and change the "-All Songs" to the base playlist you want to use.:
	//var	mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("-All Songs");
	var	mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Playlist 6");


	// --- no need to change anything below this line ---
	var	tracks = mainLibrary.Tracks;
	var	numTracks = tracks.Count;

	OHWPlaylist = iTunesApp.CreatePlaylist(PlaylistName);

	for (var i = 1; i <= numTracks; i++)
	{
		var	currTrack = tracks.Item(i);

		if(currTrack.Compilation === true)
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