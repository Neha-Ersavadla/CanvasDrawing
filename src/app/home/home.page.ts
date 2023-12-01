import { Component, ViewChild, AfterViewInit,Renderer2 } from '@angular/core';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements AfterViewInit {
  @ViewChild('imageCanvas', { static: false }) canvas: any;
  canvasElement: any;
  saveX: number;
  saveY: number;

  selectedColor = '#9e2956';
  colors = [ '#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3' ];

  drawing = false;
  lineWidth = 5;

  constructor(private platform: Platform,  private renderer: Renderer2) {}

  ngAfterViewInit() {
    // Set the Canvas Element and its size
    this.canvasElement = this.canvas.nativeElement;
    this.renderer.setAttribute(this.canvasElement, 'width', this.platform.width() + '');
    this.renderer.setAttribute(this.canvasElement, 'height', this.platform.height() + '');
  }

  startDrawing(ev) {
    this.drawing = true;
    var canvasPosition = this.canvasElement.getBoundingClientRect();

    this.saveX = ev.touches[0].pageX;
    this.saveY = ev.touches[0].pageY;
  }

  endDrawing() {
    this.drawing = false;
  }

  selectColor(color) {
    this.selectedColor = color;
  }

  moved(ev) {
    if (!this.drawing) return;
  
    var canvasPosition = this.canvasElement.getBoundingClientRect();
    let ctx = this.canvasElement.getContext('2d');
  
    let currentX = ev.touches[0].pageX;
    let currentY = ev.touches[0].pageY;
  
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = this.selectedColor; 
    ctx.lineWidth = this.lineWidth;
  
    ctx.beginPath();
    ctx.moveTo(this.saveX, this.saveY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
  
    ctx.stroke();
  
    this.saveX = currentX;
    this.saveY = currentY;
  }
  
   clearCanvas(){
        let ctx = this.canvasElement.getContext('2d');
        ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

}