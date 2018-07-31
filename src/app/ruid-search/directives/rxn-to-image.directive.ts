import { Directive, OnInit, Input, HostListener } from '@angular/core';

import { environment } from '../../../environments/environment';
import { CleanWS } from '../services/clean/cleanws.service';
import $ from 'jquery/dist/jquery';
declare var MarvinJSUtil: any;
declare var svgPanZoom: any;
let marvin: any;

@Directive({
  selector: '[appRxnToImage]'
})
export class RxnToImageDirective implements OnInit {
  @Input() rxn: any;
  @Input() index: number;
  @HostListener('window:resize')
  onWindowResize() {
    this.ngOnInit();
  }
  constructor(private cleanWS: CleanWS) {}

  ngOnInit() {
    this.cleanWS.getCleanReaction(this.rxn).subscribe((data: any) => {
      this.generateImageFromRxn(data, this.index);
    });
  }
  private generateImageFromRxn(rxn, index) {
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
          width: innerWidth,
          height: 250
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
        const imageContainer = '#imageContainer' + index;
        $(imageContainer).html(svg);
        const img = $(imageContainer).find('svg')['0'];
        img.setAttribute('width', '100%');
        const panZoomInstance = svgPanZoom(img, {
          zoomEnabled: true,
          controlIconsEnabled: true,
          fit: true,
          center: true,
          minZoom: 0.1
        });
        panZoomInstance.zoom(1.0);
      }
    });
  }
}
