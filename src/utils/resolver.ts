import { RawGuildJSON, RawInviteResponse } from "./types"
import fetch from "axios";
import { Methods } from "index";

const API_BASE_URL = 'https://discord.com/api/v10';
const guildIdRegex = /^[0-9]{16,18}$/
const inviteRegex = /^(?:https?:\/\/)?(?:www\.)?(?:discord(?:app)?)\.(?:com|gg)\/(?:invite\/)?([a-zA-Z0-9-]+)$/

export default class InviteResolver {
    static getInvite(inviteCode: string): Promise<RawInviteResponse> {
        return fetch(`${API_BASE_URL}/invites/${inviteCode}?with_counts=true`, {
            method: Methods.Get
        }).then(res => res.data)
    }
}