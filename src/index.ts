//Imports
import express from 'express';
import fetch from "axios";
import 'colors';
import { paint } from './utils/painter';

//Types
export enum RequestURLs {
    Widget = "https://discord.com/api/guilds/[guild]/widget.json"
}
export enum Methods {
    Get = "get",
    Post = "post",
    Put = "put",
    Delete = "delete"
}

//Utilities
function resolveURL(url: RequestURLs, guild: string) {
    return url.replace("[guild]", guild);
}

async function fetchURL(url: string) {
    try {
        console.log("▶ Requesting URL:\n".green, ` ▶ URL: ${url}`.gray)
        const res = await fetch(url, {
            method: Methods.Get
        });
        return await res.data;
    } catch (err) {
        console.error("Error:".red, err.message.gray);
        console.log(" ▶ Debugging Helpers:\n".red, `  ▶ URL: ${url}`.gray)
        return null;
    }
}

//App Setup
const app = express();
const port = 3000;

//App Routes
app.get('/:guildid', async (req, res) => {
    const guildId = req.params.guildid;
    if (guildId == "favicon.ico" || !guildId) {
        res
            .send("Bad Request: Invalid Guild ID")
            .status(400);

        return;
    }

    console.log(
        "▶ Request Placed For:".green, guildId.gray,
        //"\n ▶ Request Params:".gray, req.params
    );

    const url = resolveURL(RequestURLs.Widget, guildId);
    const json = await fetchURL(url);
    const image = await paint(json);

    res
        .setHeader('Content-Type', 'image/png')
        .send(image);
});

//App Hosting
app.listen(port, () => {
    console.log(`${`Server is running at`.gray} ${`https://localhost:${port}/`.blue.underline}`);
});
