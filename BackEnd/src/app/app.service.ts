import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  dummyText(): string {
    return 'AutoMotiveRev';
  }
}
