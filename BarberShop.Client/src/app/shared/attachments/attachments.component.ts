import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../base.component';
import {ReplaySubject} from 'rxjs';
import {Attachment} from "../model/attachment/attachment.vm";
import {environment} from "../../../environments/environment";
import {AttachmentAttribute} from "../model/attachment/attachment-attribute.vm";


@Component({
    selector: 'app-attachments',
    templateUrl: './attachments.component.html'
})
export class AttachmentsComponent extends BaseComponent implements OnInit {

    fileName: string;
    invalidFile: boolean;
    @Input('multiple') multiple: boolean = false;
    @Input('allowedFiles') allowedFiles: string = '*';
    @Input('isView') isView: boolean = false;
    @Input('typeCode') typeCode: string;

    deletedIds: number[] = [];
    attachments: Attachment[] = [];
    viewAttachments: Attachment[] = [];
    public broadcastInformation: ReplaySubject<Attachment[]> = new ReplaySubject();
    public fillInformation: ReplaySubject<Attachment[]> = new ReplaySubject();
    public broadcastdeletedIds: ReplaySubject<number[]> = new ReplaySubject();


    @ViewChild('fileUploader') fileUploader: ElementRef;

    attachment: Attachment;

    constructor() {
        super();
    }

    ngOnInit() {
        if (!this.isView)
            this.attachment = new Attachment();

        this.fillInformation.subscribe(res => {
            for (var i = 0; i < res.length; i++) {
                var attachment = res[i];
                this.setIcon(attachment);
                this.viewAttachments.push(attachment);
            }
        });
    }

    addAttachment() {
        if (this.attachments.length < environment.noOfAllowedProductAttachments) {
            let checkDuplicateAttachment = this.attachments.find(x => x.caption.toLowerCase() == this.attachment.caption.toLowerCase()) 
                                        || this.viewAttachments.find(x => x.caption.toLowerCase() == this.attachment.caption.toLowerCase());
            if (!checkDuplicateAttachment) {

                this.handleIsPrimary();
                this.attachments.push(this.attachment);
                this.viewAttachments.push(this.attachment);
                this.attachment = new Attachment();
                this.fileUploader.nativeElement.value = "";

                this.broadcastChanges();
            } else {
                this.toaster.error( this.translate.instant('product.duplicateAttachmentNotAllowed'), this.translate.instant('general.error'))
            }
        } else {
            this.toaster.error( this.translate.instant('product.maximumAttachmentsAre') + environment.noOfAllowedProductAttachments, this.translate.instant('general.error'))
        }
    }

    deleteAttachment(index, attachment: Attachment) {
        let deleteAttachment = this.viewAttachments.splice(index, 1);
        let attachIndex = this.attachments.indexOf(deleteAttachment[0]) 
        this.attachments.splice(attachIndex, 1);

        if (attachment) {
            if (attachment.attachmentId) {
                this.deletedIds.push(attachment.attachmentId);
                this.broadcastdeletedIdsChanges();
            }
        }

        this.broadcastChanges();
    }

    broadcastChanges() {
        this.broadcastInformation.next(this.attachments);
    }

    broadcastdeletedIdsChanges() {
        this.broadcastdeletedIds.next(this.deletedIds);
    }


    isValidAttachment() {
        if (this.attachment.caption != undefined && this.attachment.file != undefined)
            return true;

        return false;
    }

    onSelectFiles(e) {
        if (this.validateFiles(e.target.files)) {
            this.invalidFile = false;
            for (var i = 0; i < e.target.files.length; i++) {
                let file = e.target.files[i];
                let reader = new FileReader();

                reader.onload = (e: any) => {
                    var attachment = new Attachment();
                    attachment.file = file;
                    attachment.type = this.attachment.caption;
                    attachment.caption = this.attachment.caption;
                    attachment.isPrimary = this.attachment.isPrimary;
                    attachment.contentType = file.type;
                    this.setIcon(attachment, file, e);

                    var attribute = new AttachmentAttribute();
                    attribute.name = attachment.caption;

                    attribute.typeCode = this.typeCode;
                    attribute.objectTypeCode = this.typeCode;
                    attribute.isPrimary = this.attachment.isPrimary;

                    attachment.attribute = attribute;
                    this.attachment = attachment;

                }
                reader.readAsDataURL(file);
            }
        } else {
            this.invalidFile = true;
            this.fileUploader.nativeElement.value = "";
        }
    }

    validateFiles(files: File[]): any {
        if (files) {
            for (let i = 0; i < files.length; i++) {
                if (!this.isFileTypeValid(files[i])) {
                    return false;
                } else {
                    return true;
                }
            }
        }
        else {
            return true;
        }

    }

    private isFileTypeValid(file: File): boolean {
        if (this.allowedFiles == "*") return true;

        let acceptableTypes = this.allowedFiles.split(',').map(type => type.trim());
        for (let type of acceptableTypes) {
            let acceptable = this.isWildcard(type) ? this.getTypeClass(file.type) === this.getTypeClass(type)
                : file.type == type || this.getFileExtension(file).toLowerCase() === type.toLowerCase();

            if (acceptable) {
                return true;
            }
        }

        return false;
    }

    setIcon(attachment: Attachment, file?, fileEvent?) {
        if (file) {
            this.fileName = file.name;

            if (file.type == "text/plain") {
                attachment.icon = "assets/images/txtIcon.jpeg";
            } else if (file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                attachment.icon = "assets/images/wordIcon.png";
            } else if (file.type == "application/pdf") {
                attachment.icon = "assets/images/pdficon.png";
            } else if (file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                attachment.icon = "assets/images/exlIcon.png";
            } else if (file.type == "text/xml") {
                attachment.icon = "assets/images/xmlIcon.png";
            } else if (file.type == "application/json") {
                attachment.icon = "assets/images/jsonIcon.png";
            } else if (file.type == "application/x-zip-compressed") {
                attachment.icon = "assets/images/zipIcon.png";
            } else {
                attachment.icon = fileEvent.target.result;
            }
        } else {
            if (attachment.contentType == "text/plain") {
                attachment.icon = "assets/images/txtIcon.jpeg";
            } else if (attachment.contentType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                attachment.icon = "assets/images/wordIcon.png";
            } else if (attachment.contentType == "application/pdf") {
                attachment.icon = "assets/images/pdficon.png";
            } else if (attachment.contentType == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                attachment.icon = "assets/images/exlIcon.png";
            } else {
                attachment.icon = attachment.url;
            }
        }
    }

    isWildcard(fileType: string): boolean {
        return fileType.indexOf('*') !== -1;
    }

    getFileExtension(file: File): string {
        return '.' + file.name.split('.').pop();
    }

    getTypeClass(fileType: string): string {
        return fileType.substring(0, fileType.indexOf('/'));
    }

    attachmentClick(att) {

        //if (this.viewOnly) {
        window.open(att.icon)
        //}
    }

    handleIsPrimary() {

        if (this.attachment.isPrimary == true) {

            /*Two for loops becuase length of viewAttachments not equal length of attachments in some cases*/

            //let index = 0;
            this.viewAttachments.forEach(attach => {
                attach.isPrimary = false;
                //this.attachments[index].isPrimary = false;
                // index++;
            });

            this.attachments.forEach(attach => {
                attach.isPrimary = false;
            });
        }
    }
}




