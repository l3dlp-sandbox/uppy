import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as StatusBar from '@uppy/status-bar';
import { Uppy } from '@uppy/core';
import FileInput from '@uppy/file-input';
import Tus from '@uppy/tus';
import { Body, Meta } from '@uppy/utils/lib/UppyFile';


@Component({
  selector: 'uppy-status-bar-demo',
  template: `
    <div class="UppyInput"></div>
    <uppy-status-bar [uppy]="uppy" [props]="props"></uppy-status-bar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarDemoComponent<M extends Meta, B extends Body> implements OnInit {
  uppy: Uppy<M, B> = new Uppy({ debug: true, autoProceed: true });
  props: StatusBar.StatusBarOptions = {
    hideUploadButton: true,
    hideAfterFinish: false,
  };

  ngOnInit(): void {
    this.uppy
      .use(FileInput, { target: '.UppyInput', pretty: false })
      .use(Tus, { endpoint: 'https://master.tus.io/files/' });
  }
}
