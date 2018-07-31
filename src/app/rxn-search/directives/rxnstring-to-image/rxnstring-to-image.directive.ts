import {
  Directive,
  OnInit,
  Input,
  Renderer2,
  HostListener
} from '@angular/core';

import { environment } from '../../../../environments/environment';
import * as $ from 'jquery';
declare var MarvinJSUtil: any;
declare var svgPanZoom: any;
let marvin: any;

@Directive({
  selector: '[rxnToImage]'
})
export class RxnStringToImageDirective implements OnInit {
  panZoomInstance: any;
  @Input() rxn: any;
  @Input() index: number;
  @HostListener('window:resize')
  onWindowResize() {
    this.ngOnInit();
  }

  @HostListener('document:filtersMenuStatusChanged')
  filterMenuStatus() {
    this.ngOnInit();
  }
  constructor(private renderer: Renderer2) {}
  ngOnInit() {
    const decodedRxn = window.atob(this.rxn);
    this.generateImageFromRxn(decodedRxn, this.index);
  }
  private generateImageFromRxn(rxn, index) {
    MarvinJSUtil.getPackage('#marvinjs-iframe').then(marvinNameSpace => {
      marvin = marvinNameSpace;
      const exporter = this.createExporter();
      exporter.render(rxn).then(
        svg => {
          this.applySvg(svg, index);
        },
        error => {
          alert(error);
        }
      );
    });
  }
  private applySvg(svg, index) {
    const imageContainer = '#imageContainer' + index;
    $(imageContainer).html(svg);
    const img = $(imageContainer).find('svg')['0'];
    if (img !== undefined) {
      img.setAttribute('width', '100%');
      const panZoomInstance = svgPanZoom(img, {
        zoomEnabled: false,
        controlIconsEnabled: false,
        fit: true,
        center: true
      });
      panZoomInstance.zoom(0.9);
    }
  }
  private createExporter() {
    const innerWidth = window.innerWidth;
    const imageType = 'image/svg';
    const settings = {
      carbonLabelVisible: false,
      cpkColoring: false,
      chiralFlagVisible: false,
      lonePairsVisible: false,
      lonepaircalculationenabled: false,
      atomIndicesVisible: false,
      atomMapsVisible: false,
      implicitHydrogen: 'TERMINAL_AND_HETERO',
      displayMode: 'WIREFRAME',
      'background-color': '#EAE5E3',
      zoomMode: 'autoshrink',
      width: innerWidth,
      height: 225
    };
    const inputFormat = null;
    const services = {};
    services['molconvertws'] = environment.molconvertws;
    const params = {
      imageType: imageType,
      settings: settings,
      inputFormat: inputFormat,
      services: services
    };
    return new marvin.ImageExporter(params);
  }
}
