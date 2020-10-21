export declare function normalizeKeyName(key: string): string;
interface Kaybee {
    readonly stop: () => void;
    readonly getKey: (key: string) => boolean;
    readonly getCode: (code: string) => boolean;
}
interface KaybeeEvent {
    readonly key: string;
    readonly code: string;
    readonly repeat?: boolean;
}
interface KaybeeOptions {
    readonly target?: EventTarget;
    readonly renameKeys?: boolean;
    readonly enableRepeat?: boolean;
    readonly onKeyDown?: (event: KaybeeEvent) => void;
    readonly onKeyUp?: (event: KaybeeEvent) => void;
}
export declare function start({ target, renameKeys, enableRepeat, onKeyDown, onKeyUp, }: KaybeeOptions): Kaybee;
declare const _default: {
    normalizeKeyName: typeof normalizeKeyName;
    start: typeof start;
};
export default _default;
