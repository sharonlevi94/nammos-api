export class ErrorHandler {
  constructor(error: any, message: string) {
    console.log(error, 'error');
    console.log(message, 'message');
  }
}
