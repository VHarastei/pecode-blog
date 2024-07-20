import { HttpException, HttpStatus } from '@nestjs/common';

export class PostDoesNotExistException extends HttpException {
  constructor() {
    super('POST_DOES_NOT_EXIST', HttpStatus.NOT_FOUND);
  }
}
