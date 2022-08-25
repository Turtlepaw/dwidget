import CanvasModule, { Canvas } from "canvas";
import InviteResolver from "./resolver";
import { Text } from "./text";
import {
    GuildResolvable,
    Location,
    Locations,
    MemberRosolvable,
    RawGuildJSON,
    RawMemberJSON,
    Status
} from "./types";

//Utils
function resolveMember(member: RawMemberJSON): MemberRosolvable {
    return {
        id: member.id,
        username: member.username,
        discriminator: member.discriminator,
        avatar: member.avatar,
        status: Status[member.status] as Status,
        avatar_url: member.avatar_url
    };
}

function resolveGuild(json: RawGuildJSON): GuildResolvable {
    return {
        id: json.id,
        name: json.name.toUpperCase(),
        instant_invite: json.instant_invite,
        channels: json.channels,
        members: json.members.map(resolveMember),
        presence_count: json.presence_count
    };
}

async function fetchIconURL(inviteURL: string) {
    const invite = await InviteResolver.getInvite(inviteURL);
    const guildId = invite.guild.id;
    const iconId = invite.guild.icon;
    return `https://cdn.discordapp.com/icons/${guildId}/${iconId}${iconId.startsWith('a_') ? '.gif' : '.jpg'}`
}

//Painter
export async function paint(guild: RawGuildJSON) {
    const canvas = new Canvas(1000, 1000);
    const ctx = canvas.getContext('2d');
    const guildResolvable = resolveGuild(guild);
    const guildIcon = await fetchIconURL(guildResolvable.instant_invite);
    const locations: Locations = {
        name: {
            x: 530.8,
            y: 505.4
        },
        icon: {
            x: 727.7,
            y: 305.6
        },
        memberCount: {
            x: 696.3,
            y: 562.7
        },
        title: {
            x: 546.7,
            y: 155
        }
    }

    const iconHeight = 149.2;
    const iconWidth = 149.2;

    const colors = {
        dark: "#2E2F32",
        lightText: "#B8BABC"
    }
    const cornorRadius = 3;

    //Background
    ctx.fillStyle = colors.dark;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //Cornor radius with cornorRadius
    ctx.beginPath();
    ctx.moveTo(cornorRadius, 0);
    ctx.lineTo(canvas.width - cornorRadius, 0);
    ctx.quadraticCurveTo(canvas.width, 0, canvas.width, cornorRadius);
    ctx.lineTo(canvas.width, canvas.height - cornorRadius);
    //Guild Icon
    //Load the avatar. If the user does not exist use a discord one
    const avatar = await CanvasModule.loadImage(guildIcon == null ? "https://cdn.discordapp.com/embed/avatars/0.png" : guildIcon);

    //Draw the avatar
    ctx.save()
    ctx.beginPath();
    ctx.arc(locations.icon.x + 100, locations.icon.y + 100, 100, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(image, dx, dy)
    ctx.drawImage(backgroundAvatar, locations.icon.x, posData.avatar, poses.defualt.avatar.w, poses.defualt.avatar.h);
    ctx.drawImage(avatar, poses.defualt.avatar.x, posData.avatar, poses.defualt.avatar.w, poses.defualt.avatar.h);
    ctx.restore()
    //Top center text
    ctx.fillStyle = colors.lightText;
    ctx.font = "bold 30px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(guildResolvable.name, locations.name.x, locations.name.y);
    //Member count
    ctx.font = "bold 20px sans-serif";
    ctx.fillText(`${guildResolvable.presence_count} MEMBERS`, locations.memberCount.x, locations.memberCount.y);
    //Title
    ctx.font = "bold 20px sans-serif";
    ctx.fillText(Text.InvitedTitle.EN, locations.title.x, locations.title.y);

    return canvas.toBuffer();
}