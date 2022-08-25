export enum Status {
    Online = "online",
    Idle = "idle",
    DND = "dnd",
    Invisible = "invisible"
}

export interface RawMemberJSON {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    status: "online" | "idle" | "dnd" | "invisible";
    avatar_url: string;
}

export interface RawGuildJSON {
    id: string;
    name: string;
    instant_invite: string;
    channels: any[];
    members: RawMemberJSON[];
    presence_count: number;
}

export interface MemberRosolvable {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    status: Status;
    avatar_url: string;
}

export interface GuildResolvable {
    id: string;
    name: string;
    instant_invite: string | null;
    channels: any[];
    members: MemberRosolvable[];
    presence_count: number;
}

export interface Location {
    x: number;
    y: number;
}

export interface Locations {
    icon: Location;
    name: Location;
    memberCount: Location;
    title: Location;
}

export interface RawInviteGuild {
    id: string;
    name: string;
    icon: string;
    features: string[];
    verification_level: number;
    vanity_url_code: string | null;
    premium_subscription_count: number;
    nsfw: boolean;
    nsfw_level: number;
}

export interface RawInviteChannel {
    id: string;
    name: string;
    type: string;
}

export interface RawInviteResponse {
    code: string;
    type: number;
    expires_at: string;
    guild: RawInviteGuild;
    channel: RawInviteChannel;
    approximate_member_count: number;
    approximate_presence_count: number;
}