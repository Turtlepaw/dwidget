import { Canvas } from "canvas";

export function applyText(canvas: Canvas, text: string) {
    const context = canvas.getContext('2d');
    let fontSize = 70;

    do {
        context.font = `${fontSize -= 10}px sans-serif`;
    } while (context.measureText(text).width > canvas.width - 300);

    return context.font;
}

export function useUsername(username: string, nickname: string | null | undefined) {
    return username == null ? "Unknown User" : (nickname != null ? nickname : username);
}

export function use(value: any | null | undefined, or: any) {
    return value == null ? or : value;
}

export function isNull(value: any) {
    return value == null;
}

export function isHex(value: string) {
    return /^#[0-9A-F]{6}$/i.test(value);
}

export function isURL(value: string) {
    return /^https?:\/\/\S+$/.test(value);
}