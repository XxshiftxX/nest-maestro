import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ExplorerService } from './services/explorer.service';

@Module({
  providers: [ExplorerService],
})
export class MaestroModule implements OnApplicationBootstrap {
  constructor(
    private readonly explorerService: ExplorerService,
  ) {}

  onApplicationBootstrap() {
    const { steps } = this.explorerService.explore();

    steps.forEach((step) => console.log(step));
  }
}
