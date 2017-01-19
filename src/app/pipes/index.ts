import { NgModule } from '@angular/core';
import { FromNowPipe } from "./from-now.pipe";

export const PIPES = [
  FromNowPipe
];

@NgModule({
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule {
}
