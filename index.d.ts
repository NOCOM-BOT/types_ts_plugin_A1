declare module "@nocom_bot/nocom-atype-support" {
    export interface ICommandData {
        interfaceID: number,

        cmd: string,
        args: string[],
        attachments: {
            filename: string,
            url: string
        }[],
        mentions: {
            [formattedUserID: string]: {
                start: number,
                length: number
            }
        },
        originalContent: string,
        prefix: string,

        messageID: string,
        formattedMessageID: string,
        channelID: string,
        formattedChannelID: string,
        senderID: string,
        formattedSenderID: string,
        guildID: string,
        formattedGuildID: string,

        language: string,
        additionalInterfaceData?: any
    }

    export function verifyPlugin(allow: boolean): void;
    export function callFuncPlugin(namespace: string, funcName: string, ...args: any): Promise<any>;
    export function registerFuncPlugin(funcName: string, funcCallTarget: Function): Promise<boolean>;
    export function callAPI(moduleID: string, cmd: string, data: any): Promise<any>;
    export function registerCommand(commandName: string, commandDescriptionAPI: (language: string) => {
        args: string,
        desc: string
    }, commandCallback: (data: ICommandData) => Promise<{
        content: string,
        attachments: {
            filename?: string,
            data: Buffer | string
        }[],
        additionalInterfaceData?: any
    }>, compatibility: string[]): Promise<boolean>;

    export function registerCommandFuncPlugin(commandName: string, funcDescAPITarget: string, funcName: string, compatibility: string[]): Promise<boolean>;
    export function exit(exitCode?: number, exitReason?: string): void;
    export function waitForModule(moduleNamespace: string, timeout: number): Promise<boolean>;

    declare module log {
        export function critical(...data: any[]): Promise<void>;
        export function error(...data: any[]): Promise<void>;
        export function warn(...data: any[]): Promise<void>;
        export function info(...data: any[]): Promise<void>;
        export function debug(...data: any[]): Promise<void>;
        export function verbose(...data: any[]): Promise<void>;
    }
}
