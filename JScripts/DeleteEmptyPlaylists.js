try {
	var iTunesApp = WScript.CreateObject("iTunes.Application");

	var playlists = iTunesApp.LibrarySource.Playlists;
	
	var ITUserPlaylistSpecialKindNone = 0; // 	(0) No special kind

	WScript.Echo("playlists.Count: " + playlists.Count);

	var emptyPlaylistsDeleted = 0;

	for (var i=1;i<=playlists.Count;i++)
	{
		var playlist = playlists.Item(i);

		if (playlist.SpecialKind === ITUserPlaylistSpecialKindNone
			&& playlist.Tracks.Count === 0) {
				playlist.Delete();
				emptyPlaylistsDeleted++;
		}
	}

	WScript.Echo("Done.\nEmpty Playlists Deleted: " + emptyPlaylistsDeleted);	
}
catch (err) {
	WScript.Echo(err.name + " " + err.globalObject + " " + "\n\nOr maybe no tracks selected.");
}

WScript.CreateObject("WScript.Shell").AppActivate("iTunes");
WScript.Quit();