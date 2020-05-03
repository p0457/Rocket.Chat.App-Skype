import {
    IConfigurationExtend, IEnvironmentRead, ILogger,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { SettingType } from '@rocket.chat/apps-engine/definition/settings';

import { SkypeCommand } from './commands/SkypeCommand';

export class SkypeApp extends App {

    constructor(info: IAppInfo, logger: ILogger) {
        super(info, logger);
    }

    protected async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
        await configuration.settings.provideSetting({
            id: 'skype_name',
            type: SettingType.STRING,
            packageValue: 'Skype',
            required: true,
            public: false,
            i18nLabel: 'Customize_Name',
            i18nDescription: 'Customize_Name_Description',
        });

        await configuration.settings.provideSetting({
            id: 'skype_icon',
            type: SettingType.STRING,
            packageValue: 'https://github.com/tgardner/Rocket.Chat.App-Skype/raw/icon.png',
            required: true,
            public: false,
            i18nLabel: 'Customize_Icon',
            i18nDescription: 'Customize_Icon_Description',
        });

        await configuration.slashCommands.provideSlashCommand(new SkypeCommand());
    }

}
