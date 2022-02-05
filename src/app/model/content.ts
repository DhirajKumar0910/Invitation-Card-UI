export class ContentDTO {
    public pageNo: number = 0;
	public fontName: string = "";
	public fontSize: number = 0;
	public fontColor: string = "";
	public xcoOrd: number = 0;
	public ycoOrd: number = 0;
	public content: string = '';
	public fontFileProv!:boolean;
}

export class ContentControl {
	public pageNo: number = 0;
	public fontName: string = "";
	public fontFile!: FileList;
	public fontSize: number = 0;
	public fontColor: string = "";
	public xcoOrd: number = 0;
	public ycoOrd: number = 0;
	public content: string = '';
}

export function conToContentDTO(contentControl: ContentControl): ContentDTO {
	let contentDTO = new ContentDTO();
	contentDTO.pageNo = contentControl.pageNo;
	contentDTO.fontName = contentControl.fontName;
	contentDTO.fontSize = contentControl.fontSize;
	contentDTO.fontColor = contentControl.fontColor;
	contentDTO.xcoOrd = contentControl.xcoOrd;
	contentDTO.ycoOrd = contentControl.ycoOrd;
	contentDTO.content = contentControl.content;
	contentDTO.pageNo = contentControl.pageNo;
	return contentDTO;
}
