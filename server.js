try { process.loadEnvFile(); } catch (e) { /* no .env file: Live TV detection stays off */ }

const express = require('express');
const path = require("path");
const app = express();

const PORT = 3030

// ---- Live TV (YouTube) -------------------------------------------------
const YT_KEY = process.env.YOUTUBE_API_KEY;
const YT_HANDLE = "zedtvgh";
const YT_CACHE_MS = 60 * 1000;   // re-check YouTube at most once a minute
const YT_API = "https://www.googleapis.com/youtube/v3";

let channelId = null;
let uploadsId = null;
let cache = { at: 0, data: { live: false } };

async function yt(endpoint, params) {
    const url = `${YT_API}/${endpoint}?${new URLSearchParams({ ...params, key: YT_KEY })}`;
    const res = await fetch(url);
    const body = await res.json();
    if (!res.ok) throw new Error(body.error?.message || `YouTube API ${res.status}`);
    return body;
}

async function checkLive() {
    if (!channelId) {
        const ch = await yt("channels", { part: "id,contentDetails", forHandle: YT_HANDLE });
        const item = ch.items?.[0];
        if (!item) throw new Error(`Channel @${YT_HANDLE} not found`);
        channelId = item.id;
        uploadsId = item.contentDetails.relatedPlaylists.uploads;
    }
    // A live stream shows up in the uploads playlist while it is on air.
    const list = await yt("playlistItems", { part: "contentDetails", playlistId: uploadsId, maxResults: "8" });
    const ids = (list.items || []).map(i => i.contentDetails.videoId);
    if (!ids.length) return { live: false, channelId };
    const vids = await yt("videos", { part: "snippet", id: ids.join(",") });
    const live = (vids.items || []).find(v => v.snippet.liveBroadcastContent === "live");
    return live
        ? { live: true, channelId, videoId: live.id, title: live.snippet.title }
        : { live: false, channelId };
}

app.get('/api/tv-status', async (req, res) => {
    res.set("Cache-Control", "no-store");
    if (!YT_KEY) return res.json({ live: false, error: "not-configured" });
    if (Date.now() - cache.at > YT_CACHE_MS) {
        try {
            cache = { at: Date.now(), data: await checkLive() };
        } catch (e) {
            console.error("tv-status:", e.message);
            // Keep the last good answer, but retry soon.
            cache = { at: Date.now() - YT_CACHE_MS + 15000, data: { ...cache.data, error: "unavailable" } };
        }
    }
    res.json(cache.data);
});
// ------------------------------------------------------------------------

app.use(express.static(__dirname))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT,()=>{
    console.log('listening on '+PORT)
})
