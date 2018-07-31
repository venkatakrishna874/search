import { Directive, OnInit, Input, ElementRef } from '@angular/core';

import { environment } from '../../../environments/environment';
import $ from 'jquery/dist/jquery';
declare var MarvinJSUtil: any;
declare var svgPanZoom: any;
let marvin: any;

@Directive({
  selector: '[appSmilesToImage]'
})
export class SmilesToImageDirective implements OnInit {
  @Input() rxn: any;
  @Input() index: number;
  @Input() index2: number;
  height: number;
  width: number;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.height = this.el.nativeElement.offsetHeight;
    this.width = this.el.nativeElement.offsetWidth;
    this.generateImageFromRxn(
      this.rxn,
      this.index,
      this.index2,
      this.height,
      this.width
    );
  }
  private generateImageFromRxn(rxn, index, index2, height, width) {
    MarvinJSUtil.getPackage('#marvinjs-iframe').then(function(marvinNameSpace) {
      marvin = marvinNameSpace;
      const exporter = createExporter();
      exporter.render(rxn).then(applySvg, alert);
      function createExporter() {
        const innerWidth = window.innerWidth;
        const imageType = 'image/svg';
        const settings = {
          carbonLabelVisible: false,
          cpkColoring: true,
          chiralFlagVisible: true,
          lonePairsVisible: false,
          lonepaircalculationenabled: true,
          atomIndicesVisible: false,
          atomMapsVisible: false,
          implicitHydrogen: 'TERMINAL_AND_HETERO',
          displayMode: 'WIREFRAME',
          'background-color': '#EAE5E3',
          zoomMode: 'autoshrink',
          width: width,
          height: height
        };

        const inputFormat = null;
        const services = {};
        services['molconvertws'] = environment.molconvertws;
        const params = {
          imageType: imageType, // type of output image
          settings: settings, // display settings
          inputFormat: inputFormat, // renderer will expect molecule source in this format
          services: services // to resolve any molecule format and be able to calculate stereo info
        };
        return new marvin.ImageExporter(params);
      }
      function applySvg(svg) {
        const imageContainer = '#structure' + index + index2;
        $(imageContainer).html(svg);
        const img = $(imageContainer).find('svg')['0'];
        img.setAttribute('width', '100%');
        const panZoomInstance = svgPanZoom(img, {
          zoomEnabled: true,
          controlIconsEnabled: false,
          fit: true,
          center: true,
          minZoom: 0.1
        });
        panZoomInstance.zoom(1.0);
      }
    });
  }
}
