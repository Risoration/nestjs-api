import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class IsPositivePipe implements PipeTransform {
  transform(value: any) {
    if (value <= 0) {
      throw new HttpException(
        'Value must be a positive number',
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
