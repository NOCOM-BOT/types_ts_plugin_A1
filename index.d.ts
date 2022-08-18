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

    export interface ICommandOutput {
        content: string,
        attachments: {
            filename?: string,
            data: Buffer | string
        }[],
        additionalInterfaceData?: any
    }

    export interface ICommandInfo {
        args: {
            fallback: string,
            [ISOLanguageCode: string]: string
        },
        argsName?: string[],
        description: {
            fallback: string,
            [ISOLanguageCode: string]: string
        }
    }

    export function verifyPlugin(allow: boolean): void;
    export function callFuncPlugin(namespace: string, funcName: string, ...args: any): Promise<any>;
    export function registerFuncPlugin(funcName: string, funcCallTarget: Function): Promise<boolean>;
    export function callAPI(moduleID: string, cmd: string, data: any): Promise<any>;
    export function registerCommand(
        commandName: string, 
        commandInfo: ICommandInfo, 
        commandCallback: (data: ICommandData) => Promise<ICommandOutput> | ICommandOutput, 
        compatibility: string[]
    ): Promise<boolean>;

    export function registerCommandFuncPlugin(
        commandName: string, 
        commandInfo: ICommandInfo, 
        funcName: string, 
        compatibility: string[]
    ): Promise<boolean>;
    export function exit(exitCode?: number, exitReason?: string): void;
    export function waitForModule(moduleNamespace: string, timeout: number): Promise<boolean>;
    export function database(databaseID: number): {
        get(table: string, key: string): Promise<any>,
        set(table: string, key: string, data: any): Promise<boolean>,
        delete(table: string, key: string): Promise<boolean>,
        deleteTable(table: string): Promise<boolean>
    }

    declare module log {
        export function critical(...data: any[]): Promise<void>;
        export function error(...data: any[]): Promise<void>;
        export function warn(...data: any[]): Promise<void>;
        export function info(...data: any[]): Promise<void>;
        export function debug(...data: any[]): Promise<void>;
        export function verbose(...data: any[]): Promise<void>;
    }
}
