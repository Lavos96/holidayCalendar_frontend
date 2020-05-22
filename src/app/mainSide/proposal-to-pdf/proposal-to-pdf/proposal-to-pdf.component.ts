import { Component, OnInit } from '@angular/core';
import { CommunicationBetweenComponentsService } from 'src/services/communicationBetweenComponentsService.service';
import { Subscription } from 'rxjs';
import { RequestHoliday } from 'src/models/request';
import { Router } from '@angular/router';
import * as moment from 'moment';
import domtoimage from 'dom-to-image';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-proposal-to-pdf',
  templateUrl: './proposal-to-pdf.component.html',
  styleUrls: ['./proposal-to-pdf.component.sass']
})
export class ProposalToPdfComponent implements OnInit {

  comuunicationBetComSubscription: Subscription;
  holidayRequest: RequestHoliday;
  howManyDaysOfHoliday: number;

  constructor(private communicationBeteewnComponentsService: CommunicationBetweenComponentsService,
    private router: Router) { }

  ngOnInit(): void {
    this.comuunicationBetComSubscription = this.communicationBeteewnComponentsService.requestToPrintBehSubject.subscribe(request=>{
      this.holidayRequest = request;
      if(this.holidayRequest === null){
        this.router.navigateByUrl('');
      }else{
      const start=moment(this.holidayRequest.startDate);
      const end=moment(this.holidayRequest.endDate);
      this.howManyDaysOfHoliday = end.diff(start, 'days')+1;
      }
    })
  }

  downloadPDF()
  {

    var node = document.getElementById('toPrint');

    var img;
    var filename;
    var newImage;
    console.log('Node: ', node);


    domtoimage.toPng(node, { bgcolor: '#fff' })

      .then(function(dataUrl) {

        img = new Image();
        img.src = dataUrl;
        newImage = img.src;

        img.onload = function(){

        var pdfWidth = img.width;
        var pdfHeight = img.height;

          // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image

          var doc;

          if(pdfWidth > pdfHeight)
          {
            doc = new jsPDF('l', 'px', [pdfWidth , pdfHeight]);
          }
          else
          {
            doc = new jsPDF('p', 'px', [pdfWidth , pdfHeight]);
          }


          var width = doc.internal.pageSize.getWidth();
          var height = doc.internal.pageSize.getHeight();


          doc.addImage(newImage, 'PNG',  10, 10, width, height);
          filename = 'mojWniosekUrlopowy_' + '.pdf';
          doc.save(filename);

        };


      })
      .catch(function(error) {
        //console.log(error);
       // Error Handling
      });



  }

}
