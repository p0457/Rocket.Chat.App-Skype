import { IHttp, IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IMessageAttachment } from '@rocket.chat/apps-engine/definition/messages';
import { MessageActionType } from '@rocket.chat/apps-engine/definition/messages/MessageActionType';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';

export class SkypeCommand implements ISlashCommand {
    public command: string = 'skype';
    public i18nParamsExample: string = 'Slash_Command_Params_Example';
    public i18nDescription: string = 'Slash_Command_Description';
    public providesPreview: boolean = false;

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp): Promise<void> {
        const icon = await read.getEnvironmentReader().getSettings().getValueById('skype_icon');
        const username = await read.getEnvironmentReader().getSettings().getValueById('skype_name');
        const sender = await read.getUserReader().getById(context.getSender().id);
        const botSender = await read.getUserReader().getById('rocket.cat');

        const skypeId = context.getArguments().slice().join(' ');

        const profileUrl = await http.post(`https://is.gd/create.php?format=simple&url=skype:${skypeId}?userinfo`);
        const chatUrl = await http.post(`https://is.gd/create.php?format=simple&url=skype:${skypeId}?chat`);
        const addUrl = await http.post(`https://is.gd/create.php?format=simple&url=skype:${skypeId}?add`);
        const sendFileUrl = await http.post(`https://is.gd/create.php?format=simple&url=skype:${skypeId}?sendfile`);
        const voicemailUrl = await http.post(`https://is.gd/create.php?format=simple&url=skype:${skypeId}?voicemail`);
        const callUrl = await http.post(`https://is.gd/create.php?format=simple&url=skype:${skypeId}?call`);

        const text = `@${sender.username} has requested a Skype Call`;

        const buttonActions: IMessageAttachment = {
          actions: [
            {
              type: MessageActionType.BUTTON,
              text: 'View Profile',
              url: profileUrl.content,
            },
            {
              type: MessageActionType.BUTTON,
              text: 'Chat',
              url: chatUrl.content,
            },
            {
              type: MessageActionType.BUTTON,
              text: 'Add User',
              url: addUrl.content,
            },
            {
              type: MessageActionType.BUTTON,
              text: 'Send File',
              url: sendFileUrl.content,
            },
            {
              type: MessageActionType.BUTTON,
              text: 'Leave a Voicemail',
              url: voicemailUrl.content,
            },
            {
              type: MessageActionType.BUTTON,
              text: 'Join Skype Call',
              url: callUrl.content,
            },
          ],
        };

        const builder = modify.getCreator().startMessage()
            .setSender(botSender || context.getSender())
            .setRoom(context.getRoom())
            .setText(text)
            .setUsernameAlias(username)
            .setAvatarUrl(icon)
            .setAttachments([buttonActions])
            .setParseUrls(false);

        const tid = context.getThreadId();

        if (tid) {
            builder.setThreadId(tid);
        }

        await modify.getCreator().finish(builder);
    }
}
