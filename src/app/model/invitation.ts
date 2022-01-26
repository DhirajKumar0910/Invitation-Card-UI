import { ContentDTO } from "./content";

export class InvitationDTO {
    public inviteeName: string = '';
	public inviteeCity: string = '';
	public contentList: Array<ContentDTO> = [];
}
